import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Obtener info del usuario decodificando el token y/o guardando el userData del login
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUser(userData);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    if (userData) localStorage.setItem('userData', JSON.stringify(userData));
    setToken(token);
    setUser(userData || {});
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
