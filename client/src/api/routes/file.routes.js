import axios from '../axios.js';

export const getFilesRequest = () => axios.get('/files');

export const getFileRequest = (id) => axios.get(`/files/${id}`);

export const postFileRequest = (file) => axios.post('/files', file);

export const deleteFileRequest = (id) => axios.delete(`/files/${id}`);

export const putFileRequest = (id, file) => axios.put(`/files/${id}`, file);
