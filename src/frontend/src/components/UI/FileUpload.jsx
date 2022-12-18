import React from "react";

// Defines a reusable file upload component
// Takes in a label, onChange, clearValue, and errorMessage
// clearValue is a function that clears the file input
// onChange is a function that handles the file input change
// errorMessage is a string that displays an error message
// label is a string that displays a label
const FileUpload = ({
    clearValue,
    onChange,
    errorMessage,
    fileName,
    label,
}) => {
    let showFileSelected = () => {};
    return (
        <div className="border-b-[1px] border-border-color pb-4">
            <p className="block text-neutral-500 md:text-xl mx-2 mb-2">
                {label}
            </p>
            <div className="flex items-center justify-center bg-grey-lighter">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer hover:bg-darkblue-100 hover:text-white">
                    <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                        Select a file
                    </span>
                    <input type="file" onChange={onChange} className="hidden" />
                </label>
            </div>

            <div className="flex items-center justify-center flex-col">
                <p
                    className={`text-gray-500 mt-1 text-center ${showFileSelected}`}
                >
                    Selected File: {fileName}
                </p>

                {clearValue && (
                    <button
                        className="bg-skyblue-200 text-sm text-white hover:bg-skyblue-300 mt-2 hover:text-white transition-all px-8 py-1 rounded-xl shadow-sm hidden md:block"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            clearValue();
                        }}
                    >
                        Clear File
                    </button>
                )}
            </div>
            <p className="text-red-500  text-center text-sm mt-2">
                {errorMessage}
            </p>
        </div>
    );
};

export default FileUpload;
