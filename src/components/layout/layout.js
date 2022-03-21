import React from "react";
import "./layout.scss";

function Layout({ title, buttonText, buttonAction, children }) {
  const buttonHandler = () => buttonAction();
  return (
    <div className="layoutWrapper">
      <div className="layoutWrapper__titleContainer">
        <h1 className="layoutWrapper__titleContainer__title">{title}</h1>
        {buttonText && (
          <div className="layoutWrapper__titleContainer__buttonWrapper">
            <button
              className="layoutWrapper__titleContainer__buttonWrapper__button"
              onClick={buttonHandler}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
      <div className="layoutWrapper__content">{children}</div>
    </div>
  );
}

export default Layout;
