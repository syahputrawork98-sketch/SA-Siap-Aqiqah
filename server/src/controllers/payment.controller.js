const paymentService = require('../services/payment.service');

const getSummary = (req, res) => {
  const summary = paymentService.getSummary();
  res.json({
    success: true,
    message: "Payments summary retrieved successfully",
    data: summary
  });
};

const getPayments = (req, res) => {
  const { search, status, metode, tanggal } = req.query;
  const filters = { search, status, metode, tanggal };

  const allPayments = paymentService.getAllPayments({});
  const filteredPayments = paymentService.getAllPayments(filters);

  res.json({
    success: true,
    message: "Payments retrieved successfully",
    data: filteredPayments,
    meta: {
      total: allPayments.length,
      filtered: filteredPayments.length,
      filters
    }
  });
};

const getPaymentById = (req, res) => {
  const payment = paymentService.getPaymentById(req.params.id);
  if (!payment) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Payment retrieved successfully",
    data: payment
  });
};

const getBankAccounts = (req, res) => {
  const accounts = paymentService.getBankAccounts();
  res.json({
    success: true,
    message: "Bank accounts retrieved successfully",
    data: accounts
  });
};

module.exports = {
  getSummary,
  getPayments,
  getPaymentById,
  getBankAccounts,
};
