import React from "react";

// Defines the lower footer element
const LowerFooter = () => {
    return (
        <section className="w-full py-2 bg-darkblue-300">
            <div className="flex flex-col text-white text-sm justify-between items-center mx-4 space-y-2 md:space-y-0 md:flex-row">
                <div className="text-gray">
                    <a
                        className="border-b-2 border-transparent hover:border-white hover:text-white"
                        href="#"
                    >
                        Privacy
                    </a>
                    <div className="inline-block">|</div>
                    <a
                        className="border-b-2 border-transparent hover:border-white hover:text-white"
                        href="#"
                    >
                        T&Cs
                    </a>
                </div>
                <div>&copy; 2022, All Rights Reserved</div>
            </div>
        </section>
    );
};

export default LowerFooter;
