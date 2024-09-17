import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAddressesRequest,
  getAddressRequest,
  postAddressRequest,
  deleteAddressRequest,
  putAddressRequest,
} from '../../api/routes/address.routes.js';

const AddressContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAddressContext = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error('useAddress must be within a AddressProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState([]);

  const getAddresses = async () => {
    try {
      const res = await getAddressesRequest();
      setAddresses(res.data);
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

  const getAddress = async (id) => {
    try {
      const res = await getAddressRequest(id);
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

  const postAddress = async (file) => {
    try {
      const res = await postAddressRequest(file);
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

  const deleteAddress = async (id) => {
    try {
      const res = await deleteAddressRequest(id);
      if (res.status === 204)
        setAddresses(addresses.filter((file) => file.id != id));
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

  const putAddress = async (id, file) => {
    try {
      const res = await putAddressRequest(id, file);
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
    <AddressContext.Provider
      value={{
        addresses,
        getAddresses,
        getAddress,
        postAddress,
        putAddress,
        deleteAddress,
        errors,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
