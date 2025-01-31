import axios from 'axios';
import { apiUrl } from '../utils/api';

export const getReports = async () => {
  try {
    const response = await axios.get(`${apiUrl}/reports`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return [];
  }
};

export const createReport = async (reportData) => {
  try {
    const response = await axios.post(`${apiUrl}/reports`, reportData);
    return response.data;
  } catch (error) {
    console.error('Failed to create report:', error);
    return null;
  }
};
