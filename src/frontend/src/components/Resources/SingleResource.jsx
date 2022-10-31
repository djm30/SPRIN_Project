import React from "react";
import Card from "../UI/Card";
import Clock from "../../assets/Clock.svg";
import { format } from "date-fns";

const SingleResource = ({ resource }) => {
  let { _id, title, description, resourceType, resourceUrl, dateTime } =
    resource;

  // Converting retrieved date into a date object
  dateTime = new Date(dateTime);

  // Converting retrieved resourceType into readable format
  let readbleResourceType;
  // Variable to store header colour depending on the resource type
  let headerColor;

  switch (resourceType) {
    case "website":
      readbleResourceType = "External Website";
      headerColor = "bg-green-gradient";
      break;
    case "pdf":
      readbleResourceType = "Research Paper";
      headerColor = "bg-blue-gradient";
      break;
    case "youtube":
      readbleResourceType = "YouTube Video";
      headerColor = "bg-red-gradient";
      break;
  }

  return (
    <Card className="min-h-[24rem] min-w-[340px] sm:min-w-0 xl:min-w-[340px] max-w-xs flex flex-col cursor-pointer hover:-translate-y-[0.1rem] hover:shadow-lg transition-all">
      {/* CARD HEADING */}
      <div className={`h-20 rounded-t-[0.8rem] ${headerColor}`}></div>
      {/* CARD BODY */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* HEADING AND DESCRIPTION */}
        <div className="space-y-2">
          <h3 className="text-2xl">{title}</h3>
          <p className="text-neutral-700">{description}</p>
        </div>
        {/* TYPE AND DATE */}
        <div className="space-y-2 text-neutral-700">
          <p>Type: {readbleResourceType}</p>
          <div className="flex items-center space-x-2">
            <img src={Clock} alt="Clock icon" />
            <p>{format(dateTime, "dd/MM/yyyy")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleResource;
