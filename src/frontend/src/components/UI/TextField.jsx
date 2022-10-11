import React from "react";

const TextField = ({ children, error, inputParams }) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
        <label className="md:text-2xl text-darkblue-100">{children}</label>
        <input
          {...inputParams}
          className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 selection:border-sky-300 focus:outline-none focus:border-skyblue-200"
        />
        {/* ERROR MESSAGE */}
        <span className="min-h-[6px] text-red-500">{error}</span>
      </div>
    </div>
  );
};

export default TextField;
