import React from "react";
import { createPortal } from "react-dom";
import Card from "../Card";

const Modal = ({ open, setOpen, children, className }) => {
  return open
    ? createPortal(
        // BACKGROUND DIV
        <div
          className="w-full h-screen bg-modal  fixed top-0 left-0 z-10 flex justify-center pt-10"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {/* CONTENT DIV */}
          <Card className={`relative my-5 ${className}`}>
            {/* CLOSE BUTTON */}
            <span
              className="absolute top-3 right-3 text-4xl cursor-pointer select-none hover:text-gray-500 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              &#215;
            </span>
            {children}
          </Card>
        </div>,
        document.getElementById("modal"),
      )
    : "";
};

export default Modal;
