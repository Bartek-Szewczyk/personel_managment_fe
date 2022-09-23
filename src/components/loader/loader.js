import React from "react";
import "./loader.scss";
function Loader({ loading }) {
  if (!loading) {
    return null;
  }
  return (
    <div className="loaderWpapper">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
