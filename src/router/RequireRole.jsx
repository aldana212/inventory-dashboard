import React from "react";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { Navigate, Outlet } from "react-router";

const RequireRole = ({ allowedRoles = [] }) => {
  const decode = useDecodeToken();

  if (!decode) return <Navigate to="auth/login" replace />;

  if (!allowedRoles?.includes(decode.role?.name)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
