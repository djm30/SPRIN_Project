import React from "react";
import TopFooter from "./TopFooter";
import MiddleFooter from "./MiddleFooter";
import LowerFooter from "./LowerFooter";

// Footer component
// Renders the top, middle, and lower footer
const Footer = () => {
    return (
        <footer>
            <TopFooter />
            <MiddleFooter />
            <LowerFooter />
        </footer>
    );
};

export default Footer;
