import React from "react";
import { useEffect, useState } from "react";

export default function PopUp() {
    const popupShown = localStorage.getItem("popupShown") === "true";
    useEffect(() => {
        // Only show the popup if it hasn't been shown before
        if (!popupShown) {
            const timer = setTimeout(() => {
                setShowModal(true);
                // Add the value to local storage so the popup is not shown again
                localStorage.setItem("popupShown", "true");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Urgent Help
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        If you require urgent help please speak
                                        to someone today.
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Lifeline: 0808 808 8000
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Samaritans: 116 123
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        data-cy="closeBut"
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
