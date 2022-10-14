import React, { useState } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import PageNumbers from "../components/UI/PageNumbers";
import Event from "../components/Events/Event";
import EventForm from "../components/Events/EventForm";

const Events = () => {
  const [openForm, setOpenForm] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <EventForm open={openForm} setOpen={setOpenForm} />
      <section>
        <ContentContainer>
          <Heading>Events</Heading>
          {/* EVENTS CONTAINER */}
          <div className="flex flex-col min-h-[400px] items-center py-10 space-y-6 md:space-y-10">
            <Event />
            <Event alt={true} />
            <Event />
            <Event alt={true} />
          </div>
          <PageNumbers />
        </ContentContainer>
      </section>
    </div>
  );
};

export default Events;
