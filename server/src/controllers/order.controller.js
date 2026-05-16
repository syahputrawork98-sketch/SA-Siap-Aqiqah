const orderService = require('../services/order.service');

const getSummary = async (req, res) => {
  const summary = await orderService.getSummary();
  res.json({
    success: true,
    message: "Orders summary retrieved successfully",
    data: summary
  });
};

const getOrders = async (req, res) => {
  const { search, status, tanggal } = req.query;
  const filters = { search, status, tanggal };
  
  const allOrders = await orderService.getAllOrders({});
  const filteredOrders = await orderService.getAllOrders(filters);

  res.json({
    success: true,
    message: "Orders retrieved successfully",
    data: filteredOrders,
    meta: {
      total: allOrders.length,
      filtered: filteredOrders.length,
      filters
    }
  });
};

const getOrderById = async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
      data: null
    });
  }
  res.json({
    success: true,
    message: "Order retrieved successfully",
    data: order
  });
};

const createOrder = async (req, res) => {
  try {
    const { items, scheduledDate, deliveryAddress } = req.body;

    // Basic validation
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Items are required to create an order"
      });
    }
    if (!scheduledDate || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Scheduled date and delivery address are required"
      });
    }

    const order = await orderService.createOrder(req.body);
    
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] createOrder:', error);

    // Handle DB connection issues specifically
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for order write operation"
      });
    }

    // Handle other logic errors (consumer not found, etc)
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to create order"
    });
  }
};

const getPartnerConfirmations = async (req, res) => {
  try {
    const confirmations = await orderService.getPartnerConfirmations(req.params.id);
    res.json({
      success: true,
      message: "Partner confirmations retrieved successfully",
      data: confirmations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve partner confirmations"
    });
  }
};

const createPartnerConfirmations = async (req, res) => {
  try {
    const { confirmations } = req.body;
    if (!confirmations || !confirmations.length) {
      return res.status(400).json({
        success: false,
        message: "Confirmations payload is required"
      });
    }

    const results = await orderService.createPartnerConfirmations(req.params.id, confirmations);
    res.status(201).json({
      success: true,
      message: "Partner confirmations created/updated successfully",
      data: results
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] createPartnerConfirmations:', error);
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for partner confirmation write operation"
      });
    }
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to create partner confirmations"
    });
  }
};

const updatePartnerConfirmationStatus = async (req, res) => {
  try {
    const { status, notesPartner } = req.body;
    const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED', 'NEED_RESCHEDULE'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await orderService.updatePartnerConfirmationStatus(
      req.params.id, 
      req.params.confirmationId, 
      { status, notesPartner }
    );

    res.json({
      success: true,
      message: "Partner confirmation status updated successfully",
      data: updated
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] updatePartnerConfirmationStatus:', error);
    if (error.code === 'P1001' || error.message.includes('reach database')) {
      return res.status(503).json({
        success: false,
        message: "Database is not ready for partner confirmation write operation"
      });
    }
    res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || "Failed to update partner confirmation status"
    });
  }
};

module.exports = {
  getSummary,
  getOrders,
  getOrderById,
  createOrder,
  getPartnerConfirmations,
  createPartnerConfirmations,
  updatePartnerConfirmationStatus,
};
