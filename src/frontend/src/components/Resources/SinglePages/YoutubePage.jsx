import React from "react";
import Clock from "../../../assets/Clock.svg";
import { format } from "date-fns";

const YoutubePage = ({ resource }) => {
    console.log(resource);
    // Youtube only allows videos with embed to be played through a
    let embedLink = resource.resourceUrl.replace("watch?v=", "embed/");
    return (
        <div className="flex flex-col mt-4 md:mt-16 space-y-5">
            <iframe className="aspect-video w-full" src={embedLink}></iframe>
            <div className="mt-4 text-3xl text-darkblue-100">
                <p>Description:</p>
                <p className="text-2xl mt-2">{resource.description}</p>
            </div>
            <div className="flex space-y-2 mt-6 flex-col sm:flex-row sm:justify-between md:text-lg">
                <div className="flex space-x-4 items-center">
                    <img src={Clock} />
                    <div>
                        {format(
                            new Date(resource.dateTime),
                            "dd-MM-yyyy  hh:mm",
                        )}
                    </div>
                </div>
                <div>Poster: {resource.poster.name}</div>
            </div>
        </div>
    );
};

export default YoutubePage;
