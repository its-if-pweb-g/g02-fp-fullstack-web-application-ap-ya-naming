import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/Assets/new-logo.png";
import navProfile from "../../assets/Assets/nav-profile.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
