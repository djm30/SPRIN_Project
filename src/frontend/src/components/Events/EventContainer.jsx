import React from "react";
import SingleEvent from "./SingleEvent";

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
    }
};

export default EventContainer;
