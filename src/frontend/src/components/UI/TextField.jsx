import React from "react";

const TextField = ({ children, error, inputParams }) => {
  return (
    <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
      <label className="md:text-xl text-neutral-500">{children}</label>
      <input
        {...inputParams}
        className="bg-gray-50 sm:px-4 focus:bg-white border-border-color border-[1px] h-8 md:h-12 rounded-lg px-2 py-4 selection:border-sky-300 focus:outline-none focus:border-skyblue-200"
      />
      {/* ERROR MESSAGE */}
      <span className="min-h-[6px] text-red-500">{error}</span>
    </div>
  );
};

export default TextField;
