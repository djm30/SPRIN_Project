const mongoose = require("mongoose");

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
    enum: ["online", "phsyical"],
  },
  address: {
    type: String,
    required: true,
  },
  eventbriteUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
