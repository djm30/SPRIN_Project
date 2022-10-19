import React, { useState, useEffect } from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import PageNumbers from "../components/UI/PageNumbers";
import ResourceForm from "../components/Resources/ResourceForm";
import ResourceContainer from "../components/Resources/ResourceContainer";
import { useSelector } from "react-redux";

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
  // Segmenting resources into separate pages, each with 9

  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <ResourceForm open={openForm} setOpen={setOpenForm} />
      <section className="w-full">
        <ContentContainer>
          <Heading>Resources</Heading>
        </ContentContainer>
        {/* POST A RESOURCE BUTTON HERE TODO*/}
        <ResourceContainer resources={currentPageOfResources} />

        {/* SINGLE ROW */}
      </section>
      <PageNumbers
        numPages={numPages}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default Resources;
