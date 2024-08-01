// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the baseURL according to your Django backend
});

export default API;
