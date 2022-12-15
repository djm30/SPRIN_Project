import React from "react";
import { dateTimeValidator } from "./EventValidationFunctions";

// Component using the datetime-local input tag
export const DateTimeForm = ({
    value,
    setDateTime,
    setDateTimeError,
    error,
}) => {
    return (
        <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
            <label className="md:text-xl text-neutral-500">Date & Time</label>
            <input
                value={value}
                onChange={(e) => {
                    setDateTime(e.target.value);
                    setDateTimeError(dateTimeValidator(e.target.value));
                }}
                type="datetime-local"
                className="bg-gray-50 sm:px-4 w-full focus:bg-white border-border-color border-[1px] h-8 md:h-12 rounded-lg px-2 py-4 selection:border-sky-300 focus:outline-none focus:border-skyblue-200"
            />
            {/* ERROR MESSAGE */}
            <span className="min-h-[6px] text-sm text-red-500">{error}</span>
        </div>
    );
};
