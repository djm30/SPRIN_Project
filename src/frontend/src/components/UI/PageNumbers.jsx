import React from "react";

const PageButton = ({
    children,
    number,
    value,
    setCurrPage,
    isCurrPage,
    hide,
}) => {
    const opacity = hide ? "opacity-0" : "";
    const bgColor = isCurrPage ? "bg-darkblue-100 text-white" : "";
    const px = number ? "6" : "4";
    return (
        <button
            className={`px-${px} ${bgColor} ${opacity} py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] select-none hover:shadow-lg hover:border-skyblue-100 transition-all`}
            onClick={() => {
                setCurrPage(value);
            }}
        >
            {children}
        </button>
    );
};

// Page numbers component
// Takes in numPages, currPage, and setCurrPage
// NumPages is the total number of pages
// CurrPage is the current page
// SetCurrPage is a function that sets the current page
const PageNumbers = ({ numPages, currPage, setCurrPage }) => {
    let pageNumberButtons = [currPage];

    // Determine which page numbers to show

    if (currPage + 1 <= numPages) pageNumberButtons.push(currPage + 1);
    if (currPage - 1 >= 1) pageNumberButtons.push(currPage - 1);
    if (pageNumberButtons.length === 2) {
        if (currPage + 2 <= numPages) pageNumberButtons.push(currPage + 2);
        else if (currPage - 2 >= 1) pageNumberButtons.push(currPage - 2);
    }

    pageNumberButtons.sort((a, b) => a - b);

    return (
        <div className="mb-10 flex justify-center space-x-2 md:space-x-5 text-darkblue-100">
            {/* HIDING PREV PAGE IF CURR PAGE IS THE FIRST */}

            <PageButton
                value={1}
                setCurrPage={setCurrPage}
                hide={currPage === 1}
                key="first"
            >
                First
            </PageButton>

            {pageNumberButtons.map((number) => (
                <PageButton
                    value={number}
                    setCurrPage={setCurrPage}
                    number={true}
                    isCurrPage={currPage === number}
                    key={number}
                >
                    {number}
                </PageButton>
            ))}

            {/* HIDING NEXT PAGE IF CURR PAGE IS THE LAST */}

            <PageButton
                value={numPages}
                setCurrPage={setCurrPage}
                hide={currPage === numPages}
                key="last"
            >
                Last
            </PageButton>
        </div>
    );
};

export default PageNumbers;
