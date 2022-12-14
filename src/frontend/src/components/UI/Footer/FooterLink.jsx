import React from "react";
import { Link } from "react-router-dom";

// Defines a reusable link for the footer
export const FooterLink = ({ children, to }) => {
    return (
        <Link
            className="inline border-b-2 border-transparent hover:border-skyblue-100 hover:text-skyblue-100"
            to={to}
        >
            {children}
        </Link>
    );
};
