import React, { useState, useEffect } from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import PageNumbers from "../components/UI/PageNumbers";
import ResourceForm from "../components/Resources/ResourceForm";
import ResourceContainer from "../components/Resources/ResourceContainer";
import { useSelector } from "react-redux";
import { useAuthorized } from "../hooks";
import UserRoles from "../services/UserRoles";

const Resources = () => {
    const [openForm, setOpenForm] = useState(false);

    // Retrieving resources from global state
    const resources = useSelector((state) => state.resources);

    // Reading information about how many pages of resources there is
    const [currPage, setCurrPage] = useState(1);
    const numPages = resources.length;

    let currentPageOfResources;
    // Trying to get current page from resources on load, may not be loaded at this stage however
    try {
        currentPageOfResources = resources[currPage - 1];
    } catch (e) {}

    // Refetching current page when resources changes
    useEffect(() => {
        currentPageOfResources = resources[currPage - 1];
    }, [resources]);

    const toggleButton = () => {
        return useAuthorized(UserRoles.ADMIN, UserRoles.USER) ? (
            <button
                className="bg-darkblue-100 text-white hover:bg-skyblue-300 hover:text-white transition-all px-6 py-2 rounded-xl shadow-sm hidden md:block"
                onClick={() => setOpenForm(true)}
            >
                New Resource
            </button>
        ) : (
            ""
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar transparent={false} />
            <ResourceForm open={openForm} setOpen={setOpenForm} />
            <section className="w-full h-full">
                <ContentContainer>
                    <Heading Button={toggleButton}>Resources</Heading>
                    {/* Button to add a post here i suppose */}
                </ContentContainer>
                {/* POST A RESOURCE BUTTON HERE TODO*/}
                <ResourceContainer resources={currentPageOfResources} />

                {/* SINGLE ROW */}
            </section>
            {resources ? (
                <div className="flex justify-center">
                    <PageNumbers
                        numPages={numPages}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Resources;
