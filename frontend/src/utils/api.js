import axios from 'axios';

export const apiUrl = 'http://localhost:5000/api'; // Your API URL

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
