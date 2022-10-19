import React from "react";
import ContentContainer from "../UI/ContentContainer";
import SingleResource from "./SingleResource";

const ResourceRow = ({ alt, row }) => {
  const extraClasses = alt ? "bg-gray-100 rounded-tr-[160px]" : "";
  return (
    <div className={`w-full my-5 py-5 flex justify-center ${extraClasses}`}>
      <ContentContainer className="grid md:grid-cols-3  gap-8 grid-cols-1  items-center mx-auto">
        <SingleResource />
        <SingleResource />
        <SingleResource />
      </ContentContainer>
    </div>
  );
};

export default ResourceRow;
