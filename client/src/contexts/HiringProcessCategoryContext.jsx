import { createContext, useContext, useState } from 'react';
import { getHiringProcessCategoriesRequest } from '../api/routes/hiring.process.category.routes.js';

const HiringProcessCategoryContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useHiringProcessCategoryContext = () => {
  const context = useContext(HiringProcessCategoryContext);

  if (!context) {
    throw new Error(
      'useHiringProcessCategory must be within a HiringProcessCategoryProvider'
    );
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function HiringProcessCategoryProvider({ children }) {
  const [hiringProcessCategories, setHiringProcessCategories] = useState([]);

  const getHiringProcessCategories = async () => {
    try {
      const res = await getHiringProcessCategoriesRequest();
      setHiringProcessCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HiringProcessCategoryContext.Provider
      value={{ hiringProcessCategories, getHiringProcessCategories }}
    >
      {children}
    </HiringProcessCategoryContext.Provider>
  );
}
