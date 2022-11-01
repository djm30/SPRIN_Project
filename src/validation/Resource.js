const { validateUrl } = require("./common");
const resourceTypes = require("../config/resourceTypes");

const validateTitle = (title) => {
  let success = true;
  let message = "";

  if (!title || title.trim().length === 0) {
    success = false;
    message = "Please enter a title!";
  }
  return { success, message };
};

const validateDescription = (description) => {
  let success = true;
  let message = "";

  if (!description || description.trim().length === 0) {
    success = false;
    message = "Please enter a title!";
  }

  if (description.trim().length > 240) {
    success = false;
    message = "Please keep the description under 240 characters!";
  }

  return { success, message };
};

const validateResourceType = (resourceType) => {
  let success = true;
  let message = "";

  if (!resourceType) {
    success = false;
    message = "Please provide a resource type";
  }

  let match = false;
  Object.entries(resourceTypes).forEach(([key, val]) => {
    if (resourceType === val) {
      match = true;
    }
  });

  if (!match) {
    success = false;
    message = "Please provide a valid resource type";
  }
  return { success, message };
};

const validateResourceUrl = (resourceType, resourceUrl) => {
  let success = true;
  let message = "";

  if (resourceType === resourceTypes.youtube) {
    const regex =
      /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    if (!regex.test(resourceUrl)) {
      success = false;
      message = "Please provide a valid YouTube url";
    }
  }

  if (resourceType === resourceTypes.website) {
    const result = validateUrl(resourceUrl);
    success = result.success;
    message = result.message;
  }

  return { success, message };
};

const validateFile = (file) => {
  let success = true;
  let message = "";

  const extension = file.filename
    ? file.filename.split(".").slice(-1)[0]
    : ".invalid";
  if (extension !== "pdf") {
    message = "Please upload a pdf file";
    success = false;
  }

  return { success, message };
};

module.exports = {
  validateTitle,
  validateDescription,
  validateResourceType,
  validateResourceUrl,
  validateFile,
};
