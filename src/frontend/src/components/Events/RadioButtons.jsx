import React from "react";

const RadioButtons = () => {
  return (
    <div className="mx-2 mt-2 border-b-[1px] border-border-color pb-4">
      <h5 className="md:text-xl text-neutral-500">Event Location</h5>
      <div
        class="grid  grid-cols-2 max-w space-x-2 rounded-xl bg-gray-200 p-2  sm:p-2 items-center"
        x-data="app"
      >
        <div>
          <input
            type="radio"
            name="option"
            id="1"
            class="peer hidden"
            checked
          />
          <label
            for="1"
            class="block cursor-pointer select-none rounded-lg sm:rounded-xl p-[2px] sm:p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            In Person
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="2" class="peer hidden" />
          <label
            for="2"
            class="block cursor-pointer select-none rounded-lg sm:rounded-xl p-[2px] sm:p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            Online
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioButtons;
