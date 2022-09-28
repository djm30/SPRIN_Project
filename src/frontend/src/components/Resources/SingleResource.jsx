import React from "react";
import Card from "../UI/Card";
import Clock from "../../assets/Clock.svg";

const SingleResource = () => {
  return (
    <Card className="h-96 max-w-xs flex flex-col cursor-pointer hover:-translate-y-[0.1rem] hover:shadow-lg transition-all">
      {/* CARD HEADING */}
      <div className="h-20 rounded-t-[0.8rem] bg-red-400"></div>
      {/* CARD BODY */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* HEADING AND DESCRIPTION */}
        <div className="space-y-2">
          <h3 className="text-2xl">Resource Title</h3>
          <p className="text-neutral-700">
            A brief description of the resource to go here
          </p>
        </div>
        {/* TYPE AND DATE */}
        <div className="space-y-2 text-neutral-700">
          <p>Type: YouTube Video</p>
          <div className="flex items-center space-x-2">
            <img src={Clock} alt="Clock icon" />
            <p>24/08/22</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleResource;
