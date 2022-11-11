import React from "react";
import AboutUs from "../components/Home/AboutUs";
import CallToAction from "../components/Home/CallToAction";
import ConnectionSupportAdvocacy from "../components/Home/CSA";
import Modal from "../components/UI/Modal/Modal";

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
