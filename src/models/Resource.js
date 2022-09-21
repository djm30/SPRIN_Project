const mongoose = require("mongoose");
const resourceTypes = require("../config/resourceTypes");

const ResourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
    enum: [resourceTypes.pdf, resourceTypes.website, resourceTypes.youtube],
  },
  resourceUrl: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
    required: true,
  },
});

module.exports = mongoose.model("Resource", ResourceSchema);
