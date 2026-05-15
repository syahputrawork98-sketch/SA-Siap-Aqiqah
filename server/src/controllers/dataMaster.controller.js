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
  const animals = dataMasterService.getAllAnimals();
  res.json({
    success: true,
    message: "Animals retrieved successfully",
    data: animals
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
  const pens = dataMasterService.getAllPens();
  res.json({
    success: true,
    message: "Pens retrieved successfully",
    data: pens
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
  const caterings = dataMasterService.getAllCaterings();
  res.json({
    success: true,
    message: "Caterings retrieved successfully",
    data: caterings
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
  const menus = dataMasterService.getAllMenus();
  res.json({
    success: true,
    message: "Menus retrieved successfully",
    data: menus
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
  const packages = dataMasterService.getAllPackages();
  res.json({
    success: true,
    message: "Packages retrieved successfully",
    data: packages
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
