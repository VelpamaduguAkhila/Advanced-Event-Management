// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  // Function to set the token after login
  const setToken = (token) => {
    setAuthState({ ...authState, token });
  };

  // Function to set the user details after login
  const setUser = (user) => {
    setAuthState({ ...authState, user });
  };

  // Function to log out (clear token and user)
  const logout = () => {
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);