const dataMasterService = require('../services/dataMaster.service');

const getSummary = async (req, res) => {
  const summary = await dataMasterService.getSummary();
  res.json({
    success: true,
    message: "Data Master summary retrieved successfully",
    data: summary
  });
};

const getAnimals = async (req, res) => {
  const { search, kategori, status } = req.query;
  const filters = { search, kategori, status };
  const allAnimals = await dataMasterService.getAllAnimals({});
  const filteredAnimals = await dataMasterService.getAllAnimals(filters);
  
  res.json({
    success: true,
    message: "Animals retrieved successfully",
    data: filteredAnimals,
    meta: {
      total: allAnimals.length,
      filtered: filteredAnimals.length,
      filters
    }
  });
};

const getAnimalById = async (req, res) => {
  const animal = await dataMasterService.getAnimalById(req.params.id);
  if (!animal) {
    return res.status(404).json({
      success: false,
      message: "Animal not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Animal retrieved successfully",
    data: animal
  });
};

const getPens = async (req, res) => {
  const { search, status } = req.query;
  const filters = { search, status };
  const allPens = await dataMasterService.getAllPens({});
  const filteredPens = await dataMasterService.getAllPens(filters);
  
  res.json({
    success: true,
    message: "Pens retrieved successfully",
    data: filteredPens,
    meta: {
      total: allPens.length,
      filtered: filteredPens.length,
      filters
    }
  });
};

const getPenById = async (req, res) => {
  const pen = await dataMasterService.getPenById(req.params.id);
  if (!pen) {
    return res.status(404).json({
      success: false,
      message: "Pen not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Pen retrieved successfully",
    data: pen
  });
};

const getCaterings = async (req, res) => {
  const { search, status } = req.query;
  const filters = { search, status };
  const allCaterings = await dataMasterService.getAllCaterings({});
  const filteredCaterings = await dataMasterService.getAllCaterings(filters);
  
  res.json({
    success: true,
    message: "Caterings retrieved successfully",
    data: filteredCaterings,
    meta: {
      total: allCaterings.length,
      filtered: filteredCaterings.length,
      filters
    }
  });
};

const getCateringById = async (req, res) => {
  const catering = await dataMasterService.getCateringById(req.params.id);
  if (!catering) {
    return res.status(404).json({
      success: false,
      message: "Catering not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Catering retrieved successfully",
    data: catering
  });
};

const getMenus = async (req, res) => {
  const { search, kategori, status } = req.query;
  const filters = { search, kategori, status };
  const allMenus = await dataMasterService.getAllMenus({});
  const filteredMenus = await dataMasterService.getAllMenus(filters);
  
  res.json({
    success: true,
    message: "Menus retrieved successfully",
    data: filteredMenus,
    meta: {
      total: allMenus.length,
      filtered: filteredMenus.length,
      filters
    }
  });
};

const getMenuById = async (req, res) => {
  const menu = await dataMasterService.getMenuById(req.params.id);
  if (!menu) {
    return res.status(404).json({
      success: false,
      message: "Menu not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Menu retrieved successfully",
    data: menu
  });
};

const getPackages = async (req, res) => {
  const { search, jenisHewan, status } = req.query;
  const filters = { search, jenisHewan, status };
  const allPackages = await dataMasterService.getAllPackages({});
  const filteredPackages = await dataMasterService.getAllPackages(filters);
  
  res.json({
    success: true,
    message: "Packages retrieved successfully",
    data: filteredPackages,
    meta: {
      total: allPackages.length,
      filtered: filteredPackages.length,
      filters
    }
  });
};

const getPackageById = async (req, res) => {
  const packageData = await dataMasterService.getPackageById(req.params.id);
  if (!packageData) {
    return res.status(404).json({
      success: false,
      message: "Package not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Package retrieved successfully",
    data: packageData
  });
};

module.exports = {
  getSummary,
  getAnimals,
  getAnimalById,
  getPens,
  getPenById,
  getCaterings,
  getCateringById,
  getMenus,
  getMenuById,
  getPackages,
  getPackageById,
};
