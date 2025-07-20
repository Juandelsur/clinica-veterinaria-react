import axios from 'axios';

const BASE_URL = 'http://67.205.142.104:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const duenoAPI = {
  getAll: () => api.get('/dueno'),
  getById: (id) => api.get(`/dueno/${id}`),
  create: (data) => api.post('/dueno', data),
  update: (id, data) => api.put(`/dueno/${id}`, data),
  delete: (id) => api.delete(`/dueno/${id}`)
};

export const mascotaAPI = {
  getAll: () => api.get('/mascota'),
  getById: (id) => api.get(`/mascota/${id}`),
  create: (data) => api.post('/mascota', data),
  update: (id, data) => api.put(`/mascota/${id}`, data),
  delete: (id) => api.delete(`/mascota/${id}`)
};

export const veterinarioAPI = {
  getAll: () => api.get('/veterinario'),
  getById: (id) => api.get(`/veterinario/${id}`),
  create: (data) => api.post('/veterinario', data),
  update: (id, data) => api.put(`/veterinario/${id}`, data),
  delete: (id) => api.delete(`/veterinario/${id}`)
};

export const reservaAPI = {
  getAll: () => api.get('/reserva_procedimiento'),
  getById: (id) => api.get(`/reserva_procedimiento/${id}`),
  create: (data) => api.post('/reserva_procedimiento', data),
  update: (id, data) => api.put(`/reserva_procedimiento/${id}`, data),
  delete: (id) => api.delete(`/reserva_procedimiento/${id}`)
};
