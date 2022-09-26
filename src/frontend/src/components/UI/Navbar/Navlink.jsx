import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "border-b-2 border-white" : "border-b-2 border-transparent"
      }
    >
      {children}
    </NavLink>
  );
};

export default Navlink;
