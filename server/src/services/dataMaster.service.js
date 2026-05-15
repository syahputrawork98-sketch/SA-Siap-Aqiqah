const data = require('../modules/data-master/data-master.data');

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

const getSummary = () => {
  return {
    animals: {
      total: data.ANIMALS.length,
      available: data.ANIMALS.filter(a => a.status === 'Tersedia').length
    },
    pens: {
      total: data.PENS.length,
      active: data.PENS.filter(p => p.status === 'Aktif').length
    },
    caterings: {
      total: data.CATERINGS.length
    },
    menus: {
      total: data.MENUS.length
    },
    packages: {
      total: data.PACKAGES.length
    }
  };
};

const getAllAnimals = (filters = {}) => {
  return applyFilters(data.ANIMALS, filters, ['id', 'nama', 'kategori']);
};
const getAnimalById = (id) => data.ANIMALS.find(a => a.id === id);

const getAllPens = (filters = {}) => {
  return applyFilters(data.PENS, filters, ['id', 'nama', 'lokasi', 'mitra']);
};
const getPenById = (id) => data.PENS.find(p => p.id === id);

const getAllCaterings = (filters = {}) => {
  return applyFilters(data.CATERINGS, filters, ['id', 'nama', 'lokasi', 'mitra']);
};
const getCateringById = (id) => data.CATERINGS.find(c => c.id === id);

const getAllMenus = (filters = {}) => {
  return applyFilters(data.MENUS, filters, ['id', 'nama', 'kategori', 'catering']);
};
const getMenuById = (id) => data.MENUS.find(m => m.id === id);

const getAllPackages = (filters = {}) => {
  return applyFilters(data.PACKAGES, filters, ['id', 'nama', 'jenisHewan', 'menu']);
};
const getPackageById = (id) => data.PACKAGES.find(p => p.id === id);

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
