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

module.exports = {
  getSummary,
  getOrders,
  getOrderById,
};
