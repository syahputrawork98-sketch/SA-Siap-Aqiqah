const dataMasterService = require('../services/dataMaster.service');

const getSummary = (req, res) => {
  const summary = dataMasterService.getSummary();
  res.json({
    success: true,
    message: "Data Master summary retrieved successfully",
    data: summary
  });
};

const getAnimals = (req, res) => {
  const { search, kategori, status } = req.query;
  const filters = { search, kategori, status };
  const allAnimals = dataMasterService.getAllAnimals({});
  const filteredAnimals = dataMasterService.getAllAnimals(filters);
  
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

const getAnimalById = (req, res) => {
  const animal = dataMasterService.getAnimalById(req.params.id);
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

const getPens = (req, res) => {
  const { search, status } = req.query;
  const filters = { search, status };
  const allPens = dataMasterService.getAllPens({});
  const filteredPens = dataMasterService.getAllPens(filters);
  
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

const getPenById = (req, res) => {
  const pen = dataMasterService.getPenById(req.params.id);
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

const getCaterings = (req, res) => {
  const { search, status } = req.query;
  const filters = { search, status };
  const allCaterings = dataMasterService.getAllCaterings({});
  const filteredCaterings = dataMasterService.getAllCaterings(filters);
  
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

const getCateringById = (req, res) => {
  const catering = dataMasterService.getCateringById(req.params.id);
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

const getMenus = (req, res) => {
  const { search, kategori, status } = req.query;
  const filters = { search, kategori, status };
  const allMenus = dataMasterService.getAllMenus({});
  const filteredMenus = dataMasterService.getAllMenus(filters);
  
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

const getMenuById = (req, res) => {
  const menu = dataMasterService.getMenuById(req.params.id);
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

const getPackages = (req, res) => {
  const { search, jenisHewan, status } = req.query;
  const filters = { search, jenisHewan, status };
  const allPackages = dataMasterService.getAllPackages({});
  const filteredPackages = dataMasterService.getAllPackages(filters);
  
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

const getPackageById = (req, res) => {
  const packageData = dataMasterService.getPackageById(req.params.id);
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
