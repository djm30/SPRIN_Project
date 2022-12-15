import React from "react";
import { NavLink } from "react-router-dom";

// Defines a reusable link for the navbar
const Navlink = ({ children, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-white"
                    : "border-b-2 border-transparent"
            }
        >
            {children}
        </NavLink>
    );
};

export default Navlink;
