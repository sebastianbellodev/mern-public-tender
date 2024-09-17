import axios from '../axios.js';

export const getCompaniesRequest = () => axios.get('/companies');

export const getCompanyRequest = (id) => axios.get(`/companies/${id}`);

export const postCompanyRequest = (file) => axios.post('/companies', file);

export const deleteCompanyRequest = (id) => axios.delete(`/companies/${id}`);

export const putCompanyRequest = (id, file) =>
  axios.put(`/companies/${id}`, file);
