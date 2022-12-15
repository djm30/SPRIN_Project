import React from "react";

// Reusable card component
// Takes in children, className, blue, useRef, and onClick
// Children is the content of the card
// ClassName is to add additional classes to the card
// Blue is a boolean that determines if the card is blue or white
// UseRef is a reference to the card
// OnClick is a function that is called when the card is clicked
const Card = ({ children, className, blue, useRef, onClick }) => {
    const bg = blue ? "bg-darkblue-100" : "bg-white";
    return (
        <div
            ref={useRef}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
            className={
                `${bg} rounded-2xl border-[1px] border-border-color shadow-lg ` +
                className
            }
        >
            {children}
        </div>
    );
};

export default Card;
