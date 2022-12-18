import React from "react";
import SingleEvent from "./SingleEvent";
import LoadingSpinner from "../UI/LoadingSpinner";

// Grid container to handle storing and displaying events
// If there are no events, it will display a message
// If the events are still loading, it will display a loading spinner
const EventContainer = ({ events }) => {
    if (Array.isArray(events)) {
        if (events.length == 0) {
            return (
                <div className="flex justify-center my-20">
                    <h3 className="text-3xl text-darkblue-100">
                        No Events Yet!
                    </h3>
                </div>
            );
        }
        return (
            // Mapping through the events and displaying them
            <div className="flex flex-col min-h-[400px] items-center py-10 space-y-6 md:space-y-10">
                {events.map((event, index) => (
                    <SingleEvent
                        event={event}
                        key={event._id}
                        alt={index % 2 !== 0}
                    />
                ))}
            </div>
        );
    } else
        return (
            <div className="flex justify-center items-center min-h-[420px]">
                <LoadingSpinner />
            </div>
        );
};

export default EventContainer;
