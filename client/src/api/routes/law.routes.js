import axios from '../axios.js';

export const getLawsRequest = () => axios.get('/laws');
