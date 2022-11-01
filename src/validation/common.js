// Function that runs a validation function, and updates the response with the error message
// if the validation failed. Does this with synchronous methods
const validateSync = (validationFunction, params, res) => {
  const { success, message } = validationFunction(...params);

  if (!success) {
    res.status(400).json({ message });
  }
  return success;
};

// Function that runs a validation function, and updates the response with the error message
// if the validation failed. Does this with asynchronous methods
const validate = async (validationFunction, params, res) => {
  const { success, message } = await validationFunction(...params);

  if (!success) {
    res.status(400).json({ message });
  }
  return success;
};

// Common validatoin function for multiple fields, validates urls and ensures they are HTTPS
const validateUrl = (url) => {
  let success = true;
  let message = "";
  const regex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (!regex.test(url)) {
    success = false;
    message = "Please provide a valid URL";
  }
  if (url.substring(0, 5) !== "https") {
    success = false;
    message = "Please ensure URL begins with https";
  }
  if (!url || url.trim().length === 0) {
    success = false;
    message = "Please provide a valid URL";
  }
  return { success, message };
};

module.exports = { validate, validateSync, validateUrl };
