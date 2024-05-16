import { createContext, useContext, useState, useEffect } from 'react';
import {
  getFilesRequest,
  getFileRequest,
  postFileRequest,
  deleteFileRequest,
  putFileRequest,
} from '../api/routes/file.routes.js';

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
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
    }
  };

  const getFile = async (id) => {
    try {
      const res = await getFileRequest(id);
      return res.data;
    } catch (err) {
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
    }
  };

  const postFile = async (file) => {
    try {
      await postFileRequest(file);
    } catch (err) {
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
    }
  };

  const deleteFile = async (id) => {
    try {
      const res = await deleteFileRequest(id);
      if (res.status === 204) setFiles(files.filter((file) => file.id != id));
    } catch (err) {
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
    }
  };

  const putFile = async (id, file) => {
    try {
      await putFileRequest(id, file);
    } catch (err) {
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
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
