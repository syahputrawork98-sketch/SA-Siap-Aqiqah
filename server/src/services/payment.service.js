const prisma = require('../lib/prisma');
const mockData = require('../modules/payments/payments.data');

/**
 * DB FALLBACK HELPER
 */
const tryDB = async (dbCall, fallback) => {
  try {
    const result = await dbCall();
    return result;
  } catch (error) {
    if (error.code === 'P1001' || error.message.includes('Can\'t reach database')) {
      console.warn('[DB FALLBACK] Database not reachable for Payments, using mock data.');
    } else {
      console.error('[DB ERROR]', error);
    }
    return fallback;
  }
};

const mapStatus = (status) => {
  const map = {
    'PENDING_VERIFICATION': 'Menunggu Validasi',
    'PAID_DP': 'Diterima',
    'PAID_FULL': 'Lunas',
    'REJECTED': 'Ditolak',
    'UNPAID': 'Belum Bayar'
  };
  return map[status] || status;
};

const mapPayment = (p) => ({
  id: p.id,
  orderId: p.order?.orderNumber || p.orderId,
  konsumen: p.order?.consumer?.fullName || 'N/A',
  tanggal: p.createdAt.toISOString().split('T')[0],
  jumlah: p.amount,
  status: mapStatus(p.status),
  metode: `Transfer Bank (${p.type})`,
  bukti: p.proofImageUrl,
  adminNote: p.adminNote,
  verifiedAt: p.verifiedAt
});

const getSummary = async () => {
  const dbSummary = await tryDB(async () => {
    const payments = await prisma.payment.findMany();
    return {
      totalPayments: payments.length,
      pendingValidation: payments.filter(p => p.status === 'PENDING_VERIFICATION').length,
      accepted: payments.filter(p => p.status === 'PAID_DP' || p.status === 'PAID_FULL').length,
      paid: payments.filter(p => p.status === 'PAID_FULL').length,
      totalAmount: payments.filter(p => p.status === 'PAID_DP' || p.status === 'PAID_FULL').reduce((acc, p) => acc + p.amount, 0),
    };
  }, null);

  if (dbSummary) return dbSummary;

  return {
    totalPayments: mockData.PAYMENTS.length,
    pendingValidation: mockData.PAYMENTS.filter(p => p.status === 'Menunggu Validasi').length,
    accepted: mockData.PAYMENTS.filter(p => p.status === 'Diterima' || p.status === 'Lunas').length,
    paid: mockData.PAYMENTS.filter(p => p.status === 'Lunas').length,
    totalAmount: mockData.PAYMENTS.filter(p => p.status === 'Lunas' || p.status === 'Diterima').reduce((acc, p) => acc + p.jumlah, 0),
  };
};

const getAllPayments = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: { consumer: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return payments.map(mapPayment);
  }, mockData.PAYMENTS);

  let filtered = [...dbData];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.id.toLowerCase().includes(searchLower) || 
      (p.konsumen && p.konsumen.toLowerCase().includes(searchLower)) ||
      (p.orderId && p.orderId.toLowerCase().includes(searchLower))
    );
  }

  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  if (filters.tanggal) {
    filtered = filtered.filter(p => p.tanggal === filters.tanggal);
  }

  return filtered;
};

const getPaymentById = async (id) => {
  return await tryDB(async () => {
    const p = await prisma.payment.findUnique({
      where: { id },
      include: {
        order: {
          include: { consumer: true }
        }
      }
    });
    if (!p) return null;
    return mapPayment(p);
  }, mockData.PAYMENTS.find(p => p.id === id));
};

const getBankAccounts = () => mockData.BANK_ACCOUNTS;

const createManualPayment = async (payload) => {
  // Resolve Order
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { id: payload.orderId },
        { orderNumber: payload.orderId }
      ]
    }
  });

  if (!order) throw new Error('Order not found');

  const newPayment = await prisma.payment.create({
    data: {
      orderId: order.id,
      type: payload.type,
      amount: payload.amount,
      proofImageUrl: payload.proofImageUrl,
      adminNote: payload.adminNote,
      status: 'PENDING_VERIFICATION'
    },
    include: {
      order: {
        include: { consumer: true }
      }
    }
  });

  return mapPayment(newPayment);
};

const verifyPayment = async (id, payload) => {
  return await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findUnique({
      where: { id },
      include: { order: true }
    });

    if (!payment) throw new Error('Payment not found');

    const newStatus = payment.type === 'DP' ? 'PAID_DP' : 'PAID_FULL';

    const updatedPayment = await tx.payment.update({
      where: { id },
      data: {
        status: newStatus,
        adminNote: payload.adminNote,
        verifiedAt: new Date()
      },
      include: {
        order: {
          include: { consumer: true }
        }
      }
    });

    // Order Status Transition: AWAITING_PAYMENT + DP Verified -> PROCESSING
    if (payment.type === 'DP' && payment.order.status === 'AWAITING_PAYMENT') {
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: 'PROCESSING' }
      });
    }

    return mapPayment(updatedPayment);
  });
};

const rejectPayment = async (id, payload) => {
  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: {
      status: 'REJECTED',
      adminNote: payload.adminNote,
      verifiedAt: new Date()
    },
    include: {
      order: {
        include: { consumer: true }
      }
    }
  });

  return mapPayment(updatedPayment);
};

module.exports = {
  getSummary,
  getAllPayments,
  getPaymentById,
  getBankAccounts,
  createManualPayment,
  verifyPayment,
  rejectPayment,
};
