const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/summary', paymentController.getSummary);
router.get('/bank-accounts', paymentController.getBankAccounts);
router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPaymentById);

// Manual Payment Write Operations
router.post('/', paymentController.createPayment);
router.patch('/:id/verify', paymentController.verifyPayment);
router.patch('/:id/reject', paymentController.rejectPayment);

module.exports = router;
