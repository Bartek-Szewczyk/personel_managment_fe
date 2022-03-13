import React from "react";
import "./reset.scss";

function Reset() {
  return (
    <div className="resetWrapper">
      <div className="resetWrapper__loginContainer">
        <h1 className="resetWrapper__loginContainer__title">New Password</h1>
        <div
          name="loginForm"
          className="resetWrapper__loginContainer__inputContainer"
        >
          <input
            type="password"
            name="password"
            className="resetWrapper__loginContainer__inputContainer__password"
            placeholder="password"
            autoComplete="on"
            required
          ></input>
          <p>Repeat password</p>
          <input
            type="password"
            name="password"
            className="resetWrapper__loginContainer__inputContainer__password"
            placeholder="password"
            autoComplete="on"
            required
          ></input>
          <input
            type="submit"
            className="resetWrapper__loginContainer__inputContainer__button"
            value="Confirm"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Reset;
