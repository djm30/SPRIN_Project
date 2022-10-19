import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";
import DropdownBox from "./DropdownBox";
import { newResource } from "../../reducers/resourceReducer";
import { isValid } from "date-fns";

const ResourceForm = ({ open, setOpen }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
    }
  };

  const validateAll = () => {
    const validators = [
      isResourceTitleValid,
      isResourceDescriptionValid,
      isResourceUrlValid,
    ];
    let isValid = true;
    // Settting isValid to false if there is a pdfError
    if (pdfError) isValid = false;
    console.log(isResourceTitleValid());

    // Going through each text field validator function and calling it
    validators.forEach((validtor) => {
      if (isValid) isValid = validtor();
    });

    return isValid;
  };

  const resourceTypes = {
    YOUTUBE: "YOUTUBE",
    WEBSITE: "WEBSITE",
    PAPER: "PAPER",
  };

  const formData = new FormData();

  const [
    resourceTitle,
    resourceTitleReset,
    resourceTitleError,
    isResourceTitleValid,
    resourceTitleInputParams,
  ] = useTextField((resourceTitle) => {
    if (resourceTitle.trim().length < 4) return "Please provide a longer title";
    return "";
  });

  const [resourceType, setResourceType] = useState(resourceTypes.YOUTUBE);

  const [
    resourceDescription,
    resourceDescriptionReset,
    resourceDescriptionError,
    isResourceDescriptionValid,
    resourceDescriptionInputParams,
  ] = useTextField((resourceDescription) => {
    if (resourceDescription.trim().length < 10)
      return "Please provide a longer description";
    return "";
  });

  const [
    resourceUrl,
    resourceUrlReset,
    resourceUrlError,
    isResourceUrlValid,
    resourceUrlInputParams,
  ] = useTextField((url) => {
    if (resourceType === resourceTypes.YOUTUBE) {
      const regex =
        /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
      if (!regex.test(url)) return "Please provide a valid YouTube video link";
    }

    if (resourceType === resourceTypes.WEBSITE) {
      if (url.substring(0, 5) !== "https") {
        return "Please ensure URL begins with https (To ensure the url is from a secure site)";
      }
      const regex =
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      if (!regex.test(url)) return "Please provide a valid URL";
    }

    return "";
  });

  // useEffect to reset url input when resouce type gets changed
  useEffect(resourceUrlReset, [resourceType]);
  const [pdf, setPdf] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const validatePdf = () => {};

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] md:max-h-[768px] h-fit px-3 sm:px-6 py-4 font-body overflow-y-scroll -translate-y-5"
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
            <FileUpload
              label="Upload Research Paper"
              onChange={(e) => {
                setPdf(e.target.files[0]);
              }}
              errorMessage={pdfError}
              fileName={pdf ? pdf.name : ""}
            />
          ) : (
            <TextField
              error={resourceUrlError}
              inputParams={resourceUrlInputParams}
            >
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
