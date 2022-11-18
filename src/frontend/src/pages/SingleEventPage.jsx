import React from "react";
import SingleEvent from "../components/Events/SingleEvent";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import Loading from "./Loading";
import NotFound from "./NotFound";

const SingleEventPage = ({ event }) => {
    if (event === undefined) return <Loading />;
    if (event === null) return <NotFound />;
    return (
        <div className="min-h-screen">
            <Navbar transparent={false} />
            <ContentContainer>
                <Heading>{event.title}</Heading>
                <div className="flex justify-center mt-10">
                    <SingleEvent event={event} />
                </div>
            </ContentContainer>
        </div>
    );
};

export default SingleEventPage;
