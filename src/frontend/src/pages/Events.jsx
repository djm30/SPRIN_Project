import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import PageNumbers from "../components/UI/PageNumbers";
import Card from "../components/UI/Card";
import Placeholder from "../assets/PlaceholderLarge.svg";
import Location from "../assets/Location.svg";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section>
        <ContentContainer>
          <Heading>Events</Heading>
          {/* EVENTS CONTAINER */}
          <div className="flex flex-col min-h-[400px] items-center py-10 sm:space-y-6">
            {/* SINGLE EVENT */}
            <Card className="flex md:flex-row sm:w-1/2 md:w-4/6 xl:w-3/5 h-64">
              {/* LEFT SECTION */}
              <div className="border-r-[1px] border-border-color md:w-2/5 flex justify-center items-center">
                <img src={Placeholder} alt="Event Image" className="scale-75" />
              </div>
              {/* RIGHT SECTION */}
              <div className="md:w-3/5 p-4 space-y-4">
                {/* TITLE */}
                <h3 className="text-3xl">Title</h3>
                {/* DESCRIPTION */}
                <p className="text-neutral-700">
                  A brief description of the event taking place, it can be
                  pretty long description
                </p>
                {/* LOCATION */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {/* SVG */}
                    <img src={Location} alt="Location icon" />
                    {/* LOCATION */}
                    <p className="text-neutral-700">
                      The Theatre Center, 128 Station Rd, Chester
                    </p>
                  </div>

                  {/* VIEW BUTTON */}
                  <a className="text-darkblue-100 border-border-color border-[1px] rounded-lg px-5 py-2 shadow-sm">
                    View
                  </a>
                </div>
                {/* REGISTER BUTTON */}
                <button className="text-white bg-skyblue-200 rounded-lg px-5 py-2">
                  Register
                </button>
              </div>
            </Card>
            {/* SINGLE EVENT */}
            <Card className="flex w-3/5 h-64">
              {/* LEFT SECTION */}
              <div className="border-r-[1px] border-border-color w-3/5"></div>
              {/* RIGHT SECTION */}
              <div className="w-2/5"></div>
            </Card>
            <Card className="w-3/5 h-64"></Card>
          </div>
          <PageNumbers />
        </ContentContainer>
      </section>
    </div>
  );
};

export default Events;
