import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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
