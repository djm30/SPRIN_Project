import React from "react";
import AboutUs from "../components/Home/AboutUs";
import CallToAction from "../components/Home/CallToAction";
import ConnectionSupportAdvocacy from "../components/Home/CSA";
import PopUp from "../components/UI/UrgentHelpPopup";

// Home page
// Displays the home page
const Home = () => {
    return (
        <>
            <PopUp data-cy="closeBut" />
            <CallToAction data-cy="joinBut" />
            <ConnectionSupportAdvocacy />
            <AboutUs />
            {/* PADDING BETWEEN ABOUT US AND FOOTER */}
            <div className="h-16"></div>
        </>
    );
};

export default Home;
