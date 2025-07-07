import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Use a proxy in vite.config.ts for production
  withCredentials: true, // Important for sending HttpOnly cookies
});

export default api;