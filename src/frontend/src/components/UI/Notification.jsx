import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
    const { error, message } = useSelector((state) => state.notification);

    let errorClasses = {
        header: "bg-red-gradient",
        body: "bg-white",
    };

    let successClasses = {
        header: "bg-green-gradient",
        body: "bg-white",
    };

    let classes = error ? errorClasses : successClasses;

    return (
        <div
            className={`message z-50 shadow-lg drop-shadow-md ${
                error ? "error" : "success"
            } fixed top-12 right-12 rounded-md max-w-sm transition-opacity ${
                message ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`text-white ${classes.header} px-6 py-2 rounded-t-md`}
            >
                {error ? "Error!" : "Success"}
            </div>
            <div className={`${classes.body}  px-6 py-5 rounded-b-md`}>
                {message}
            </div>
        </div>
    );
};

export default Notification;
