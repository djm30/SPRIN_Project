import React from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Navbar from "../components/UI/Navbar/Navbar";

// Loading page
// Displays a loading page
const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar transparent={false} />
            <ContentContainer className="flex flex-col min-h-full justify-center items-center flex-1">
                <h4 className="text-2xl md:text-5xl text-center text-darkblue-100 lg:-translate-y-32">
                    Loading...
                </h4>
            </ContentContainer>
        </div>
    );
};

export default Loading;
