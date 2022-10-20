import React from "react";
import SingleEvent from "./SingleEvent";

const EventContainer = ({ events }) => {
  if (Array.isArray(events)) {
    return (
      <div className="flex flex-col min-h-[400px] items-center py-10 space-y-6 md:space-y-10">
        {events.map((event, index) => (
          <SingleEvent event={event} key={event._id} alt={index % 2 !== 0} />
        ))}
      </div>
    );
  }
};

export default EventContainer;
