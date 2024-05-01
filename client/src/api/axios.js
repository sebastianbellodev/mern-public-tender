import axios from 'axios';

const API = import.meta.env.URL;
const BASIC_USERNAME = import.meta.env.BASIC_AUTH_USER;
const BASIC_PASSWORD = import.meta.env.BASIC_AUTH_PASSWORD;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
  auth: {
    username: BASIC_USERNAME,
    password: BASIC_PASSWORD,
  },
});

export default axiosInstance;
