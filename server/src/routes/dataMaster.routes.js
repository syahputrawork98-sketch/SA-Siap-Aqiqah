const express = require('express');
const router = express.Router();
const dataMasterController = require('../controllers/dataMaster.controller');

// Summary
router.get('/summary', dataMasterController.getSummary);

// Animals
router.get('/animals', dataMasterController.getAnimals);
router.get('/animals/:id', dataMasterController.getAnimalById);

// Pens
router.get('/pens', dataMasterController.getPens);
router.get('/pens/:id', dataMasterController.getPenById);

// Caterings
router.get('/caterings', dataMasterController.getCaterings);
router.get('/caterings/:id', dataMasterController.getCateringById);

// Menus
router.get('/menus', dataMasterController.getMenus);
router.get('/menus/:id', dataMasterController.getMenuById);

// Packages
router.get('/packages', dataMasterController.getPackages);
router.get('/packages/:id', dataMasterController.getPackageById);

module.exports = router;
