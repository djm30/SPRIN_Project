import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// Component for the dropdown box
// Takes in the selected option, the options, and the function to set the selected option
// Selected option is the selected option
// Options is an array of objects that contain the label and value of the dropdown box
// SetSelectedOption is the function to set the selected option
// Children is the title of the dropdown box
const DropdownBox = ({
    selectedOption,
    setSelectedOption,
    options,
    children,
}) => {
    const onChange = (e) => {
        setSelectedOption(e.value);
    };

    return (
        <div className="mx-2 mt-2 border-b-[1px] border-border-color pb-4">
            <h5 className="md:text-xl text-neutral-500">{children}</h5>
            <div className="flex">
                <div className="bg-darkblue-100 text-white text-sm sm:text-lg w-2/6 mt-2 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                    Select
                </div>
                <Dropdown
                    onChange={onChange}
                    options={options}
                    value={selectedOption}
                    className="mt-2 font-body sm:text-lg w-4/6 cursor-pointer"
                    controlClassName="rounded-tr-lg border-border-color bg-gray-50 focus:bg-white cursor-pointer"
                    menuClassName="rounded-b-lg"
                    placeholder="Resource Type"
                />
            </div>
        </div>
    );
};

export default DropdownBox;
