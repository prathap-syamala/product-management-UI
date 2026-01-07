import { Navigate } from "react-router-dom";

const RoleGuard = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleGuard;
