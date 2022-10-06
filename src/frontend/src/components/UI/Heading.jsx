import React from "react";

const Heading = ({ children }) => {
  return (
    <h1 className="text-3xl md:text-4xl text-center sm:text-left font-display text-darkblue-100 mt-10">
      {children}
    </h1>
  );
};

export default Heading;
