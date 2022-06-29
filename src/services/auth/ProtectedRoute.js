import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import useAuth from "./hooks";

const ProtectedRoute = ({ children }) => {
  const { token, roles, noAuth } = useAuth();

  const isAdmin = roles?.indexOf("Admin") != -1;
  if (!token || !isAdmin || noAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
