import React from "react";
import "./error.scss";
import errorIcon from "../../assets/404-error.svg";

function Error() {
  return (
    <div className="errorContainer">
      <img src={errorIcon} alt="error" className="errorContainer__img" />
      <p className="errorContainer__text">Nie odnaleziono takiej strony</p>
    </div>
  );
}

export default Error;
