import axios from 'axios';

// Create a centralized Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Request Interceptor: Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const userStorage = localStorage.getItem('travel_loop_user');
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        if (user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
