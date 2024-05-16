/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';
import {
  signupRequest,
  loginRequest,
  verifyTokenRequest,
} from '../api/routes/auth.routes.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(['useAuthContext must be within an AuthProvider']);

  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await signupRequest(user);
      setUser(res.data);
      setAuthenticated(true);
    } catch (err) {
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.rresponse.data.error]);
    }
  };

  const login = async (values) => {
    try {
      const res = await loginRequest(values);
      setAuthenticated(true);
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data);
      if (Array.isArray(err.response.data)) {
        return setErrors(err.response.data.map((err) => err.error));
      }
      setErrors([err.response.data.error]);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) {
          setAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
        setAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        loading,
        user,
        authenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
