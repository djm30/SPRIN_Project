import React from "react";

// Text field designed to be used with the UseTextField hook
// Takes in children, error and inputParams
// Children is the label of the text field
// Error is the error message of the text field
// InputParams is the parameters of the input element
const TextField = ({ children, error, inputParams }) => {
    return (
        <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
            <label className="md:text-xl text-neutral-500">{children}</label>
            <input
                {...inputParams}
                className="bg-gray-50 sm:px-4 focus:bg-white border-border-color border-[1px] h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
            />
            {/* ERROR MESSAGE */}
            <span className="min-h-[6px] text-sm text-red-500">{error}</span>
        </div>
    );
};

export default TextField;
