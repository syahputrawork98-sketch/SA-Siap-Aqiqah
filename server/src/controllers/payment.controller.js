const paymentService = require('../services/payment.service');

const getSummary = async (req, res) => {
  const summary = await paymentService.getSummary();
  res.json({
    success: true,
    message: "Payments summary retrieved successfully",
    data: summary
  });
};

const getPayments = async (req, res) => {
  const { search, status, metode, tanggal } = req.query;
  const filters = { search, status, metode, tanggal };

  const allPayments = await paymentService.getAllPayments({});
  const filteredPayments = await paymentService.getAllPayments(filters);

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

const getPaymentById = async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.id);
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

const createPayment = async (req, res) => {
  try {
    const { orderId, type, amount } = req.body;
    if (!orderId || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: "orderId, type, and amount are required"
      });
    }

    const payment = await paymentService.createManualPayment(req.body);
    res.status(201).json({
      success: true,
      message: "Payment record created successfully",
      data: payment
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] createPayment:', error);
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for payment write operation"
      });
    }
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to create payment"
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const payment = await paymentService.verifyPayment(req.params.id, req.body);
    res.json({
      success: true,
      message: "Payment verified successfully",
      data: payment
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] verifyPayment:', error);
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for payment write operation"
      });
    }
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to verify payment"
    });
  }
};

const rejectPayment = async (req, res) => {
  try {
    const payment = await paymentService.rejectPayment(req.params.id, req.body);
    res.json({
      success: true,
      message: "Payment rejected successfully",
      data: payment
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] rejectPayment:', error);
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for payment write operation"
      });
    }
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to reject payment"
    });
  }
};

module.exports = {
  getSummary,
  getPayments,
  getPaymentById,
  getBankAccounts,
  createPayment,
  verifyPayment,
  rejectPayment,
};
