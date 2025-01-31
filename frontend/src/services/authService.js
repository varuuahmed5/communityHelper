import axios from 'axios';
import { apiUrl } from '../utils/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    if (response.data) {
      localStorage.setItem('authData', JSON.stringify(response.data));
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authData');
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    return null;
  }
};
