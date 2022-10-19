import React from "react";

const PageButton = ({ children, number, value, setCurrPage }) => {
  const px = number ? "6" : "4";
  return (
    <button
      className={`px-${px} py-4 border-border-color border-[1px] rounded-lg shadow-md hover:-translate-y-[0.1rem] hover:shadow-lg hover:border-skyblue-100 transition-all`}
      onClick={() => {
        setCurrPage(value);
      }}
    >
      {children}
    </button>
  );
};

const PageNumbers = ({ numPages, currPage, setCurrPage }) => {
  let pageNumberButtons = [currPage];
  if (currPage + 1 <= numPages) pageNumberButtons.push(currPage + 1);
  if (currPage - 1 >= 1) pageNumberButtons.push(currPage - 1);
  pageNumberButtons.sort();

  return (
    <div className="mb-10 flex justify-center space-x-2 md:space-x-5 text-darkblue-100">
      {/* HIDING PREV PAGE IF CURR PAGE IS THE FIRST */}
      {currPage !== 1 ? (
        <PageButton value={1} setCurrPage={setCurrPage}>
          Prev
        </PageButton>
      ) : (
        ""
      )}

      {pageNumberButtons.map((number) => (
        <PageButton value={number} setCurrPage={setCurrPage} number={true}>
          {number}
        </PageButton>
      ))}

      {/* HIDING NEXT PAGE IF CURR PAGE IS THE LAST */}
      {currPage === numPages ? (
        ""
      ) : (
        <PageButton value={numPages} setCurrPage={setCurrPage}>
          Next
        </PageButton>
      )}
    </div>
  );
};

export default PageNumbers;
