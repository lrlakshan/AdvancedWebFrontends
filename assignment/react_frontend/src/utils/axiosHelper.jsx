import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const baseURL = BASE_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true // Include this to send cookies with requests (for HTTP-only cookies)
});

export const axiosHelper = {
  get: async (url, config = {}) => {
    try {
      const response = await instance.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await instance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (url, config = {}) => {
    try {
      const response = await instance.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async (url, config = {}) => {
    try {
      const response = await instance.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
};