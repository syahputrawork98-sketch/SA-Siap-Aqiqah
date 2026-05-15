const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const dataMasterRoutes = require('./dataMaster.routes');
const orderRoutes = require('./order.routes');
const paymentRoutes = require('./payment.routes');

// Mount routes
router.use('/health', healthRoutes);
router.use('/data-master', dataMasterRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
