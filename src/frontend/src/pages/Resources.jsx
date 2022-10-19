import React, { useState } from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import SingleResource from "../components/Resources/SingleResource";
import PageNumbers from "../components/UI/PageNumbers";
import ResourceForm from "../components/Resources/ResourceForm";
import ResourceContainer from "../components/Resources/ResourceContainer";
import { useSelector } from "react-redux";

const Resources = () => {
  const [openForm, setOpenForm] = useState(false);

  // Retrieving resources from global state
  const resources = useSelector((state) => state.resources);
  const [currPage, setCurrPage] = useState(1);
  const numPages = resources.length;

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
        <ResourceContainer resources={resources[currPage - 1]} />

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
