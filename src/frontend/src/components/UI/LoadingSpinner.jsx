import React from "react";
import { PulseLoader } from "react-spinners";

// Loading spinner component
// Takes in loading and size
// Loading is a boolean that determines if the spinner is shown or not
// Size is the size of the spinner
const LoadingSpinner = ({ loading, size }) => {
    return (
        <div>
            <PulseLoader
                color="#023E8A"
                loading={loading}
                size={size ? size : 20}
                aria-label="Loading Spinner"
            />
            <p className="text-center text-darkblue-100">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
