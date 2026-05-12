import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://163.123.183.89:17705/api',
  timeout: 60000, // 60s — connexion DB distante peut être très lente
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Pas de connexion réseau');
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        useAuthStore.getState().logout();
        toast.error('Session expirée');
        window.location.href = '/login';
        break;
      case 403:
        toast.error('Accès refusé');
        window.location.href = '/unauthorized';
        break;
      case 404:
        toast.error('Ressource introuvable');
        break;
      case 500:
        toast.error('Erreur serveur, réessayez');
        break;
      default:
        // Other errors handled by specific component queries/mutations
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
