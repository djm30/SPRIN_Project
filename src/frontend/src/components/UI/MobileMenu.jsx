import React from "react";

const MobileMenu = () => {
  return (
    <div class="open md:hidden z-10 transition-all">
      <div
        id="menu"
        class="text-center z-10 absolute hidden flex-col items-center self-end py-8 mt-10 space-y-1 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
      >
        <a
          class="hover:bg-slate-50 w-full p-4 text-skyBlue hover:text-darkBlue"
          href="./events.html"
        >
          Home
        </a>
        <a
          class="hover:bg-slate-50 w-full p-4 text-skyBlue hover:text-darkBlue"
          href="./prevention.html"
        >
          Prevention
        </a>
        <a
          class="hover:bg-slate-50 w-full p-4 text-skyBlue hover:text-darkBlue"
          href="./resources.html"
        >
          Resources
        </a>
        <a
          class="hover:bg-slate-50 w-full p-4 text-skyBlue hover:text-darkBlue"
          href="./events.html"
        >
          Events
        </a>
        <a
          class="hover:bg-slate-50 w-full p-4 text-skyBlue hover:text-darkBlue"
          href="./admin.html"
        >
          Admin
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
