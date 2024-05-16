import axios from '../axios.js';

export const getInternationalPoliciesRequest = () =>
  axios.get('/international-policies');
