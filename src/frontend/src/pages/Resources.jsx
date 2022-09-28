import React from "react";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import SingleResource from "../components/Resources/SingleResource";

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section>
        <ContentContainer>
          <Heading>Resources</Heading>
          {/* POST A RESOURCE BUTTON HERE */}
          <div className="mb-10">
            <div className="grid md:grid-cols-3 mt-10  gap-1 grid-cols-1 justify-center items-center mx-auto">
              <SingleResource />
              <SingleResource />
              <SingleResource />
            </div>
            <div className="grid md:grid-cols-3 mt-10 gap-1 grid-cols-1 justify-center items-center mx-auto">
              <SingleResource />
              <SingleResource />
              <SingleResource />
            </div>
            <div className="grid md:grid-cols-3 mt-10 gap-1 grid-cols-1 justify-center items-center mx-auto">
              <SingleResource />
              <SingleResource />
            </div>
          </div>
          {/* GRID CONTAINER FOR RESOURCE CARDS */}
          {/* I WANT 3 rows per page, with the middle being a different color */}
          {/* SINGLE ROW */}

          {/* PAGE NUMBERS */}
          <div className="mb-10">buttooon</div>
        </ContentContainer>
      </section>
    </div>
  );
};

export default Resources;
