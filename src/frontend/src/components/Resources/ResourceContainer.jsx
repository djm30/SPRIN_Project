import React from "react";
import ResourceRow from "./ResourceRow";

const ResourceContainer = (resourcePage) => {
  return (
    <div className="mb-10 flex flex-col items-center ">
      <ResourceRow />
      <ResourceRow alt={true} />
      <ResourceRow />
    </div>
  );
};

export default ResourceContainer;
