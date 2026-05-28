import api from './api.js';

export const registerRequest = (userData) => {
  return api.post('/auth/register', userData);
};

export const loginRequest = (credentials) => {
  return api.post('/auth/login', credentials);
};
