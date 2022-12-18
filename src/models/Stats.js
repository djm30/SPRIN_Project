const mongoose = require("mongoose");

// Stats Schema
// Used to represent a stat
const StatsSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    },
    users: {
        type: Number,
        required: true,
        default: 0,
    },
    resources: {
        type: Number,
        required: true,
        default: 0,
    },
    events: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("Stats", StatsSchema);
