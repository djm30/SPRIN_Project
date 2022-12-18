import React from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Navbar from "../components/UI/Navbar/Navbar";

// Generic page for when a url is not matched
const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar transparent={false} />
            <ContentContainer className="flex flex-col min-h-full justify-center items-center flex-1">
                <h4 className="text-2xl md:text-5xl text-center text-darkblue-100 lg:-translate-y-32">
                    The requested resource could not be found
                </h4>
                <p className="md:text-2xl lg:-translate-y-28">Return to home</p>
            </ContentContainer>
        </div>
    );
};

export default NotFound;
