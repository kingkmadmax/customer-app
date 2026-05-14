import axios from 'axios';
import { useAuthStore } from '@/components/store/cat-store';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;