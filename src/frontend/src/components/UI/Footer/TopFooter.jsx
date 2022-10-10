import React from "react";

const TopFooter = () => {
  return (
    <>
      {/* <!-- ABOVE FOOTER --> */}
      <section className="bg-darkblue-100 w-full h-16 flex items-center relative">
        <div className="absolute left-20 sm:left-56 overflow-hidden h-16">
          <div className="-translate-y-8 opacity-30 w-32 h-32 rounded-full bg-skyblue-100"></div>
        </div>

        <div className="w-full text-sm pr-2 text-white pt-2 flex justify-end items-center space-x-5 md:text-base md:container md:pr-0">
          <p>Join the network to stay up to date!</p>
          <div className="cursor-pointer border-2 border-white px-4 py-2 transition-all rounded-lg hover:bg-white hover:text-darkblue-100 font-bold lg:text-base">
            Register
          </div>
        </div>
      </section>
    </>
  );
};

export default TopFooter;
