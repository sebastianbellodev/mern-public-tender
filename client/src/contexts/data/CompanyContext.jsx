import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCompaniesRequest,
  getCompanyRequest,
  postCompanyRequest,
  deleteCompanyRequest,
  putCompanyRequest,
} from '../../api/routes/company.routes.js';

const CompanyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error('useCompany must be within a CompanyProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState([]);

  const getCompanies = async () => {
    try {
      const res = await getCompaniesRequest();
      setCompanies(res.data);
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

  const getCompany = async (id) => {
    try {
      const res = await getCompanyRequest(id);
      return res.data;
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

  const postCompany = async (file) => {
    try {
      const res = await postCompanyRequest(file);
      return res;
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

  const deleteCompany = async (id) => {
    try {
      const res = await deleteCompanyRequest(id);
      if (res.status === 204)
        setCompanies(companies.filter((file) => file.id != id));
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

  const putCompany = async (id, file) => {
    try {
      const res = await putCompanyRequest(id, file);
      return res;
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

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        getCompanies,
        getCompany,
        postCompany,
        putCompany,
        deleteCompany,
        errors,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
