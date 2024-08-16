import api from './api';

export const register = (name,username, password) => api.post('/auth/register', {name, username, password });
export const login = (username, password) => api.post('/auth/login', { username, password });