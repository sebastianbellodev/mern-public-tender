import { createContext, useContext, useState } from 'react';
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

  const getFiles = async () => {
    try {
      const res = await getFilesRequest();
      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFile = async (id) => {
    try {
      const res = await getFileRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const postFile = async (file) => {
    try {
      await postFileRequest(file);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (id) => {
    try {
      const res = await deleteFileRequest(id);
      if (res.status === 204) setFiles(files.filter((file) => file.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const putFile = async (id, task) => {
    try {
      await putFileRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FileContext.Provider
      value={{ files, getFiles, getFile, postFile, putFile, deleteFile }}
    >
      {children}
    </FileContext.Provider>
  );
}
