import React from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import SingleResource from "../components/Resources/SingleResource";
import PageNumbers from "../components/UI/PageNumbers";

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section className="w-full">
        <ContentContainer>
          <Heading>Resources</Heading>
        </ContentContainer>
        {/* POST A RESOURCE BUTTON HERE */}
        <div className="mb-10 flex flex-col items-center ">
          <div className="w-full my-5 py-5 flex justify-center">
            <ContentContainer className="grid md:grid-cols-3  gap-8 grid-cols-1  items-center mx-auto">
              <SingleResource />
              <SingleResource />
              <SingleResource />
            </ContentContainer>
          </div>
          <div className="bg-gray-100 w-full my-5 py-5 flex justify-center rounded-tr-[160px]">
            <ContentContainer className="grid md:grid-cols-3  gap-8 grid-cols-1  items-center mx-auto">
              <SingleResource />
              <SingleResource />
              <SingleResource />
            </ContentContainer>
          </div>
          <div className="w-full my-5 py-5 flex justify-center">
            <ContentContainer className="grid md:grid-cols-3  gap-8 grid-cols-1  items-center mx-auto">
              <SingleResource />
              <SingleResource />
              <SingleResource />
            </ContentContainer>
          </div>
        </div>
        {/* GRID CONTAINER FOR RESOURCE CARDS */}
        {/* I WANT 3 rows per page, with the middle being a different color */}
        {/* SINGLE ROW */}
      </section>
      <PageNumbers />
    </div>
  );
};

export default Resources;
