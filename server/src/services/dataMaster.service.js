const data = require('../modules/data-master/data-master.data');

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

const getAllAnimals = () => data.ANIMALS;
const getAnimalById = (id) => data.ANIMALS.find(a => a.id === id);

const getAllPens = () => data.PENS;
const getPenById = (id) => data.PENS.find(p => p.id === id);

const getAllCaterings = () => data.CATERINGS;
const getCateringById = (id) => data.CATERINGS.find(c => c.id === id);

const getAllMenus = () => data.MENUS;
const getMenuById = (id) => data.MENUS.find(m => m.id === id);

const getAllPackages = () => data.PACKAGES;
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
