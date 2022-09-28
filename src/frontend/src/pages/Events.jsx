import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section>
        <ContentContainer>
          <Heading>Events</Heading>
        </ContentContainer>
      </section>
    </div>
  );
};

export default Events;
