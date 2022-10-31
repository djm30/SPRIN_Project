import React from "react";
import ResourceRow from "./ResourceRow";

const ResourceContainer = ({ resources }) => {
  // Making sure resources are only rendered if an array is passed
  if (Array.isArray(resources)) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <ResourceRow resources={resources.slice(0, 3)} />
        <ResourceRow resources={resources.slice(3, 6)} alt={true} />
        <ResourceRow resources={resources.slice(6, 9)} />
      </div>
    );
  }
};

export default ResourceContainer;
