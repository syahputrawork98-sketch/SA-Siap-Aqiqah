const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Terjadi kesalahan sistem' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const dataMasterApi = {
  getAnimals: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.kategori) query.append('kategori', params.kategori);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/data-master/animals?${query.toString()}`);
    return handleResponse(response);
  },

  getPens: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/data-master/pens?${query.toString()}`);
    return handleResponse(response);
  },

  getCaterings: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/data-master/caterings?${query.toString()}`);
    return handleResponse(response);
  },

  getMenus: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.kategori) query.append('kategori', params.kategori);

    const response = await fetch(`${API_BASE_URL}/data-master/menus?${query.toString()}`);
    return handleResponse(response);
  },

  getPackages: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.jenisHewan) query.append('jenisHewan', params.jenisHewan);
    if (params.status) query.append('status', params.status);

    const response = await fetch(`${API_BASE_URL}/data-master/packages?${query.toString()}`);
    return handleResponse(response);
  },
};
