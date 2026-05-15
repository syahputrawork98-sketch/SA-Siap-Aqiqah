const { ORDERS } = require('../modules/orders/orders.data');

const getSummary = () => {
  return {
    totalOrders: ORDERS.length,
    waitingPayment: ORDERS.filter(o => o.status === 'Menunggu Pembayaran').length,
    processing: ORDERS.filter(o => o.status === 'Diproses').length,
    completed: ORDERS.filter(o => o.status === 'Selesai').length,
    totalRevenue: ORDERS.filter(o => o.status === 'Selesai').reduce((acc, o) => acc + o.total, 0),
  };
};

const getAllOrders = (filters = {}) => {
  let filtered = [...ORDERS];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(searchLower) || 
      o.nama.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter(o => o.status === filters.status);
  }

  if (filters.tanggal) {
    filtered = filtered.filter(o => o.tanggal === filters.tanggal);
  }

  return filtered;
};

const getOrderById = (id) => ORDERS.find(o => o.id === id);

module.exports = {
  getSummary,
  getAllOrders,
  getOrderById,
};
