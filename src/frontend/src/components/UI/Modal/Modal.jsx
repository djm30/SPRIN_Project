import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Card from "../Card";

// Modal component
// Takes in open, setOpen, children, and className
// Open is a boolean that determines if the modal is open or closed
// SetOpen is a function that sets the open state
// Children is the content of the modal
// ClassName is to add additional classes to the modal
const Modal = ({ open, setOpen, children, className }) => {
    const backgroundRef = useRef(null);
    const modalRef = useRef(null);

    const [height, setHeight] = useState(window.document.body.offsetHeight);

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

    useEffect(() => {
        if (modalRef.current) {
            setHeight(
                Math.max(
                    window.document.body.offsetHeight,
                    modalRef.current.offsetHeight + 55,
                ),
            );
        }
    }, [open]);

    return open
        ? createPortal(
              // BACKGROUND DIV
              <div
                  ref={backgroundRef}
                  className={`w-full modal bg-modal absolute top-0 left-0 z-10 flex justify-center pt-10 `}
                  onMouseDown={mouseDown}
                  onMouseUp={mouseUp}
                  style={{ height: height }}
              >
                  {/* CONTENT DIV */}
                  <Card
                      className={`relative my-5 ${className}`}
                      useRef={modalRef}
                  >
                      {/* CLOSE BUTTON */}
                      <span
                          className=" top-3 right-3 text-4xl cursor-pointer select-none hover:text-gray-500 transition-all"
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
