import React, { useState, useEffect, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";
import DropdownBox from "./DropdownBox";
import { newResource, updateResource } from "../../reducers/resourceReducer";
import { setNotification } from "../../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { resourceTypes } from "./ResourceTypes";

import {
    resourceTileValidator,
    resourceDescriptionValidator,
    resourceUrlValidator,
} from "./ResourceValidationFunctuions";
import { useNavigate } from "react-router-dom";

// Form for creating or editing a resource
// If edit is true, the form will be pre-filled with the resource data and used to edit the resource
const ResourceForm = ({ open, setOpen, resource, edit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [resourceType, setResourceType] = useState(
        resource ? resource.resourceType : resourceTypes.YOUTUBE,
    );
    const resourceTypeRef = useRef(resourceType);

    // Resource Title textfield
    const [
        resourceTitle,
        resourceTitleReset,
        resourceTitleError,
        isResourceTitleValid,
        resourceTitleInputParams,
    ] = useTextField(resourceTileValidator);

    //
    const [
        resourceDescription,
        resourceDescriptionReset,
        resourceDescriptionError,
        isResourceDescriptionValid,
        resourceDescriptionInputParams,
    ] = useTextField(resourceDescriptionValidator);

    const [
        resourceUrl,
        resourceUrlReset,
        resourceUrlError,
        isResourceUrlValid,
        resourceUrlInputParams,
    ] = useTextField(resourceUrlValidator(resourceType, resourceTypes));

    // useEffect to reset url input when resouce type gets changed
    const [pdf, setPdf] = useState(null);
    const [pdfError, setPdfError] = useState("");

    // Validating the uploaded file is a pdf
    const validatePdf = () => {
        // If this is a new resource and there is no valid pdf, then error
        // If this is an edit and the original resource was not a pdf, then error
        if (
            (!edit && !pdf) ||
            (edit && !pdf && resourceTypeRef.current !== resourceTypes.PAPER)
        ) {
            setPdfError("Please upload a pdf file");
            return "Please upload a pdf file";
        } else if (pdf && pdf.type !== "application/pdf") {
            setPdfError("Please upload a pdf file");
            return "Please upload a pdf file";
        }
        setPdfError("");
        return "";
    };

    // Validating PDF every time it changes
    useEffect(() => {
        validatePdf();
    }, [pdf]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateAll()) {
            dispatch(
                setNotification("Please fill in all fields correctly", true),
            );
        } else {
            resetAll();
            dispatch(setNotification("Updating resource!"));
            let formData = new FormData();
            formData.append("title", resourceTitle);
            formData.append("description", resourceDescription);
            formData.append("resourceType", resourceType);
            if (resourceType !== resourceTypes.PAPER) {
                formData.append("resourceUrl", resourceUrl);
            } else {
                if (pdf) formData.append("file", pdf);
            }
            edit
                ? dispatch(updateResource(resource._id, formData))
                : dispatch(newResource(formData));
            setOpen(false);
            navigate("/resources");
        }
    };

    const validateAll = () => {
        const validators = [isResourceTitleValid, isResourceDescriptionValid];

        // Assuming initial validation state is true, will be set to false if any field is invalid
        let isValid = true;

        // Settting isValid to false if there is a pdfError and it is in research paper mode
        if (resourceType === resourceTypes.PAPER && pdfError) isValid = false;

        // setting isValid to false if there is a url error and it is in website or youtube mode
        if (resourceType !== resourceTypes.PAPER && !isResourceUrlValid())
            isValid = false;

        // Going through each text field validator function and calling it
        validators.forEach((validator) => {
            const isFieldValid = validator();
            // Only updating value of isValid if it is currently true
            if (isValid) isValid = isFieldValid;
        });

        return isValid;
    };

    const resetAll = () => {
        setPdf(undefined);
        setPdfError("");
        resourceTitleReset();
        resourceDescriptionReset();
        resourceUrlReset();
    };

    useEffect(resourceUrlReset, [resourceType]);

    useEffect(() => {
        if (resource) {
            setResourceType(resource.resourceType);
            resourceTitleReset(resource.title);
            resourceDescriptionReset(resource.description);
            resourceUrlReset(resource.resourceUrl);
        } else {
            resetAll();
        }
    }, [resource]);

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            className="mx-4 w-[600px]  h-fit px-3 sm:px-6 py-4 font-body  -translate-y-5"
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
                    options={[
                        {
                            value: resourceTypes.YOUTUBE,
                            label: "YouTube Video",
                        },
                        { value: resourceTypes.WEBSITE, label: "Website Link" },
                        { value: resourceTypes.PAPER, label: "Research Paper" },
                    ]}
                    selectedOption={resourceType}
                    setSelectedOption={setResourceType}
                >
                    Resource Type
                </DropdownBox>

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
                        {edit ? "Update Resource" : "Add Resource"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ResourceForm;
