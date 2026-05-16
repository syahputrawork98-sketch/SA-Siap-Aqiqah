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
    if (params.consumerId) query.append('consumerId', params.consumerId);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/orders?${query.toString()}`);
    return handleResponse(response);
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return handleResponse(response);
  },

  createOrder: async (payload) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
