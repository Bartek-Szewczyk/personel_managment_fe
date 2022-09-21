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
  if (!token || noAuth) {
    return <Navigate to="/login" replace />;
  } else if (!isAdmin) {
    <Navigate to="/personel_managment_fe" replace />;
  }

  return children;
};
export default ProtectedRoute;
