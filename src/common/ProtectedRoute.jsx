// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const accessToken = localStorage.getItem('access')

  return accessToken ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
