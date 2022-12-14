import React from "react";
import ResourceRow from "./ResourceRow";
import LoadingSpinner from "../UI/LoadingSpinner";

// Grid container for the resources
// Renders 3 rows of resources
// Each row has 3 resources
// If there are less than 9 resources, the remaining rows will be empty
// 3x3 Grid on large screens, 1x1 Grid on small screens
const ResourceContainer = ({ resources }) => {
    // Making sure resources are only rendered if an array is passed
    if (Array.isArray(resources)) {
        if (resources.length == 0) {
            return (
                <div className="flex justify-center my-20">
                    <h3 className="text-3xl text-darkblue-100">
                        No Resources Yet!
                    </h3>
                </div>
            );
        }
        return (
            <div className="mb-10 flex flex-col items-center">
                <ResourceRow resources={resources.slice(0, 3)} />
                <ResourceRow resources={resources.slice(3, 6)} alt={true} />
                <ResourceRow resources={resources.slice(6, 9)} />
            </div>
        );
    } else
        return (
            <div className="flex justify-center items-center min-h-[420px]">
                <LoadingSpinner />
            </div>
        );
};

export default ResourceContainer;
