import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { useAuthStore } from "../features/auth/store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore((s) => s.token);
  const decode = useDecodeToken();

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="auth/login" replace />;
  }

  // 🚨 SI DEBE CAMBIAR PASSWORD → LO BLOQUEAS
  if (decode?.type === "PASSWORD_RESET") {
    return <Navigate to="auth/change-temporary-password" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
