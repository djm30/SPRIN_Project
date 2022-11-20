import React from "react";
import AboutUs from "../components/Home/AboutUs";
import CallToAction from "../components/Home/CallToAction";
import ConnectionSupportAdvocacy from "../components/Home/CSA";
import Modal from "../components/UI/Modal/Modal";
import ContentContainer from "../components/UI/ContentContainer";
import PopUp from "../components/UI/UrgentHelpPopup";

const Home = () => {
    return (
        <>
            <PopUp />
            <CallToAction />
            <ConnectionSupportAdvocacy />
            <AboutUs />
            {/* PADDING BETWEEN ABOUT US AND FOOTER */}
            <div className="h-16"></div>
        </>
    );
};

export default Home;
