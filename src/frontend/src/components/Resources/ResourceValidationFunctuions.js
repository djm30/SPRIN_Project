import { resourceTypes } from "./ResourceTypes";

// All validation functions for the resource form are defined here
// Each function takes in the value of the input and returns an error message if the input is invalid
// If the input is valid, the function returns an empty string
// The error message is then displayed to the user
// All constraints defined in the backend are matched here

export const resourceTileValidator = (title) => {
    if (title.trim().length === 0) return "Please provide a title";
    if (title.trim().length < 4) return "Please provide a longer title";
    return "";
};

export const resourceDescriptionValidator = (description) => {
    if (description.trim().length < 10)
        return "Please provide a longer description";
    return "";
};

export const resourceUrlValidator = (resourceType) => {
    return (url) => {
        if (resourceType === resourceTypes.YOUTUBE) {
            const regex =
                /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
            if (!regex.test(url))
                return "Please provide a valid YouTube video link";
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
    };
};

export const pdfValidator = () => {};
