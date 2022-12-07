import React from "react";

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
