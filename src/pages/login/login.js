import React, { useState } from "react";
import "./login.scss";

function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [reset, setReset] = useState(false);
  return (
    <div className="loginWrapper">
      <div className="loginWrapper__loginContainer">
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
            placeholder="password"
            autoComplete="on"
            required
            onChange={(e) => {
              setFields({ ...fields, password: e.target.value });
            }}
          ></input>
          <input
            type="submit"
            className="loginWrapper__loginContainer__inputContainer__button"
            value="Login"
          ></input>
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
  );
}

export default Login;
