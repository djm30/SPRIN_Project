import React from "react";
import { Link } from "react-router-dom";

// Single reusable link for the mobile menu
const MobileMenuLink = ({ children, to }) => {
    return (
        <Link
            className="hover:bg-slate-50 w-full p-4 text-skyblue-300 hover:text-darkblue-100"
            to={to}
        >
            {children}
        </Link>
    );
};

export default MobileMenuLink;
