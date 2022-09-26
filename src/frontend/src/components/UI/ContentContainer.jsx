import React from "react";

// Container that will responsively handle margins
const ContentContainer = ({ children, className }) => {
  return (
    <div className={"mx-4 sm:mx-10 lg:mx-20 xl:mx-40 " + className}>
      {children}
    </div>
  );
};

export default ContentContainer;
