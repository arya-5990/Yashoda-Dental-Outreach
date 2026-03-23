import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ysp_token');
    const storedUser = localStorage.getItem('ysp_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (contact, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { contact, password });
      
      localStorage.setItem('ysp_token', res.data.token);
      localStorage.setItem('ysp_user', JSON.stringify(res.data.user));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      console.error("Login Error details:", error.response?.data);
      const msg = error.response?.data?.error || 'Failed to map details.';
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, userData);
      
      localStorage.setItem('ysp_token', res.data.token);
      localStorage.setItem('ysp_user', JSON.stringify(res.data.user));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.error || 'Registration failed.';
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('ysp_token');
    localStorage.removeItem('ysp_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
