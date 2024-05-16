import axios from '../axios.js';

export const getAssessmentMetricsRequest = () =>
  axios.get('/assessment-metrics');
