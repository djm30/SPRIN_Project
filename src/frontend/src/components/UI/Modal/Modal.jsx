import React, { useRef } from "react";
import { createPortal } from "react-dom";
import Card from "../Card";

/**
 *
 * @param {*} param0
 * @returns
 */
const Modal = ({ open, setOpen, children, className }) => {
  const backgroundRef = useRef(null);
  const modalRef = useRef(null);

  // Stores value of mouseDown position
  let clickTarget;

  // Gets the position of the curser when it is initially clicked
  const mouseDown = (e) => {
    clickTarget = e.target;
  };

  //Will close the modal only if the original mouseDown event was targeted at the modal background
  const mouseUp = (e) => {
    // Checks that both the mouse click origin and destination came areg from the modal background
    if (
      clickTarget === backgroundRef.current &&
      e.target === backgroundRef.current
    ) {
      setOpen(!open);
    }
  };

  const bodyHeight = window.document.body.offsetHeight + "px";

  return open
    ? createPortal(
        // BACKGROUND DIV
        <div
          ref={backgroundRef}
          className={`w-full modal bg-modal absolute top-0 left-0 z-10 flex justify-center pt-10`}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          style={{ height: bodyHeight }}
        >
          {/* CONTENT DIV */}
          <Card className={`relative my-5 ${className}`} useRef={modalRef}>
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
