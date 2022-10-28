const Event = require("../models/Event");
const Logger = require("../config/logger");
const { uploadFile, replaceFile } = require("../utils/s3Service");
const eventTypes = require("../config/eventTypes");

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
const validateAddress = (address) => {
  let success = true;
  let message = "";

  return { success, message };
};
const validateEventbriteUrl = (url) => {
  let success = true;
  let message = "";

  return { success, message };
};

// All event methods require admin authorization,
// therefore user object will always be available
// for all of these methods

const getEvent = async (req, res) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  if (!event) {
    return res.sendStatus(404);
  }
  res.status(200).json(event);
};

const getEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(200).json(events);
};

const createEvent = async (req, res) => {
  const { title, description, location, address, eventbriteUrl } = req.body;

  // Validation
  // Title
  const { success: titleSuccess, message: titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { success: descriptionSuccess, message: descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Location
  const { success: locationSuccess, message: locationMessage } =
    validateLocation(location);
  if (!locationSuccess)
    return res.status(400).json({ message: locationMessage });

  // Address
  const { success: addressSuccess, message: addressMessage } =
    validateAddress(address);
  if (!addressSuccess) return res.status(400).json({ message: addressMessage });

  // Eventbrite Url
  const { success: eventbriteUrlSuccess, message: eventbriteUrlMessage } =
    validateEventbriteUrl(eventbriteUrl);
  if (!eventbriteUrlSuccess)
    return res.status(400).json({ message: eventbriteUrlMessage });

  let imgUrl = "";

  if ("file" in req) {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });
    imgUrl = await uploadFile(file);
    if (!imgUrl)
      return res
        .status(500)
        .json({ message: "Something went wrong uploading, please try again" });
  }

  const event = new Event({
    title,
    description,
    location,
    address,
    eventbriteUrl,
    imgUrl,
  });

  try {
    await event.save();
    // console.log(event);
    res.status(201).json(event);
  } catch (e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};

const updateEvent = async (req, res) => {
  const { title, description, location, address, eventbriteUrl } = req.body;

  let eventToUpdate = await Event.findById(req.params.id);

  // Validation
  // Title
  const { success: titleSuccess, message: titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { success: descriptionSuccess, message: descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Location
  const { success: locationSuccess, message: locationMessage } =
    validateLocation(location);
  if (!locationSuccess)
    return res.status(400).json({ message: locationMessage });

  // Address
  const { success: addressSuccess, message: addressMessage } =
    validateAddress(address);
  if (!addressSuccess) return res.status(400).json({ message: addressMessage });

  // Eventbrite Url
  const { success: eventbriteUrlSuccess, message: eventbriteUrlMessage } =
    validateEventbriteUrl(eventbriteUrl);
  if (!eventbriteUrlSuccess)
    return res.status(400).json({ message: eventbriteUrlMessage });

  imgUrl = eventToUpdate.imgUrl;

  if ("file" in req) {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });
    imgUrl = await replaceFile(eventToUpdate.imgUrl, file);
    if (!imgUrl)
      return res.status(500).json({
        message: "Something went wrong uploading, please try again",
      });
  }

  try {
    eventToUpdate.title = title;
    eventToUpdate.description = description;
    eventToUpdate.location = location;
    eventToUpdate.address = address;
    eventToUpdate.eventbriteUrl = eventbriteUrl;
    eventToUpdate.imgUrl = imgUrl;
    await eventToUpdate.save();
    res.status(200).json(eventToUpdate);
  } catch (e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  await Event.findByIdAndDelete(id);
  res.sendStatus(204);
};

const exportedForTesting = {
  validateTitle,
  validateDescription,
  validateLocation,
  validateEventbriteUrl,
  validateAddress,
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  exportedForTesting,
};
