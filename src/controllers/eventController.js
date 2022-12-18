const Event = require("../models/Event");
const Logger = require("../config/logger");
const { uploadFile, replaceFile } = require("../utils/s3Service");
const {
    validateTitle,
    validateDescription,
    validateLocation,
    validateAddress,
    validateDateTime,
    validateEventbriteUrl,
} = require("../validation/Event");

const { validateSync } = require("../validation/common");

// All event methods require admin authorization,
// therefore user object will always be available
// for all of these methods

// This method will find a single event by its ID and return it
const getEvent = async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
        return res.sendStatus(404);
    }
    res.status(200).json(event);
};

// This method will find all events and return them
const getEvents = async (req, res) => {
    const events = await Event.find({});
    res.status(200).json(events);
};

// This method will create a new event and return it
const createEvent = async (req, res) => {
    const { title, description, location, address, eventbriteUrl, dateTime } =
        req.body;

    // Validation
    // Title
    if (!validateSync(validateTitle, [title], res)) return res;

    // Description
    if (!validateSync(validateDescription, [description], res)) return res;

    // Location
    if (!validateSync(validateLocation, [location], res)) return res;

    // Datetime
    if (!validateSync(validateDateTime, [dateTime], res)) return res;

    // Address
    if (!validateSync(validateAddress, [location, address], res)) return res;

    // Eventbrite Url
    if (!validateSync(validateEventbriteUrl, [eventbriteUrl], res)) return res;

    let imgUrl = "";

    // If there is a file in the request, upload it to S3
    if ("file" in req) {
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: "Please upload a file" });
        imgUrl = await uploadFile(file, file.mimetype);
        if (!imgUrl)
            return res.status(500).json({
                message: "Something went wrong uploading, please try again",
            });
    }

    const event = new Event({
        title,
        description,
        location,
        address,
        eventbriteUrl,
        imgUrl,
        dateTime,
    });

    try {
        await event.save();
        // console.log(event);
        res.status(200).json(event);
    } catch (e) {
        Logger.error(e);
        res.sendStatus(500);
    }
};

// This method will update an existing event and return it
const updateEvent = async (req, res) => {
    const { title, description, location, address, eventbriteUrl, dateTime } =
        req.body;

    let eventToUpdate = await Event.findById(req.params.id);

    // Validation
    // Title
    if (!validateSync(validateTitle, [title], res)) return res;

    // Description
    if (!validateSync(validateDescription, [description], res)) return res;

    // Location
    if (!validateSync(validateLocation, [location], res)) return res;

    // Datetime
    if (!validateSync(validateDateTime, [dateTime], res)) return res;

    // Address
    if (!validateSync(validateAddress, [location, address], res)) return res;

    // Eventbrite Url
    if (!validateSync(validateEventbriteUrl, [eventbriteUrl], res)) return res;

    let imgUrl = eventToUpdate.imgUrl;

    // If there is a file in the request, upload it to S3
    if (req.file) {
        const file = req.file;
        if (!file)
            return res.status(400).json({ message: "Please upload a file" });
        // Replacing the file in S3
        imgUrl = await replaceFile(eventToUpdate.imgUrl, file, file.mimetype);
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

// This method will delete an existing event
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
