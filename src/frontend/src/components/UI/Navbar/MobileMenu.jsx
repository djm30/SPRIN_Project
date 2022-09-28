import React from "react";
import MobileMenuLink from "./MobileMenuLink";

const MobileMenu = ({ open }) => {
  const openClass = open ? "flex" : "hidden";

  return (
    <div class="md:hidden z-10 transition-all">
      <div
        class={`rounded-lg max-w-sm mx-auto text-center z-10 absolute ${openClass} flex-col items-center self-end py-8 mt-10 space-y-1 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md shadow-md -translate-y-12
        `}
      >
        <MobileMenuLink to="/home">Home</MobileMenuLink>
        <MobileMenuLink to="/partners">Partners</MobileMenuLink>
        <MobileMenuLink to="/resources">Resources</MobileMenuLink>
        <MobileMenuLink to="/events">Events</MobileMenuLink>
        <MobileMenuLink to="/login">Login</MobileMenuLink>
      </div>
    </div>
  );
};

export default MobileMenu;
