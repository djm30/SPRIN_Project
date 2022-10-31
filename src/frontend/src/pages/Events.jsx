import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import PageNumbers from "../components/UI/PageNumbers";
import EventForm from "../components/Events/EventForm";
import { useSelector } from "react-redux";
import EventContainer from "../components/Events/EventContainer";

const Events = () => {
  const [openForm, setOpenForm] = useState(true);

  const events = useSelector((state) => state.events);

  // Reading information about how many pages of events there is
  const [currPage, setCurrPage] = useState(1);
  const numPages = events.length;

  let currentPageOfEvents;

  try {
    currentPageOfEvents = events[currPage - 1];
  } catch (e) {}

  // Refetching current page when events changes
  useEffect(() => {
    currentPageOfEvents = events[currPage - 1];
  }, [events]);

  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <EventForm open={openForm} setOpen={setOpenForm} />
      <section>
        <ContentContainer>
          <Heading>Events</Heading>
          {/* EVENTS CONTAINER */}
          <EventContainer events={currentPageOfEvents} />
          <PageNumbers
            numPages={numPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        </ContentContainer>
      </section>
    </div>
  );
};

export default Events;
