import { createContext, useContext, useState } from 'react';
import { getAssessmentMetricsRequest } from '../api/routes/assessment.metric.routes.js';

const AssessmentMetricContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAssessmentMetricContext = () => {
  const context = useContext(AssessmentMetricContext);

  if (!context) {
    throw new Error(
      'useAssessmentMetric must be within a AssessmentMetricProvider'
    );
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function AssessmentMetricProvider({ children }) {
  const [assessmentMetrics, setAssessmentMetrics] = useState([]);

  const getAssessmentMetrics = async () => {
    try {
      const res = await getAssessmentMetricsRequest();
      setAssessmentMetrics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AssessmentMetricContext.Provider
      value={{ assessmentMetrics, getAssessmentMetrics }}
    >
      {children}
    </AssessmentMetricContext.Provider>
  );
}
