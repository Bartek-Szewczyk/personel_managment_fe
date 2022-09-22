import React, { useState, useEffect } from "react";
import "./login.scss";
import useAuth from "../../services/auth/hooks";

function Login() {
  const { onLogin, roles, noAuth } = useAuth();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [reset, setReset] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    onLogin(fields.email, fields.password);
  };
  return (
    <form onSubmit={submit}>
      <div className="loginWrapper">
        <div className="loginWrapper__loginContainer">
          {/* {!isAdmin && (
          <p className="loginWrapper__loginContainer__errorMessage">
            Nie masz dostępu do tej aplikacji
          </p>
        )} */}
          {noAuth && (
            <p className="loginWrapper__loginContainer__errorMessage">
              Niepoprawny login lub hasło
            </p>
          )}
          <h1 className="loginWrapper__loginContainer__title">Login</h1>
          <div
            name="loginForm"
            className="loginWrapper__loginContainer__inputContainer"
          >
            <input
              type="email"
              name="email"
              className="loginWrapper__loginContainer__inputContainer__mail"
              placeholder="email"
              required
              onChange={(e) => {
                setFields({ ...fields, email: e.target.value });
              }}
            ></input>
            <input
              type="password"
              name="password"
              className="loginWrapper__loginContainer__inputContainer__password"
              placeholder="Hasło"
              autoComplete="on"
              required
              onChange={(e) => {
                setFields({ ...fields, password: e.target.value });
              }}
            ></input>
            <button
              style={{ width: "100%" }}
              type="submit"
              className="loginWrapper__loginContainer__inputContainer__button"
            >
              Login
            </button>
          </div>
          <p
            className="loginWrapper__loginContainer__link"
            onClick={() => setReset(reset ? false : true)}
          >
            Reset hasła?
          </p>
          {reset && (
            <div
              name="loginForm"
              className="loginWrapper__loginContainer__inputContainer"
            >
              <input
                type="email"
                name="email"
                className="loginWrapper__loginContainer__inputContainer__mail"
                placeholder="email"
                required
                onChange={(e) => {
                  setFields({ ...fields, email: e.target.value });
                }}
              ></input>
              <input
                type="submit"
                className="loginWrapper__loginContainer__inputContainer__button"
                value="Wyślij"
              ></input>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default Login;
