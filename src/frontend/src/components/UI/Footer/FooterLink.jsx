import React from "react";
import { Link } from "react-router-dom";

export const FooterLink = ({ children, to }) => {
  return <Link to={to}>{children}</Link>;
};
