const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const dataMasterRoutes = require('./dataMaster.routes');

// Mount routes
router.use('/health', healthRoutes);
router.use('/data-master', dataMasterRoutes);

module.exports = router;
