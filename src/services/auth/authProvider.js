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
        console.log(res);
      })
      .catch((err) => {
        setNoAuth(true);
      });

    if (!isAdmin) {
      navigate("/login");
    } else {
      navigate("/personel_managment_fe");
    }
  };
  const handleLogout = () => {
    authService.logout();
    setToken("");
    localStorage.removeItem("user");
  };
  const isAdmin = roles?.indexOf("Admin") != -1;

  const value = {
    noAuth,
    roles,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
