import React from "react";
import { Outlet, Link } from "react-router-dom";
import CustomLink from "../customLink/customLink";
import "./navigartion.scss";

function Navigation() {
  return (
    <div className="navigationContainer">
      <div className="navigationContainer__navigation">
        <CustomLink to="/personel_managment_fe">Calendar</CustomLink>
        <CustomLink to="/statistic">Statistic</CustomLink>
        <CustomLink to="/staff">Staff</CustomLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Navigation;
