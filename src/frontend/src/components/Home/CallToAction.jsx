import React from "react";
import Navbar from "../UI/Navbar/Navbar";
import ContentContainer from "../UI/ContentContainer";
import styles from "./CallToAction.module.css";
import JoinPopUp from "../Partners/JoinTodayPop";

const CallToAction = () => {
    return (
        <section
            id={styles.cta}
            className="h-screen max-h-[1000px] sm:max-h-full w-screen bg-darkblue-100 bg-no-repeat  rounded-bl-[100px]  sm:rounded-bl-[340px] relative overflow-hidden"
        >
            {/* NAVBAR */}
            <Navbar transparent={true} />
            {/* HEADING AND BUTTONS */}
            <ContentContainer className="mt-8 sm:mt-20 space-y-12 md:space-y-20 2xl:space-y-40 flex flex-col items-center ">
                <div className="flex flex-col justify-around h-full sm:block space-y-6 2xl:space-y-12 sm:mr-32">
                    <h1 className="text-4xl md:text-6xl 2xl:text-8xl text-white font-display">
                        Suicide Prevention & Research Impact Network
                    </h1>
                    <h2 className="text-3xl md:text-5xl 2xl:text-6xl text-neutral-300 font-display">
                        Focused on strengthening research-practice connections
                        and improving the evidence base
                    </h2>
                </div>
                <div className="space-x-2 sm:space-x-16">
                    <JoinPopUp />
                    <a className="bg-grey-transparent md:text-lg hover:bg-skyblue-100 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
                        Learn More
                    </a>
                </div>
            </ContentContainer>
        </section>
    );
};

export default CallToAction;
