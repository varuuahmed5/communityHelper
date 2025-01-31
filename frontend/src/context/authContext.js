import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser, logoutUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const history = useHistory();

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    if (userData) {
      setAuthData(userData);
      history.push('/dashboard');
    }
  };

  const logout = () => {
    logoutUser();
    setAuthData(null);
    history.push('/');
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('authData'));
    if (savedData) {
      setAuthData(savedData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
