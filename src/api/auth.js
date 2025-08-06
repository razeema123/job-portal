// src/api/auth.js
import API from './axios';

// SIGN UP
export const signup = (formData) => API.post('/auth/signup', formData);

// LOGIN
export const login = (formData) => API.post('/auth/login', formData);
