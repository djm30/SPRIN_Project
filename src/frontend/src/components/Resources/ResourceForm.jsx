import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";

const ResourceForm = ({ open, setOpen }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const resourceTypes = {
    YOUTUBE: "YOUTUBE",
    WEBSITE: "WEBSITE",
    PAPER: "PAPER",
  };

  const [
    resourceTitle,
    resourceTitleReset,
    resourceTitleError,
    isResourceTitleValid,
    resourceTitleInputParams,
  ] = useTextField(() => {});

  const [
    resourceDescription,
    resourceDescriptionReset,
    resourceDescriptionError,
    isResourceDescriptionValid,
    resourceDescriptionInputParams,
  ] = useTextField(() => {});

  const [
    resourceUrl,
    resourceUrlReset,
    resourceUrlError,
    isResourceUrlValid,
    resourceUrlInputParams,
  ] = useTextField(() => {});

  const [radialValue, setRadialValue] = useState(resourceTypes.YOUTUBE);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] md:max-h-[720px] h-fit px-4 py-4 font-body overflow-y-scroll -translate-y-2"
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
        <TextField
          error={resourceTitleError}
          inputParams={resourceTitleInputParams}
        >
          Resource Title
        </TextField>
        {/* RESOURCE DESCRIPTION */}
        <TextField
          error={resourceDescriptionError}
          inputParams={resourceDescriptionInputParams}
        >
          Resource Description
        </TextField>
        {/* RESOURCE TYPE RADIAL BUTTONS */}
        <div className="flex  flex-col sm:flex-row  justify-center items-center gap-2 sm:gap-5 font-body text-darkblue-100 text-base md:text-lg">
          <label className="flex justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
            <span>Youtube Video</span>
            <input
              type="radio"
              name="type"
              value={resourceTypes.YOUTUBE}
              checked={radialValue === resourceTypes.YOUTUBE}
              onChange={() => setRadialValue(resourceTypes.YOUTUBE)}
            />
          </label>

          <label className="flex justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
            <span>Website Link</span>
            <input
              type="radio"
              name="type"
              value={resourceTypes.WEBSITE}
              checked={radialValue === resourceTypes.WEBSITE}
              onChange={() => setRadialValue(resourceTypes.WEBSITE)}
            />
          </label>

          <label className="flex  justify-between flex-row sm:flex-col cursor-pointer gap-2 text-center">
            <span>Research Paper</span>
            <input
              type="radio"
              name="type"
              value={resourceTypes.PAPER}
              checked={radialValue === resourceTypes.PAPER}
              onChange={() => setRadialValue(resourceTypes.PAPER)}
            />
          </label>
        </div>
        {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
        <div>
          {radialValue === resourceTypes.PAPER ? (
            <FileUpload></FileUpload>
          ) : (
            <TextField>
              {radialValue === resourceTypes.WEBSITE
                ? "Website Url"
                : "Youtube Url"}
            </TextField>
          )}
        </div>
        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-4">
          <button className="bg-darkblue-100 text-white px-4 py-2 rounded-lg hover:bg-skyblue-200 transition-all">
            Add Resource
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResourceForm;
