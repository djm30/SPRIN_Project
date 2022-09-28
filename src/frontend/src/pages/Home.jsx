import React, { useRef } from "react";
import AboutUs from "../components/Home/AboutUs";
import CallToAction from "../components/Home/CallToAction";
import ConnectionSupportAdvocacy from "../components/Home/CSA";

const Home = () => {
  return (
    <>
      <CallToAction />
      <ConnectionSupportAdvocacy />
      <AboutUs />
      {/* PADDING BETWEEN ABOUT US AND FOOTER */}
      <div className="h-16"></div>
    </>
  );
};

export default Home;
