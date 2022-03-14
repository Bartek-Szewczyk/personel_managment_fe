import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import CustomLink from "../customLink/customLink";
import ExampleLogo from "../../assets/exampleLogo.png";
import "./navigartion.scss";

function Navigation() {
  const [logo, setLogo] = useState(ExampleLogo);
  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function (e) {
      setLogo(reader.result);
    }.bind(this);
  };
  return (
    <div className="navigationContainer">
      <div className="navigationContainer__navigation">
        <div className="navigationContainer__navigation__linkContainer">
          <div className="navigationContainer__navigation__linkContainer__logoWrapper">
            <label
              htmlFor="logo-input"
              className="navigationContainer__navigation__linkContainer__logoWrapper__label"
            >
              <img
                className="navigationContainer__navigation__linkContainer__logoWrapper__logo"
                alt="logo"
                src={logo}
              ></img>
            </label>
            <input
              id="logo-input"
              type="file"
              onChange={(e) => onChangeHandler(e)}
            ></input>
          </div>

          <CustomLink to="/personel_managment_fe">Calendar</CustomLink>
          <CustomLink to="/statistic">Statistic</CustomLink>
          <CustomLink to="/staff">Staff</CustomLink>
        </div>
        <button className="navigationContainer__navigation__logoutBtn">
          Wyloguj
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Navigation;
