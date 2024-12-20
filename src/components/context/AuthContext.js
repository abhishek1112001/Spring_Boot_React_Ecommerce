import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get initial state from localStorage
  const initialToken = localStorage.getItem("token");
  const initialRole = localStorage.getItem("role");
  const initialCartId = localStorage.getItem("cartIdRetrive");

  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const [isAdmin, setIsAdmin] = useState(initialRole === "ADMIN");
  const [isUser, setIsUser] = useState(initialRole === "USER");
  const [cartIdRetrive, setCartIdRetrive] = useState(initialCartId);

  // This effect will update the state if the page is refreshed
  useEffect(() => {
    if (initialToken) {
      setIsAuthenticated(true);
      if (initialRole === "ADMIN") {
        setIsAdmin(true);
      }
      if (initialRole === "USER") {
        setIsUser(true);
      }
    }
  }, [initialToken, initialRole]);

  const login = (token, role, cartIdRetrive) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("cartIdRetrive", cartIdRetrive);
    setIsAuthenticated(true);
    setCartIdRetrive(cartIdRetrive);
    if (role === "ADMIN") {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cartIdRetrive");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsUser(false);
    setCartIdRetrive(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isUser, isAdmin, cartIdRetrive, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
