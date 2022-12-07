import React from "react";
import { ReactComponent as Clock } from "../../../assets/ClockWhite.svg";
import { format } from "date-fns";

const YoutubePage = ({ resource }) => {
    console.log(resource);
    // Youtube only allows videos with embed to be played through a
    let embedLink = resource.resourceUrl.replace("watch?v=", "embed/");
    return (
        <div className="flex flex-col mt-4  mb-12 md:mt-16 space-y-5">
            <iframe
                className="aspect-video w-full mb-6"
                src={embedLink}
            ></iframe>
            <div className="mt-6 bg-neutral-50 px-4 py-6 rounded-xl">
                <p className="text-3xl text-neutral-500 mt-2 mb-12">
                    {resource.description}
                </p>
                <div className="flex space-y-2  mt-6 flex-col sm:flex-row sm:justify-between md:text-lg">
                    <div className="flex space-x-4 items-center  bg-darkblue-100 px-4 py-2 rounded-xl text-white">
                        {/* <img src={Clock} /> */}
                        <Clock />
                        <div>
                            {format(
                                new Date(resource.dateTime),
                                "dd-MM-yyyy  hh:mm",
                            )}
                        </div>
                    </div>
                    <div className="bg-darkblue-100 px-4 py-2 rounded-xl text-white">
                        Poster: {resource.poster.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YoutubePage;
