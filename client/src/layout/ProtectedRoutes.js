import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/get-started/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
