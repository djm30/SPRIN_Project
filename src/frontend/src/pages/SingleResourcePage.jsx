import React from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import Loading from "./Loading";
import NotFound from "./NotFound";

const SingleResourcePage = ({ resource }) => {
    if (resource === undefined) return <Loading />;
    if (resource === null) return <NotFound />;
    return (
        <div className="min-h-screen">
            <Navbar transparent={false} />
            <ContentContainer>
                <Heading>{resource.title}</Heading>
            </ContentContainer>
        </div>
    );
};

export default SingleResourcePage;
