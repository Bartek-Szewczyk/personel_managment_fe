import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import CustomLink from "../customLink/customLink";
import ExampleLogo from "../../assets/exampleLogo.png";
import "./navigartion.scss";
import useAuth from "../../services/auth/hooks";

function Navigation() {
  const { onLogout, roles } = useAuth();

  const isAdmin = roles?.indexOf("Admin") != -1;
  const [logo, setLogo] = useState(ExampleLogo);
  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setLogo(reader.result);
    }.bind(this);
  };
  const userView = (
    <>
      <CustomLink to="/personel_managment_fe">Kalendarz</CustomLink>
      <CustomLink to="/my_events">Moje zmiany</CustomLink>
    </>
  );
  const adminView = (
    <>
      <CustomLink to="/personel_managment_fe">Kalendarz</CustomLink>
      <CustomLink to="/staff">Personel</CustomLink>
      <CustomLink to="/statistic">Statystyki</CustomLink>
    </>
  );
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
          {isAdmin ? adminView : userView}
        </div>
        <div className="navigationContainer__navigation__buttonContainer">
          <Link to="/login" style={{ width: "80%" }}>
            <button
              onClick={onLogout}
              className="navigationContainer__navigation__buttonContainer__logoutBtn"
            >
              Wyloguj
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navigation;
