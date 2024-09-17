import { createContext, useContext, useState } from 'react';
import { getHiringProcessCategoriesRequest } from '../../api/routes/hiring.process.category.routes.js';

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
  const [errors, setErrors] = useState([]);

  const getHiringProcessCategories = async () => {
    try {
      const res = await getHiringProcessCategoriesRequest();
      setHiringProcessCategories(res.data);
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
    <HiringProcessCategoryContext.Provider
      value={{ hiringProcessCategories, getHiringProcessCategories, errors }}
    >
      {children}
    </HiringProcessCategoryContext.Provider>
  );
}
