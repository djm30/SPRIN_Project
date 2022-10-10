import React from "react";
import Modal from "../UI/Modal/Modal";

const ResourceForm = ({ open, setOpen }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] md:max-h-[640px] px-4 py-5 font-body"
    >
      <h3 className="text-lg mx-2 md:text-2xl text-darkblue-100 font-bold">
        Add A Resource
      </h3>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="mt-10 md:space-y-3"
      >
        {/* RESOURCE Title */}
        <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
          <label className="md:text-2xl text-darkblue-100">
            Resource Title
          </label>
          <input className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 selection:border-sky-300" />
          {/* ERROR MESSAGE */}
          <span className="min-h-[6px] text-red-500"></span>
        </div>
        {/* RESOURCE DESCRIPTION */}
        <div className="flex flex-col gap-2 mx-2 border-b-[1px] border-border-color pb-4">
          <label className="md:text-2xl text-darkblue-100">
            Resource Description
          </label>
          <input className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 selection:border-sky-300" />
          <span className="min-h-[6px] text-red-500"></span>
        </div>
        {/* RESOURCE TYPE CHECKBOX */}

        {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
        {/* SUBMIT BUTTON */}
        <div className="flex justify-center">
          <button className="bg-darkblue-100 text-white px-4 py-2 rounded-lg hover:bg-skyblue-200 transition-all">
            Add Resource
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResourceForm;
