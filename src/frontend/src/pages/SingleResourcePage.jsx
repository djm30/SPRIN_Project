import React from "react";
import YoutubePage from "../components/Resources/SinglePages/YoutubePage";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import Loading from "./Loading";
import NotFound from "./NotFound";
import WebsitePage from "../components/Resources/SinglePages/WebsitePage";
import PdfPage from "../components/Resources/SinglePages/PdfPage";

// Single resource page
// Displays a single resource on an entire page when the url is /resources/:id
const SingleResourcePage = ({ resource }) => {
    if (resource === undefined) return <Loading />;
    if (resource === null) return <NotFound />;

    let ResourceContainer;
    switch (resource.resourceType) {
        case "website":
            ResourceContainer = <WebsitePage resource={resource} />;
            break;
        case "pdf":
            ResourceContainer = <PdfPage resource={resource} />;
            break;
        case "youtube":
            ResourceContainer = <YoutubePage resource={resource} />;
            break;
    }

    return (
        <div className="min-h-screen">
            <Navbar transparent={false} />
            <ContentContainer>
                <Heading>{resource.title}</Heading>
                {ResourceContainer}
            </ContentContainer>
        </div>
    );
};

export default SingleResourcePage;
