import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link style={{padding: 25}} to="/logout">Logout</Link>
  );
};

export default Header;
