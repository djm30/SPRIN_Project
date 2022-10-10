import React from "react";

const Card = ({ children, className, blue }) => {
  const bg = blue ? "bg-darkblue-100" : "bg-white";
  return (
    <div
      onClick={(e) => e.stopPropagation()}
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
