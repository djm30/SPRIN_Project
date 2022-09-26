import React from "react";

const LowerFooter = () => {
  return (
    <section class="w-full py-2 bg-darkblue-300">
      <div class="flex flex-col text-white text-sm justify-between items-center mx-4 space-y-2 md:space-y-0 md:flex-row">
        <div class="text-gray">
          <a
            class="border-b-2 border-transparent hover:border-white hover:text-white"
            href="#"
          >
            Privacy
          </a>
          <div class="inline-block">|</div>
          <a
            class="border-b-2 border-transparent hover:border-white hover:text-white"
            href="#"
          >
            T&Cs
          </a>
        </div>
        <div>&copy; 2022, All Rights Reserved</div>
      </div>
    </section>
  );
};

export default LowerFooter;
