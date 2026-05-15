const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/summary', paymentController.getSummary);
router.get('/bank-accounts', paymentController.getBankAccounts);
router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPaymentById);

module.exports = router;
