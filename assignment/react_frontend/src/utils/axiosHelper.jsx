import axios from "axios";
import { BASE_URL } from "../constants/constants";

const baseURL = BASE_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true, // Include this to send cookies with requests (for HTTP-only cookies)
});

export const axiosHelper = {
  get: async (url, config = {}) => {
    const response = await instance.get(url, config);
    return response.data;
  },
  post: async (url, data = {}, config = {}) => {
    const response = await instance.post(url, data, config);
    return response.data;
  },
  put: async (url, data = {}, config = {}) => {
    const response = await instance.put(url, data, config);
    return response.data;
  },
  delete: async (url, config = {}) => {
    const response = await instance.delete(url, config);
    return response.data;
  },
  logout: async (url, config = {}) => {
    const response = await instance.get(url, config);
    return response;
  },
};
