import React from "react";

import Card from "../UI/Card";

import { format } from "date-fns";

import Placeholder from "../../assets/PlaceholderLarge.svg";
import Location from "../../assets/Location.svg";
import Meeting from "../../assets/Meeting.svg";
import Clock from "../../assets/Clock.svg";
import Calendar from "../../assets/Calendar.svg";
import { eventTypes } from "./EventTypes";

const ImageSection = ({ left, img }) => {
    const borderClass = left
        ? "border-b-[1px] md:border-b-0 md:border-r-[1px]"
        : "";
    return (
        <div
            className={`${borderClass} border-border-color md:w-2/5  rounded-l-lg justify-center items-center flex max-h-[500px]`}
        >
            <img
                src={img ? img : Placeholder}
                alt="Event Image"
                className="rounded-t-xl sm:rounded-r-none sm:rounded-bl-xl object-contain w-full"
            />
        </div>
    );
};

const InfoSection = ({
    left,
    title,
    description,
    eventbriteUrl,
    location,
    address,
    imgUrl,
}) => {
    const borderClass = left
        ? "border-t-[1px] md:border-t-0 md:border-r-[1px]"
        : "";

    let formattedAddress;
    if (location === eventTypes.PHYSICAL) {
        const deserialzedAddress = JSON.parse(address);
        formattedAddress = `${deserialzedAddress.addressLineOne}, ${
            deserialzedAddress.addressLineTwo
        } ${deserialzedAddress.addressLineTwo ? "," : ""} ${
            deserialzedAddress.postCode
        }, ${deserialzedAddress.townCity}`;
    }

    return (
        <div
            className={`${borderClass} md:w-3/5 p-6 space-y-8 md:space-y-6 flex flex-col justify-between`}
        >
            <div className="space-y-6">
                {/* TITLE */}
                <h3 className="text-2xl md:text-3xl">{title}</h3>
                {/* DESCRIPTION */}
                <p className="text-base md:text-lg text-neutral-700">
                    {description}
                </p>
            </div>

            <div className="space-y-6">
                {/* LOCATION */}
                <div className="flex justify-between items-center max-w-lg">
                    <div className="flex items-center space-x-3">
                        {/* SVG */}
                        <img
                            src={location === "online" ? Meeting : Location}
                            alt="Location icon"
                        />
                        {/* LOCATION */}
                        <p className="text-base max-w-[360px] md:text-lg text-neutral-700 h-fit">
                            {location === "online"
                                ? "Online"
                                : formattedAddress}
                        </p>
                    </div>

                    {/* TODO */}
                    {/* VIEW BUTTON */}
                    <button
                        className="text-darkblue-100 border-border-color border-[1px] rounded-lg px-5 py-2 shadow-sm cursor-pointer hover:bg-sky-50 transition-all"
                        onClick={() => {}}
                    >
                        View
                    </button>
                </div>
                {/* DATE AND TIME */}
                <div className="flex flex-row space-x-3">
                    {/* DATE */}
                    <div className="flex flex-row items-center space-x-2">
                        <img src={Calendar} alt="Calendar Icon" />
                        <p>24/01/20</p>
                    </div>
                    {/* TIME */}
                    <div className="flex flex-row items-center space-x-2">
                        <img src={Clock} alt="Clock Icon" className="w-5 h-5" />
                        <p>15:00</p>
                    </div>
                </div>
                {/* REGISTER BUTTON */}
                <div>
                    <button
                        className="text-white bg-skyblue-200 hover:bg-skyblue-300 rounded-lg px-5 py-2"
                        onClick={() => {
                            alert("REDIRECT TO EVENTBRITE");
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

const SingleEvent = ({ alt, event }) => {
    const imageLeft = !alt;
    const infoLeft = alt;

    const {
        _id,
        title,
        description,
        eventbriteUrl,
        location,
        address,
        imgUrl,
    } = event;

    const responsiveFlexDirection = alt ? "flex-col-reverse" : "flex-col";
    return (
        <Card
            className={`max-w-[800px] min-h-[300px] sm:max-h-[500px] flex md:flex-row w-11/12 sm:w-2/3 ${responsiveFlexDirection} md:w-5/6 hover:-translate-y-[0.1rem] hover:shadow-lg transition-all`}
        >
            {!alt ? (
                <>
                    <ImageSection left={imageLeft} img={imgUrl} />
                    <InfoSection
                        left={infoLeft}
                        title={title}
                        description={description}
                        eventbriteUrl={eventbriteUrl}
                        location={location}
                        address={address}
                    />
                </>
            ) : (
                <>
                    <InfoSection
                        left={infoLeft}
                        title={title}
                        description={description}
                        eventbriteUrl={eventbriteUrl}
                        location={location}
                        address={address}
                    />
                    <ImageSection left={imageLeft} img={imgUrl} />
                </>
            )}
        </Card>
    );
};

export default SingleEvent;
