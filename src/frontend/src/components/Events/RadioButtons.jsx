import React from "react";

const RadioButtons = ({ value, setValue, values }) => {
  return (
    <div className="mx-2 mt-2 border-b-[1px] border-border-color pb-4">
      <h5 className="md:text-xl text-neutral-500">Event Location</h5>
      <div
        className="grid  grid-cols-2 max-w space-x-2 rounded-xl bg-gray-100 p-2 mt-2  sm:p-2 items-center"
        x-data="app"
      >
        <div
          onClick={() => {
            setValue(values.PHYSICAL);
          }}
        >
          <input
            type="radio"
            name="option"
            id="1"
            className="peer hidden"
            defaultChecked={value === values.PHYSICAL}
          />
          <label
            htmlFor="1"
            className="block cursor-pointer select-none rounded-lg sm:rounded-xl p-[2px] sm:p-2 text-center peer-checked:bg-darkblue-100 peer-checked:font-bold peer-checked:text-white"
          >
            In Person
          </label>
        </div>

        <div
          onClick={() => {
            setValue(values.ONLINE);
          }}
        >
          <input
            type="radio"
            name="option"
            id="2"
            className="peer hidden"
            defaultChecked={value === values.ONLINE}
          />
          <label
            htmlFor="2"
            className="block cursor-pointer select-none rounded-lg sm:rounded-xl p-[2px] sm:p-2 text-center peer-checked:bg-darkblue-100 peer-checked:font-bold peer-checked:text-white"
          >
            Online
          </label>
        </div>
      </div>
    </div>
  );
};

export default RadioButtons;
