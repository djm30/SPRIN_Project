import React from "react";
import ContentContainer from "../ContentContainer";
import Navlink from "./Navlink";
import { Link } from "react-router-dom";

const Navbar = ({ transparent }) => {
  const bgColor = transparent ? "transparent" : "darkblue-100";

  return (
    <nav className={`h-20 bg-${bgColor} font-body text-white`}>
      {/* LABELS */}
      <ContentContainer className="flex justify-between items-center h-full">
        {/* LABELS */}
        <div className="flex items-end space-x-12">
          <Link to="/home">
            <h4 className="text-3xl">SPRIN</h4>
          </Link>
          <div>
            <ol className="flex space-x-8 text-lg">
              <Navlink to="/home">Home</Navlink>
              <Navlink to="/partners">Partners</Navlink>
              <Navlink to="/resources">Resources</Navlink>
              <Navlink to="/events">Events</Navlink>
            </ol>
          </div>
        </div>
        {/* BUTTON / BURGER */}
        <div>
          <button className="bg-skyblue-200 hover:bg-skyblue-300 transition-all px-9 py-3 rounded-xl shadow-sm">
            Login
          </button>
          {/* BURGER */}
          {/* TODO */}
          <div></div>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
