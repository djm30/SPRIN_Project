import React from "react";

const PageNumbers = () => {
  return (
    <div className="mb-10 flex justify-center space-x-2 md:space-x-5 text-darkblue-100">
      <button className="px-4 py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all">
        Prev
      </button>
      <button className="px-6 py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all">
        1
      </button>
      <button className="px-6 py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all">
        2
      </button>
      <button className="px-6 py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all">
        3
      </button>
      <button className="px-4 py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all">
        Next
      </button>
    </div>
  );
};

export default PageNumbers;
