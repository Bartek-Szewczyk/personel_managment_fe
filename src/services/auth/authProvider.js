import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../authService";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState(null);
  const [noAuth, setNoAuth] = useState(false);

  const handleLogin = async (email, password) => {
    await authService
      .login(email, password)
      .then((res) => {
        setToken(res.data.token);
        setRoles(res.data.userRole);
        setNoAuth(false);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        setNoAuth(true);
      })
      .finally(() => {
        navigate("/personel_managment_fe");
      });
  };
  const handleLogout = () => {
    authService.logout();
    setToken("");
  };
  const handleResetPassword = async (email, password) => {
    await authService.resetPassword(email, password).catch((err) => {
      setNoAuth(true);
    });
  };
  const isAdmin = roles?.indexOf("Admin") != -1;

  const value = {
    noAuth,
    userId: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))?.userId
      : "",
    roles: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))?.userRole
      : "",
    token: JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))?.token
      : "",
    onLogin: handleLogin,
    onLogout: handleLogout,
    resetPassword: handleResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
