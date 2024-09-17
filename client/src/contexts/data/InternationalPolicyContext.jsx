import { createContext, useContext, useState } from 'react';
import { getInternationalPoliciesRequest } from '../../api/routes/international.policy.routes.js';

const InternationalPolicyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInternationalPolicyContext = () => {
  const context = useContext(InternationalPolicyContext);

  if (!context) {
    throw new Error(
      'useInternationalPolicy must be within a InternationalPolicyProvider'
    );
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function InternationalPolicyProvider({ children }) {
  const [internationalPolicies, setInternationalPolicies] = useState([]);
  const [errors, setErrors] = useState([]);

  const getInternationalPolicies = async () => {
    try {
      const res = await getInternationalPoliciesRequest();
      setInternationalPolicies(res.data);
    } catch (err) {
      const { response: { data: { error } = {} } = {} } = err;

      if (Array.isArray(error.issues)) {
        return setErrors(error.issues.map((issue) => issue.message));
      }

      if (Array.isArray(error)) {
        return setErrors(error);
      }

      setErrors([error]);
    }
  };

  return (
    <InternationalPolicyContext.Provider
      value={{ internationalPolicies, getInternationalPolicies, errors }}
    >
      {children}
    </InternationalPolicyContext.Provider>
  );
}
