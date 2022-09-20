const Event = require("../models/Event");
const Logger = require("../config/logger");

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

  if (location !== "online" || location !== "phsyical") {
    success = false;
    message =
      "Please enter a valid input for location ('online' or 'phsyical')";
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
  const id = req.params.id;

  const eventToUpdate = await Event.findById(id);
  if (!eventToUpdate) return res.sendStatus(404);

  const { title, description, location, address, eventbriteUrl } = req.body;

  // Validation
  // Title
  const { titleSuccess, titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { descriptionSuccess, descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Location
  const { locationSuccess, locationMessage } = validateLocation(location);
  if (!locationSuccess)
    return res.status(400).json({ message: locationMessage });

  // Address
  const { addressSuccess, addressMessage } = validateAddress(address);
  if (!addressSuccess) return res.status(400).json({ message: addressMessage });

  // Eventbrite Url
  const { eventbriteUrlSuccess, eventbriteUrlMessage } =
    validateEventbriteUrl(eventbriteUrl);
  if (!eventbriteUrlSuccess)
    return res.status(400).json({ message: eventbriteUrlMessage });

  const event = new Event({
    title,
    description,
    location,
    address,
    eventbriteUrl,
  });

  try {
    await event.save();
    res.sendStatus(201);
  } catch (e) {
    Logger.error(e);
    res.sendStatus(500);
  }
};
const updateEvent = async (req, res) => {
  const { title, description, location, address, eventbriteUrl } = req.body;

  // Validation
  // Title
  const { titleSuccess, titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { descriptionSuccess, descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Location
  const { locationSuccess, locationMessage } = validateLocation(location);
  if (!locationSuccess)
    return res.status(400).json({ message: locationMessage });

  // Address
  const { addressSuccess, addressMessage } = validateAddress(address);
  if (!addressSuccess) return res.status(400).json({ message: addressMessage });

  // Eventbrite Url
  const { eventbriteUrlSuccess, eventbriteUrlMessage } =
    validateEventbriteUrl(eventbriteUrl);
  if (!eventbriteUrlSuccess)
    return res.status(400).json({ message: eventbriteUrlMessage });

  try {
    eventToUpdate.title = title;
    eventToUpdate.description = description;
    eventToUpdate.location = location;
    eventToUpdate.address = address;
    eventToUpdate.eventbriteUrl = eventbriteUrl;
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

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
