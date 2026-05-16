const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Terjadi kesalahan sistem' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const mitraApi = {
  getOrders: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.partnerId) query.append('partnerId', params.partnerId);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/orders?${query.toString()}`);
    return handleResponse(response);
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return handleResponse(response);
  },

  updateConfirmationStatus: async (orderId, confirmationId, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/partner-confirmations/${confirmationId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  updateTimelineEventStatus: async (orderId, eventId, payload) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/timeline-events/${eventId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
