import React from "react";

// Radio buttons component
// Takes in a value, setValue, info, and children
// Value is the value of the radio button
// SetValue is the function to set the value of the radio button
// Info is an array of objects that contain the label and value of the radio button
// Children is the title of the radio buttons
const RadioButtons = ({ value, setValue, info, children }) => {
    return (
        <div className="mx-2 mt-2 mb-2 border-b-[1px] border-border-color pb-4">
            <h5 className="md:text-xl text-neutral-500">{children}</h5>
            <div
                className="grid  grid-cols-2 max-w space-x-2 rounded-xl bg-gray-100 p-2 mt-2  sm:p-2 items-center"
                x-data="app"
            >
                {info.map((inf, index) => (
                    <div
                        key={Math.random()}
                        onClick={() => {
                            setValue(inf.value);
                        }}
                    >
                        <input
                            type="radio"
                            name="option"
                            id={index}
                            className="peer hidden"
                            defaultChecked={value === inf.value}
                        />
                        <label
                            htmlFor={index}
                            className="block cursor-pointer select-none rounded-lg sm:rounded-xl p-[2px] sm:p-2 text-center peer-checked:bg-darkblue-100 peer-checked:font-bold peer-checked:text-white"
                        >
                            {inf.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioButtons;
