import React from "react";
import Modal from "./Modal/Modal";

// Defines a confirmation modal
// Used to confirm actions such as deleting a post
// Takes in a function to run on confirmation
// Takes in a boolean to open/close the modal
// Takes in a function to set the open state
const ConfirmationModal = ({ setOpen, open, onConfirm, children }) => {
    return (
        <Modal
            open={open}
            setOpen={setOpen}
            className="mx-4 w-[600px] h-fit px-3 sm:px-6 py-4 overflow-hidden font-body  translate-y-10"
        >
            <h3 className="text-lg text-center mx-2 md:text-2xl text-darkblue-100 font-bold">
                {children}
            </h3>
            <div className="flex justify-center gap-5 mt-3">
                <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded grow"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                >
                    Confirm
                </button>
                <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded grow"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
