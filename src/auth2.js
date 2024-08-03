import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/message/', // Your API base URL
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from local storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response.status === 401 && response.data.code === 'token_not_valid') {
      // Handle token expiration
      const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token from local storage
      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const { data } = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
          
          // Update tokens in local storage
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);

          // Update Authorization header for the api instance
          api.defaults.headers.Authorization = `Bearer ${data.access}`;

          // Retry the original request with the new access token
          return api(response.config);
        } catch (err) {
          console.error('Token refresh failed', err);
          // Optionally, handle refresh failure, e.g., logout user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // Redirect to login page or show an error message
          window.location.href = '/login';
        }
      } else {
        // No refresh token, handle logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page or show an error message
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;