import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Your API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response.status === 401 && response.data.code === 'token_not_valid') {
      // Handle token expiration, e.g., refresh token
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        try {
          const { data } = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
          localStorage.setItem('access', data.access);
          api.defaults.headers.Authorization = `Bearer ${data.access}`;
          return api(response.config); // Retry the original request
        } catch (err) {
          console.error('Token refresh failed', err);
          // Handle token refresh failure, e.g., logout user
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
