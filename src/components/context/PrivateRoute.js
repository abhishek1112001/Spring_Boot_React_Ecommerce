import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  // Check if the route requires admin and if the user is admin
  const isProtectedRoute = element.props?.path?.includes("/admin") && !isAdmin;

  // Allow navigation to public routes like /login and /user-register without authentication
  const isPublicRoute =
    element.props?.path === "/user/user-register" ||
    element.props?.path === "/login";

  if (!isAuthenticated && !isPublicRoute) {
    // If not authenticated and not a public route, redirect to login page
    return <Navigate to="/login" />;
  }

  if (isProtectedRoute) {
    // If the route requires admin and the user is not admin, redirect to login or another page
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
