import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    }
    localStorage.removeItem("token");
    return false;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
}

const ProtectedRoute = ({ Children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/" replace />;
  }
  return Children;
};

export default ProtectedRoute;
