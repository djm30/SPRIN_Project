import React from "react";

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
