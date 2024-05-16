import { createContext, useContext, useState } from 'react';
import { getInternationalPoliciesRequest } from '../api/routes/international.policy.routes.js';

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

  const getInternationalPolicies = async () => {
    try {
      const res = await getInternationalPoliciesRequest();
      setInternationalPolicies(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InternationalPolicyContext.Provider
      value={{ internationalPolicies, getInternationalPolicies }}
    >
      {children}
    </InternationalPolicyContext.Provider>
  );
}
