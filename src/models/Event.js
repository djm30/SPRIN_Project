const mongoose = require("mongoose");
const eventTypes = require("../config/eventTypes");

// Event Schema
// Used to represent an event
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        enum: [eventTypes.online, eventTypes.physical],
    },
    address: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    imgUrl: {
        type: String,
    },
    eventbriteUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Event", EventSchema);
