import React from "react";
import Card from "../UI/Card";
import Location from "../../assets/Location.svg";
import Meeting from "../../assets/Meeting.svg";
import Clock from "../../assets/ClockBlack.svg";
import Calendar from "../../assets/Calendar.svg";
import { eventTypes } from "./EventTypes";
import { useNavigate } from "react-router-dom";
import gradient from "random-gradient";
import { format } from "date-fns";

const ImageSection = ({ left, img, title }) => {
    const borderClass = left
        ? "rounded-t-xl sm:rounded-r-none sm:rounded-bl-xl border-b-[1px] md:border-b-0 md:border-r-[1px]"
        : "rounded-t-xl sm:rounded-l-none sm:rounded-br-xl";

    const bg = img ? "bg-transparent" : gradient(title ? title : "Event");

    return (
        <div
            style={{ background: bg }}
            className={`${borderClass} border-border-color md:w-2/5 sm:min-h-0 min-h-[100px] rounded-b-none ounded-l-lg justify-center items-center flex max-h-[500px]`}
        >
            {img && (
                <img
                    src={img}
                    alt="Event Image"
                    className={`${
                        left
                            ? "rounded-t-xl sm:rounded-r-none sm:rounded-bl-xl"
                            : "rounded-t-xl sm:rounded-l-none sm:rounded-br-xl"
                    } object-contain w-full`}
                />
            )}
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
    isAuthorized,
    setOpen,
    setConfirmOpen,
    dateTime,
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
            className={`${borderClass} md:w-3/5 p-6 space-y-8 md:space-y-6 flex flex-col justify-between relative`}
        >
            {isAuthorized && (
                <div className="flex absolute  sm:top-5 sm:right-5 bottom-9 right-5 z-1">
                    <div
                        title="Edit User"
                        onClick={() => setOpen(true)}
                        className="w-4 mr-2 transform hover:text-skyblue-200 hover:scale-110 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </div>
                    <div
                        title="Delete User"
                        onClick={() => setConfirmOpen(true)}
                        className="w-4 mr-2 transform hover:text-red-400 hover:scale-110 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>
                </div>
            )}
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
                    {location === "physical" && (
                        <button
                            className="text-darkblue-100 border-border-color border-[1px] rounded-lg px-5 py-2 shadow-sm cursor-pointer hover:bg-sky-50 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`,
                                    "_blank",
                                );
                            }}
                        >
                            View
                        </button>
                    )}
                </div>
                {/* DATE AND TIME */}
                <div className="flex flex-row space-x-3">
                    {/* DATE */}
                    <div className="flex flex-row items-center space-x-2">
                        <img src={Calendar} alt="Calendar Icon" />
                        <p>
                            {/* 24/01/20 */}
                            {format(new Date(dateTime), "dd/MM/yy")}
                        </p>
                    </div>
                    {/* TIME */}
                    <div className="flex flex-row items-center space-x-2">
                        <img src={Clock} alt="Clock Icon" className="w-5 h-5" />
                        <p>{format(new Date(dateTime), "h:mm a")}</p>
                    </div>
                </div>
                {/* REGISTER BUTTON */}
                <div>
                    <button
                        className="text-white bg-skyblue-200 hover:bg-skyblue-300 rounded-lg px-5 py-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(eventbriteUrl, "_blank");
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

const SingleEvent = ({ alt, event, isAuthorized, setOpen, setConfirmOpen }) => {
    const imageLeft = !alt;
    const infoLeft = alt;

    console.log(event);

    const navigate = useNavigate();

    const {
        title,
        description,
        eventbriteUrl,
        location,
        address,
        imgUrl,
        dateTime,
    } = event;

    const onCardClick = () => {
        navigate(`/events/${event._id}`);
    };

    const responsiveFlexDirection = alt ? "flex-col-reverse" : "flex-col";
    return (
        <Card
            onClick={onCardClick}
            className={`max-w-[800px] min-h-[300px] sm:max-h-[500px] flex sm:flex-row w-11/12 sm:w-2/3 ${responsiveFlexDirection} md:w-5/6 hover:-translate-y-[0.1rem] hover:shadow-lg transition-all cursor-pointer`}
        >
            {!alt ? (
                <>
                    <ImageSection left={imageLeft} img={imgUrl} title={title} />
                    <InfoSection
                        left={infoLeft}
                        title={title}
                        description={description}
                        eventbriteUrl={eventbriteUrl}
                        location={location}
                        address={address}
                        isAuthorized={isAuthorized}
                        setOpen={setOpen}
                        setConfirmOpen={setConfirmOpen}
                        dateTime={dateTime}
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
                        isAuthorized={isAuthorized}
                        setOpen={setOpen}
                        setConfirmOpen={setConfirmOpen}
                        dateTime={dateTime}
                    />
                    <ImageSection left={imageLeft} img={imgUrl} title={title} />
                </>
            )}
        </Card>
    );
};

export default SingleEvent;
