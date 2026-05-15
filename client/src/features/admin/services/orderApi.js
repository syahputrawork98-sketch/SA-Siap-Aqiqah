const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Terjadi kesalahan sistem' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const orderApi = {
  getOrders: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.tanggal) query.append('tanggal', params.tanggal);

    const response = await fetch(`${API_BASE_URL}/orders?${query.toString()}`);
    return handleResponse(response);
  },

  getOrderSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/summary`);
    return handleResponse(response);
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return handleResponse(response);
  },
};
