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

// Fulfillment Timeline (Timeline 2)
router.get('/:id/timeline-events', orderController.getTimelineEvents);
router.post('/:id/timeline-events', orderController.createTimelineEvent);
router.patch('/:id/timeline-events/:eventId/status', orderController.updateTimelineEventStatus);
router.patch('/:id/timeline-events/:eventId/visibility', orderController.updateTimelineEventVisibility);

module.exports = router;
