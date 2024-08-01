import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the baseURL according to your Django backend
});

export default API;
