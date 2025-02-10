import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../paths";

const Header = () => {
  return (
    <header>
      <div className="header">
        <Link to={paths.Form}>Form</Link>
        <Link to={paths.Item}>Item</Link>
        <Link to={paths.List}>List</Link>
      </div>
    </header>
  );
};

export default Header;
