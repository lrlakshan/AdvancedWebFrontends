import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role, allowedRoles }) => {
  const isAuthorized = allowedRoles.includes(role);
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
