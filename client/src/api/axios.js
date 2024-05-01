import axios from 'axios';

const API = import.meta.env.VITE_API;
const BASIC_USERNAME = import.meta.env.VITE_BASIC_USERNAME;
const BASIC_PASSWORD = import.meta.env.VITE_BASIC_PASSWORD;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
  auth: {
    username: BASIC_USERNAME,
    password: BASIC_PASSWORD,
  },
});

export default axiosInstance;
