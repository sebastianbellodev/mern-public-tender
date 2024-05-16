import { createContext, useContext, useState } from 'react';
import { getLawsRequest } from '../api/routes/law.routes.js';

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

  const getLaws = async () => {
    try {
      const res = await getLawsRequest();
      setLaws(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LawContext.Provider value={{ laws, getLaws }}>
      {children}
    </LawContext.Provider>
  );
}
