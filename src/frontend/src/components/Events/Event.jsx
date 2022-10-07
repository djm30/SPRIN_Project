import React from "react";

import Card from "../UI/Card";
import Placeholder from "../../assets/PlaceholderLarge.svg";
import Location from "../../assets/Location.svg";

const ImageSection = ({ left }) => {
  const borderClass = left
    ? "border-b-[1px] md:border-b-0 md:border-r-[1px]"
    : "";
  return (
    <div
      className={`${borderClass} border-border-color md:w-2/5 flex justify-center items-center`}
    >
      <img src={Placeholder} alt="Event Image" className="scale-75" />
    </div>
  );
};

const InfoSection = ({ left }) => {
  const borderClass = left
    ? "border-t-[1px] md:border-t-0 md:border-r-[1px]"
    : "";

  return (
    <div className={`${borderClass} md:w-3/5 p-6 space-y-8 md:space-y-6`}>
      {/* TITLE */}
      <h3 className="text-2xl md:text-3xl">Title</h3>
      {/* DESCRIPTION */}
      <p className="text-base md:text-lg text-neutral-700">
        A brief description of the event taking place, it can be pretty long
        description
      </p>
      {/* LOCATION */}
      <div className="flex justify-between items-center max-w-lg">
        <div className="flex items-center space-x-3">
          {/* SVG */}
          <img src={Location} alt="Location icon" />
          {/* LOCATION */}
          <p className="text-base md:text-lg text-neutral-700">
            The Theatre Center, 128 Station Rd, Chester
          </p>
        </div>

        {/* VIEW BUTTON */}
        <a className="text-darkblue-100 border-border-color border-[1px] rounded-lg px-5 py-2 shadow-sm cursor-pointer hover:bg-sky-50 transition-all">
          View
        </a>
      </div>
      {/* REGISTER BUTTON */}
      <button className="text-white bg-skyblue-200 hover:bg-skyblue-300 rounded-lg px-5 py-2">
        Register
      </button>
    </div>
  );
};

const Event = ({ alt }) => {
  const imageLeft = !alt;
  const infoLeft = alt;

  const responsiveFlexDirection = alt ? "flex-col-reverse" : "flex-col";
  return (
    <Card
      className={`max-w-[800px] flex md:flex-row w-11/12 sm:w-2/3 ${responsiveFlexDirection} md:w-5/6 hover:-translate-y-[0.1rem] hover:shadow-lg transition-all`}
    >
      {!alt ? (
        <>
          <ImageSection left={imageLeft} />
          <InfoSection left={infoLeft} />
        </>
      ) : (
        <>
          {" "}
          <InfoSection left={infoLeft} />
          <ImageSection left={imageLeft} />
        </>
      )}
    </Card>
  );
};

export default Event;
