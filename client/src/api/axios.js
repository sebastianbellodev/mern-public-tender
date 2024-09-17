import axios from 'axios';

let API = import.meta.env.VITE_PROD_API;
const BASIC_USERNAME = import.meta.env.VITE_BASIC_AUTH_USER;
const BASIC_PASSWORD = import.meta.env.VITE_BASIC_AUTH_PASSWORD;

if (import.meta.env.VITE_ENV === 'development') {
  API = import.meta.env.VITE_DEV_API;
}

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
  auth: {
    username: BASIC_USERNAME,
    password: BASIC_PASSWORD,
  },
});

const token = localStorage.getItem('token');

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
