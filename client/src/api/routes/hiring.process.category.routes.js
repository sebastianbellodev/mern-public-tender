import axios from '../axios.js';

export const getHiringProcessCategoriesRequest = () =>
  axios.get('/hiring-process-categories');
