import axios from '../axios.js';

export const getAddressesRequest = () => axios.get('/addresses');

export const getAddressRequest = (id) => axios.get(`/addresses/${id}`);

export const postAddressRequest = (file) => axios.post('/addresses', file);

export const deleteAddressRequest = (id) => axios.delete(`/addresses/${id}`);

export const putAddressRequest = (id, file) =>
  axios.put(`/addresses/${id}`, file);
