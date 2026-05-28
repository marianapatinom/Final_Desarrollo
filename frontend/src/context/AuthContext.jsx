import { createContext, useContext, useMemo, useState } from 'react';
import { loginRequest, registerRequest } from '../services/authService.js';

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser = sessionStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  const saveSession = (authData) => {
    sessionStorage.setItem('token', authData.token);
    sessionStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  const register = async (formData) => {
    const response = await registerRequest(formData);
    saveSession(response.data);
  };

  const login = async (credentials) => {
    const response = await loginRequest(credentials);
    saveSession(response.data);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      register,
      login,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
};
