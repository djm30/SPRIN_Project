const { object, string } = require("yup");
const eventTypes = require("../config/eventTypes");
const { validateUrl } = require("./common");

const validateTitle = (title) => {
  let success = true;
  let message = "";

  if (title.trim().length == 0) {
    success = false;
    message = "Please enter a title!";
  }
  return { success, message };
};

const validateDescription = (description) => {
  let success = true;
  let message = "";

  if (description.trim().length == 0) {
    success = false;
    message = "Please enter a title!";
  }

  if (description.trim().length > 240) {
    success = false;
    message = "Please keep the description under 240 characters!";
  }

  return { success, message };
};

const validateLocation = (location) => {
  let success = true;
  let message = "";

  if (location !== eventTypes.online && location !== eventTypes.physical) {
    success = false;
    message =
      "Please enter a valid input for location ('online' or 'physical')";
  }

  return { success, message };
};

const validateAddress = (location, address) => {
  let success = true;
  let message = "";

  if (location === "online") {
    const result = validateUrl(address);
    success = result.success;
    message = result.message;
  }

  if (location === "physical") {
    const addressSchema = object({
      addressLineOne: string().required(),
      addressLineTwo: string(),
      postCode: string().required(),
      townCity: string().required(),
    });

    const deserializedAddress = JSON.parse(address);

    try {
      if (!addressSchema.validateSync(deserializedAddress)) {
        success = false;
        message = "Please provide a valid address";
      }
    } catch (e) {
      if (e.name === "ValidationError") {
        success = false;
        message = e.message;
      }
    }
  }

  return { success, message };
};

const validateDateTime = (dateTime) => {
  let success = true;
  let message = "";

  return { success, message };
};

const validateEventbriteUrl = (url) => {
  let success = true;
  let message = "";

  const regex =
    /^\s*https?:\/\/(?:www\.)?(?:eventbrite\.[a-z.]+)\/e\/[^/]*?(\d+)\/?(?:\?[^/]*)?\s*$/gim;

  if (!regex.test(url)) {
    success = false;
    message = "Please enter a valid eventbrite link!";
  }

  return { success, message };
};

module.exports = {
  validateTitle,
  validateDescription,
  validateLocation,
  validateAddress,
  validateDateTime,
  validateEventbriteUrl,
};
