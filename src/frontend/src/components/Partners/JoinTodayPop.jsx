import React from "react";
// This component is a modal that is displayed when the "Join Today" button is clicked
export default function JoinPopUp() {
    // The `showModal` state variable is used to track whether the modal is open or closed
    const [showModal, setShowModal] = React.useState(false);
    // The modal is rendered using JSX fragments
    return (
        <>
            {/* <a
                data-cy="joinBut"
                className="z-20 bg-skyblue-200 md:text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Join Today
            </a> */}

            <a
                data-cy="joinBut"
                onClick={() => setShowModal(true)}
                className="z-20 bg-skyblue-200 md:text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none cursor-pointer"
            >
                Join Today
            </a>
            {/* If `showModal` is `true`, the modal is rendered */}
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        We appreciate all of our contributors
                                        and welcome any questions or queries you
                                        may have!
                                    </p>
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        If you are interested in becoming our
                                        next partner please contact
                                        k.galway@qub.ac.uk.
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        data-cy="joinClose"
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
