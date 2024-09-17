import { createContext, useContext, useState, useEffect } from 'react';
import {
  getFilesRequest,
  getFileRequest,
  postFileRequest,
  deleteFileRequest,
  putFileRequest,
} from '../../api/routes/file.routes.js';

const FileContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFileContext = () => {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error('useFile must be within a FileProvider');
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);

  const getFiles = async () => {
    try {
      const res = await getFilesRequest();
      setFiles(res.data);
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

  const getFile = async (id) => {
    try {
      const res = await getFileRequest(id);
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

  const postFile = async (file) => {
    try {
      const res = await postFileRequest(file);
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

  const deleteFile = async (id) => {
    try {
      const res = await deleteFileRequest(id);
      if (res.status === 204) setFiles(files.filter((file) => file.id != id));
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

  const putFile = async (id, file) => {
    try {
      const res = await putFileRequest(id, file);
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
    <FileContext.Provider
      value={{
        files,
        getFiles,
        getFile,
        postFile,
        putFile,
        deleteFile,
        errors,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}
