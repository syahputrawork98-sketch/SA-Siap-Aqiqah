const prisma = require('../lib/prisma');
const mockData = require('../modules/orders/orders.data');

/**
 * DB FALLBACK HELPER
 */
const tryDB = async (dbCall, fallback) => {
  try {
    const result = await dbCall();
    return result;
  } catch (error) {
    if (error.code === 'P1001' || error.message.includes('Can\'t reach database')) {
      console.warn('[DB FALLBACK] Database not reachable for Orders, using mock data.');
    } else {
      console.error('[DB ERROR]', error);
    }
    return fallback;
  }
};

const mapStatus = (status) => {
  const map = {
    'DRAFT': 'Draft',
    'PENDING_CONFIRMATION': 'Menunggu Konfirmasi',
    'CONFIRMED': 'Dikonfirmasi',
    'AWAITING_PAYMENT': 'Menunggu Pembayaran',
    'PROCESSING': 'Diproses',
    'ON_DELIVERY': 'Dalam Pengiriman',
    'DELIVERED': 'Telah Sampai',
    'COMPLETED': 'Selesai',
    'CANCELLED': 'Dibatalkan'
  };
  return map[status] || status;
};

const mapOrder = (o) => ({
  id: o.orderNumber || o.id,
  nama: o.consumer?.fullName || 'N/A',
  tanggal: o.createdAt.toISOString().split('T')[0],
  total: o.totalAmount,
  status: mapStatus(o.status),
  customerPhone: o.consumer?.phone || '',
  paket: o.package?.name || 'Paket Kustom',
  paymentStatus: o.payments?.[0]?.status === 'PAID_FULL' ? 'Lunas' : (o.payments?.[0]?.status === 'PAID_DP' ? 'Valid (DP)' : 'Belum Bayar'),
  konsumen: {
    nama: o.consumer?.fullName,
    telepon: o.consumer?.phone,
    alamat: o.deliveryAddress
  },
  pembayaran: {
    status: o.payments?.[0]?.status || 'UNPAID',
    metode: 'Transfer Bank',
    bukti: o.payments?.[0]?.proofImageUrl || null
  },
  progress: o.timelineEvents?.map(e => ({
    tahap: e.title,
    mitra: e.updatedBy,
    waktu: e.status === 'DONE' ? e.updatedAt.toISOString() : (e.status === 'IN_PROGRESS' ? 'Sedang Diproses' : 'Menunggu'),
    foto: e.proofImageUrl || 'https://placehold.co/600x400?text=No+Photo'
  })) || []
});

const getSummary = async () => {
  const dbSummary = await tryDB(async () => {
    const orders = await prisma.order.findMany();
    return {
      totalOrders: orders.length,
      waitingPayment: orders.filter(o => o.status === 'AWAITING_PAYMENT').length,
      processing: orders.filter(o => o.status === 'PROCESSING').length,
      completed: orders.filter(o => o.status === 'COMPLETED').length,
      totalRevenue: orders.filter(o => o.status === 'COMPLETED').reduce((acc, o) => acc + o.totalAmount, 0),
    };
  }, null);

  if (dbSummary) return dbSummary;

  return {
    totalOrders: mockData.ORDERS.length,
    waitingPayment: mockData.ORDERS.filter(o => o.status === 'Menunggu Pembayaran').length,
    processing: mockData.ORDERS.filter(o => o.status === 'Diproses').length,
    completed: mockData.ORDERS.filter(o => o.status === 'Selesai').length,
    totalRevenue: mockData.ORDERS.filter(o => o.status === 'Selesai').reduce((acc, o) => acc + o.total, 0),
  };
};

const getAllOrders = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const orders = await prisma.order.findMany({
      include: {
        consumer: true,
        package: true,
        payments: true,
        timelineEvents: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return orders.map(mapOrder);
  }, mockData.ORDERS);

  let filtered = [...dbData];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(searchLower) || 
      o.nama.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter(o => o.status === filters.status);
  }

  if (filters.tanggal) {
    filtered = filtered.filter(o => o.tanggal === filters.tanggal);
  }

  return filtered;
};

const getOrderById = async (id) => {
  return await tryDB(async () => {
    // Try both orderNumber and id
    const o = await prisma.order.findFirst({
      where: {
        OR: [
          { id: id },
          { orderNumber: id }
        ]
      },
      include: {
        consumer: true,
        package: true,
        payments: true,
        timelineEvents: true,
        items: {
          include: {
            animal: true,
            cateringMenu: true
          }
        }
      }
    });
    if (!o) return null;
    return mapOrder(o);
  }, mockData.ORDERS.find(o => o.id === id));
};

const createOrder = async (payload) => {
  // 1. Resolve Consumer
  let consumer = null;
  if (payload.consumerId) {
    consumer = await prisma.consumerProfile.findUnique({ where: { id: payload.consumerId } });
  } else if (payload.consumerEmail) {
    const user = await prisma.user.findUnique({ 
      where: { email: payload.consumerEmail },
      include: { consumerProfile: true }
    });
    consumer = user?.consumerProfile;
  }

  if (!consumer) throw new Error('Consumer not found');

  // 2. Resolve Package
  let pkg = null;
  if (payload.packageId) {
    pkg = await prisma.package.findUnique({ where: { id: payload.packageId } });
  } else if (payload.packageSlug) {
    pkg = await prisma.package.findUnique({ where: { slug: payload.packageSlug } });
  }

  if (!pkg) throw new Error('Package not found');

  // 3. Generate Order Number (SIQ-YYYYMMDD-XXXX)
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const orderCountToday = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  });

  const sequence = (orderCountToday + 1).toString().padStart(4, '0');
  const orderNumber = `SIQ-${dateStr}-${sequence}`;

  // 4. Calculations
  const totalAmount = payload.items.reduce((sum, item) => sum + (item.quantity * item.priceAtOrder), 0);
  
  const dpSetting = await prisma.platformSetting.findUnique({ where: { key: 'dp_pct' } });
  const dpPct = dpSetting ? parseInt(dpSetting.value) : 50;
  
  const dpAmount = Math.floor(totalAmount * dpPct / 100);
  const remainingAmount = totalAmount - dpAmount;

  // 5. Save Transactionally
  const newOrder = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        orderNumber,
        consumerId: consumer.id,
        packageId: pkg.id,
        status: 'PENDING_CONFIRMATION',
        totalAmount,
        dpAmount,
        remainingAmount,
        scheduledDate: new Date(payload.scheduledDate),
        deliveryAddress: payload.deliveryAddress,
        notesConsumer: payload.notesConsumer,
        items: {
          create: payload.items.map(item => ({
            entityType: item.entityType,
            animalId: item.animalId || null,
            cateringMenuId: item.cateringMenuId || null,
            quantity: item.quantity,
            priceAtOrder: item.priceAtOrder
          }))
        }
      },
      include: {
        consumer: true,
        package: true,
        items: true
      }
    });
    return order;
  });

  return mapOrder(newOrder);
};

module.exports = {
  getSummary,
  getAllOrders,
  getOrderById,
  createOrder,
};
