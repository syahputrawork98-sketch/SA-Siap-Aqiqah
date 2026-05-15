const { PAYMENTS, BANK_ACCOUNTS } = require('../modules/payments/payments.data');

const getSummary = () => {
  return {
    totalPayments: PAYMENTS.length,
    pendingValidation: PAYMENTS.filter(p => p.status === 'Menunggu Validasi').length,
    accepted: PAYMENTS.filter(p => p.status === 'Diterima' || p.status === 'Lunas').length,
    paid: PAYMENTS.filter(p => p.status === 'Lunas').length,
    totalAmount: PAYMENTS.filter(p => p.status === 'Lunas' || p.status === 'Diterima').reduce((acc, p) => acc + p.jumlah, 0),
  };
};

const getAllPayments = (filters = {}) => {
  let filtered = [...PAYMENTS];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.id.toLowerCase().includes(searchLower) || 
      p.konsumen.toLowerCase().includes(searchLower) ||
      p.orderId.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  if (filters.metode) {
    filtered = filtered.filter(p => p.metode.toLowerCase().includes(filters.metode.toLowerCase()));
  }

  if (filters.tanggal) {
    filtered = filtered.filter(p => p.tanggal === filters.tanggal);
  }

  return filtered;
};

const getPaymentById = (id) => PAYMENTS.find(p => p.id === id);

const getBankAccounts = () => BANK_ACCOUNTS;

module.exports = {
  getSummary,
  getAllPayments,
  getPaymentById,
  getBankAccounts,
};
