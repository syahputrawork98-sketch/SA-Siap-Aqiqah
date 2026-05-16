const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Terjadi kesalahan sistem' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const paymentApi = {
  getPayments: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.metode) query.append('metode', params.metode);
    if (params.tanggal) query.append('tanggal', params.tanggal);

    const response = await fetch(`${API_BASE_URL}/payments?${query.toString()}`);
    return handleResponse(response);
  },

  getPaymentSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/payments/summary`);
    return handleResponse(response);
  },

  getPaymentById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`);
    return handleResponse(response);
  },

  getBankAccounts: async () => {
    const response = await fetch(`${API_BASE_URL}/payments/bank-accounts`);
    const payload = await handleResponse(response);
    
    // Mapping server data {bank, nomor, nama} to client data {bank, noRek, atasNama} if needed
    if (payload.success && payload.data) {
      payload.data = payload.data.map(item => ({
        ...item,
        noRek: item.nomor,
        atasNama: item.nama
      }));
    }
    
    return payload;
  },

  verifyPayment: async (paymentId, payload) => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/verify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  rejectPayment: async (paymentId, payload) => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/reject`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};

