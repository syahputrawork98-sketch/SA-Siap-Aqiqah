const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/summary', orderController.getSummary);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);

// Partner Confirmations (Timeline 1)
router.get('/:id/partner-confirmations', orderController.getPartnerConfirmations);
router.post('/:id/partner-confirmations', orderController.createPartnerConfirmations);
router.patch('/:id/partner-confirmations/:confirmationId/status', orderController.updatePartnerConfirmationStatus);

module.exports = router;
