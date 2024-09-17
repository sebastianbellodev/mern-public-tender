import { createContext, useContext, useState } from 'react';
import { getLawsRequest } from '../../api/routes/law.routes.js';

const LawContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLawContext = () => {
  const context = useContext(LawContext);

  if (!context) {
    throw new Error('useLaw must be within a LawProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function LawProvider({ children }) {
  const [laws, setLaws] = useState([]);
  const [errors, setErrors] = useState([]);

  const getLaws = async () => {
    try {
      const res = await getLawsRequest();
      setLaws(res.data);
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
    <LawContext.Provider value={{ laws, getLaws, errors }}>
      {children}
    </LawContext.Provider>
  );
}
