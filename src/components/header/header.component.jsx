import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown_logo.svg";
import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="header-menu">
      <Link className="menu-link" to="/shop">
        SHOP
      </Link>
      <Link className="menu-link" to="/contact">
        CONTACT
      </Link>
    </div>
  </div>
);

export default Header;
