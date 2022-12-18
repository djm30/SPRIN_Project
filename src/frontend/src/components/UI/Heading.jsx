import React from "react";

// Defines a reusable heading
// Takes in children and Button
// Children is the text of the heading
// Button is a component that is rendered to the right of the heading

const Heading = ({ children, Button }) => {
    return (
        <div className="flex justify-between sm:flex-row flex-col items-center mt-10">
            <h1 className="text-3xl md:text-4xl sm:text-left font-body text-darkblue-100 ">
                {children}
            </h1>
            {Button ? <Button /> : ""}
        </div>
    );
};

export default Heading;
