import React, { useState, useEffect } from "react";
import "./login.scss";
import useAuth from "../../services/auth/hooks";

function Login() {
  const { onLogin, noAuth, resetPassword } = useAuth();
  const [fields, setFields] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [reset, setReset] = useState(false);
  const [succesReset, setSuccesReset] = useState(false);
  const resetPass = () => {
    resetPassword(fields.email, fields.newPassword);
    setSuccesReset(true);
    setReset(false);
  };
  const submit = (e) => {
    e.preventDefault();
    reset ? resetPass() : onLogin(fields.email, fields.password);
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
          {noAuth && !reset && (
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
              required={!reset}
              disabled={reset}
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
              required={!reset}
              disabled={reset}
              onChange={(e) => {
                setFields({ ...fields, password: e.target.value });
              }}
            ></input>
            <button
              style={{ width: "100%" }}
              type="submit"
              disabled={reset}
              className="loginWrapper__loginContainer__inputContainer__button"
            >
              Login
            </button>
            {succesReset && !noAuth && (
              <p className="loginWrapper__loginContainer__succesMessage">
                Hasło zostało zmienione
              </p>
            )}
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
                type="password"
                name="password"
                className="loginWrapper__loginContainer__inputContainer__password"
                placeholder="Nowe hasło"
                autoComplete="on"
                required
                onChange={(e) => {
                  setFields({ ...fields, newPassword: e.target.value });
                }}
              ></input>
              <button
                type="submit"
                className="loginWrapper__loginContainer__inputContainer__button"
              >
                Resetuj
              </button>
              {noAuth && reset && (
                <p className="loginWrapper__loginContainer__errorMessage">
                  Niepoprawny email
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default Login;
