import { createContext, useContext, useState } from 'react';
import { getHiringsRequest } from '../api/routes/hiring.routes.js';

const HiringContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useHiringContext = () => {
  const context = useContext(HiringContext);

  if (!context) {
    throw new Error('useHiring must be within a HiringProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function HiringProvider({ children }) {
  const [hirings, setHirings] = useState([]);

  const getHirings = async () => {
    try {
      const res = await getHiringsRequest();
      setHirings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HiringContext.Provider value={{ hirings, getHirings }}>
      {children}
    </HiringContext.Provider>
  );
}
