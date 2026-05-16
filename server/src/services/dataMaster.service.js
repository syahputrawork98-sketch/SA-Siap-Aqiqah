const prisma = require('../lib/prisma');
const mockData = require('../modules/data-master/data-master.data');

/**
 * DB FALLBACK HELPER
 * Wraps prisma calls to prevent server crash if DB is not ready.
 */
const tryDB = async (dbCall, fallback) => {
  try {
    // Basic connectivity check: if we can't reach the DB, it throws
    const result = await dbCall();
    return result;
  } catch (error) {
    if (error.code === 'P1001' || error.code === 'P2002' || error.message.includes('Can\'t reach database')) {
      console.warn('[DB FALLBACK] Database not reachable, using mock data.');
    } else {
      console.error('[DB ERROR]', error);
    }
    return fallback;
  }
};

// Helper for simple filtering
const applyFilters = (list, filters, searchFields = ['id', 'nama']) => {
  let filtered = [...list];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item => 
      searchFields.some(field => item[field]?.toLowerCase().includes(searchLower))
    );
  }

  // Filter by direct fields (status, kategori, jenisHewan, etc)
  Object.keys(filters).forEach(key => {
    if (key !== 'search' && filters[key]) {
      filtered = filtered.filter(item => item[key] === filters[key]);
    }
  });

  return filtered;
};

const getSummary = async () => {
  const dbSummary = await tryDB(async () => {
    const [animals, packages, partners, menus] = await Promise.all([
      prisma.animal.findMany(),
      prisma.package.findMany(),
      prisma.partnerProfile.findMany(),
      prisma.cateringMenu.findMany(),
    ]);

    return {
      animals: {
        total: animals.length,
        available: animals.filter(a => a.status === 'AVAILABLE').length
      },
      pens: {
        total: partners.filter(p => p.type === 'MITRA_KANDANG').length,
        active: partners.filter(p => p.type === 'MITRA_KANDANG' && p.isVerified).length
      },
      caterings: {
        total: partners.filter(p => p.type === 'MITRA_CATERING').length
      },
      menus: {
        total: menus.length
      },
      packages: {
        total: packages.length
      }
    };
  }, null);

  if (dbSummary) return dbSummary;

  // Mock Fallback
  return {
    animals: {
      total: mockData.ANIMALS.length,
      available: mockData.ANIMALS.filter(a => a.status === 'Tersedia').length
    },
    pens: {
      total: mockData.PENS.length,
      active: mockData.PENS.filter(p => p.status === 'Aktif').length
    },
    caterings: {
      total: mockData.CATERINGS.length
    },
    menus: {
      total: mockData.MENUS.length
    },
    packages: {
      total: mockData.PACKAGES.length
    }
  };
};

const getAllAnimals = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const animals = await prisma.animal.findMany({
      include: { partner: true }
    });
    return animals.map(a => ({
      id: a.id,
      nama: `${a.type} ${a.weight || ''}`,
      kategori: a.type,
      berat: a.weight ? parseInt(a.weight) || a.weight : null,
      harga: a.price,
      status: a.status === 'AVAILABLE' ? 'Tersedia' : (a.status === 'SOLD' ? 'Sold Out' : 'Dalam Proses'),
      kandang: a.partner.businessName
    }));
  }, mockData.ANIMALS);

  return applyFilters(dbData, filters, ['id', 'nama', 'kategori']);
};

const getAnimalById = async (id) => {
  return await tryDB(async () => {
    const a = await prisma.animal.findUnique({
      where: { id },
      include: { partner: true }
    });
    if (!a) return null;
    return {
      id: a.id,
      nama: `${a.type} ${a.weight || ''}`,
      kategori: a.type,
      berat: a.weight ? parseInt(a.weight) || a.weight : null,
      harga: a.price,
      status: a.status === 'AVAILABLE' ? 'Tersedia' : (a.status === 'SOLD' ? 'Sold Out' : 'Dalam Proses'),
      kandang: a.partner.businessName
    };
  }, mockData.ANIMALS.find(a => a.id === id));
};

