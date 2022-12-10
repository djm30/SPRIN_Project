// Validation functions for all fields for the create event form

// TODO
export const eventTileValidator = (title) => {
    if (title.trim().length === 0) return "Please provide a title";
    if (title.trim().length < 4) return "Please provide a longer title";
    return "";
};

export const eventDescriptionValidator = (description) => {
    if (description.trim().length === 0) return "Please provide a title";
    if (description.trim().length < 10)
        return "Please provide a longer description";
    return "";
};

export const meetingUrlValidator = (url) => {
    if (url.substring(0, 5) !== "https") {
        return "Please ensure URL begins with https (To ensure the url is from a secure site)";
    }
    const regex =
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (!regex.test(url)) return "Please provide a valid URL";
    return "";
};

export const dateTimeValidator = (dateTime) => {
    if (!dateTime) return "Please provide a date and a time";
    return "";
};

export const eventbriteUrlValidator = (url) => {
    if (url.substring(0, 5) !== "https") {
        return "Please ensure URL begins with https (To ensure the url is from a secure site)";
    }

    const regex =
        /^\s*https?:\/\/(?:www\.)?(?:eventbrite\.[a-z.]+)\/e\/[^/]*?(\d+)\/?(?:\?[^/]*)?\s*$/gim;

    if (!regex.test(url)) {
        return "Please enter a valid eventbrite link!";
    }

    return "";
};

export const addressLineOneValidator = (address) => {
    if (address.trim().length === 0) return "Please provide an address";
    return "";
};

export const addressLineTwoValidator = (address) => {
    return "";
};

export const postCodeValidator = (postCode) => {
    if (postCode.trim().length === 0) return "Please provide a postcode";
    return "";
};

export const townCityValidator = (townCity) => {
    if (townCity.trim().length === 0) return "Please provide a town/city";
    return "";
};

export const imageValidator = (image) => {};
