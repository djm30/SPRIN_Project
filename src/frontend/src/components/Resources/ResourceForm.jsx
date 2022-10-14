import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";
import DropdownBox from "./DropdownBox";

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

  const [resourceType, setResourceType] = useState(resourceTypes.YOUTUBE);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] md:max-h-[732px] h-fit px-3 sm:px-6 py-4 font-body overflow-y-scroll -translate-y-5"
    >
      <h3 className="text-lg text-center mx-2 md:text-2xl text-darkblue-100 font-bold">
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
        <DropdownBox
          children="Resource Type"
          options={[
            { value: resourceTypes.YOUTUBE, label: "YouTube Video" },
            { value: resourceTypes.WEBSITE, label: "Website Link" },
            { value: resourceTypes.PAPER, label: "Research Paper" },
          ]}
          selectedOption={resourceType}
          setSelectedOption={setResourceType}
        />
        {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
        <div>
          {resourceType === resourceTypes.PAPER ? (
            <FileUpload label="Upload Research Paper" />
          ) : (
            <TextField>
              {resourceType === resourceTypes.WEBSITE
                ? "Website Url"
                : "Youtube Url"}
            </TextField>
          )}
        </div>
        {/* SUBMIT BUTTON */}

        <div className="mx-2">
          <button className="w-full mt-4  bg-darkblue-100 text-white  py-3 rounded-lg hover:bg-skyblue-200 transition-all">
            Add Resource
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResourceForm;