const getAllPens = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const partners = await prisma.partnerProfile.findMany({
      where: { type: 'MITRA_KANDANG' }
    });
    return partners.map(p => ({
      id: p.id,
      nama: p.businessName,
      lokasi: p.address,
      mitra: p.ownerName,
      kapasitas: 20, // Default placeholders for fields not in schema yet
      stok: 0,
      status: p.isVerified ? 'Aktif' : 'Tidak Aktif'
    }));
  }, mockData.PENS);

  return applyFilters(dbData, filters, ['id', 'nama', 'lokasi', 'mitra']);
};

const getPenById = async (id) => {
  return await tryDB(async () => {
    const p = await prisma.partnerProfile.findUnique({ where: { id } });
    if (!p) return null;
    return {
      id: p.id,
      nama: p.businessName,
      lokasi: p.address,
      mitra: p.ownerName,
      kapasitas: 20,
      stok: 0,
      status: p.isVerified ? 'Aktif' : 'Tidak Aktif'
    };
  }, mockData.PENS.find(p => p.id === id));
};

const getAllCaterings = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const partners = await prisma.partnerProfile.findMany({
      where: { type: 'MITRA_CATERING' }
    });
    return partners.map(p => ({
      id: p.id,
      nama: p.businessName,
      lokasi: p.address,
      mitra: p.ownerName,
      jumlahMenu: 0,
      kapasitas: '100 porsi/hari',
      status: p.isVerified ? 'Aktif' : 'Tidak Aktif'
    }));
  }, mockData.CATERINGS);

  return applyFilters(dbData, filters, ['id', 'nama', 'lokasi', 'mitra']);
};

const getCateringById = async (id) => {
  return await tryDB(async () => {
    const p = await prisma.partnerProfile.findUnique({ where: { id } });
    if (!p) return null;
    return {
      id: p.id,
      nama: p.businessName,
      lokasi: p.address,
      mitra: p.ownerName,
      jumlahMenu: 0,
      kapasitas: '100 porsi/hari',
      status: p.isVerified ? 'Aktif' : 'Tidak Aktif'
    };
  }, mockData.CATERINGS.find(c => c.id === id));
};

const getAllMenus = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const menus = await prisma.cateringMenu.findMany({
      include: { partner: true }
    });
    return menus.map(m => ({
      id: m.id,
      nama: m.menuName,
      kategori: 'Olahan Daging', // Default
      catering: m.partner.businessName,
      harga: m.pricePerPorsi,
      status: 'Aktif'
    }));
  }, mockData.MENUS);

  return applyFilters(dbData, filters, ['id', 'nama', 'kategori', 'catering']);
};

const getMenuById = async (id) => {
  return await tryDB(async () => {
    const m = await prisma.cateringMenu.findUnique({
      where: { id },
      include: { partner: true }
    });
    if (!m) return null;
    return {
      id: m.id,
      nama: m.menuName,
      kategori: 'Olahan Daging',
      catering: m.partner.businessName,
      harga: m.pricePerPorsi,
      status: 'Aktif'
    };
  }, mockData.MENUS.find(m => m.id === id));
};

const getAllPackages = async (filters = {}) => {
  const dbData = await tryDB(async () => {
    const packages = await prisma.package.findMany();
    return packages.map(p => ({
      id: p.id,
      nama: p.name,
      jenisHewan: 'Kambing/Domba', // Mixed
      menu: 'Sate + Gule', // Placeholder
      harga: p.priceBase,
      status: p.isActive ? 'Aktif' : 'Tidak Aktif'
    }));
  }, mockData.PACKAGES);

  return applyFilters(dbData, filters, ['id', 'nama', 'jenisHewan', 'menu']);
};

const getPackageById = async (id) => {
  return await tryDB(async () => {
    const p = await prisma.package.findUnique({ where: { id } });
    if (!p) return null;
    return {
      id: p.id,
      nama: p.name,
      jenisHewan: 'Kambing/Domba',
      menu: 'Sate + Gule',
      harga: p.priceBase,
      status: p.isActive ? 'Aktif' : 'Tidak Aktif'
    };
  }, mockData.PACKAGES.find(p => p.id === id));
};

module.exports = {
  getSummary,
  getAllAnimals,
  getAnimalById,
  getAllPens,
  getPenById,
  getAllCaterings,
  getCateringById,
  getAllMenus,
  getMenuById,
  getAllPackages,
  getPackageById,
};
