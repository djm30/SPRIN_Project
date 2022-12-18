import React from "react";
import Card from "../UI/Card";

// Component for displaying a single statistic
const Stat = ({ number, children }) => {
    return (
        <Card
            className="w-36 h-36 sm:w-52 sm:h-52 text-white text-center p-5"
            blue={true}
        >
            {/* CARD TITLE */}
            <h4 className="text-base sm:text-xl">{children}</h4>
            {/* CARD INFO */}
            <p className="text-3xl sm:text-4xl font-bold mt-5 sm:mt-8">
                {number}
            </p>
        </Card>
    );
};

export default Stat;
