import React from "react";

// Container that will responsively handle margins
// Takes in children and className
// Children is the content of the container
// ClassName is to add additional classes to the container
const ContentContainer = ({ children, className }) => {
    return (
        <div
            className={"mx-4 sm:mx-8 lg:mx-20 xl:mx-40 2xl:mx-72 " + className}
        >
            {children}
        </div>
    );
};

export default ContentContainer;
