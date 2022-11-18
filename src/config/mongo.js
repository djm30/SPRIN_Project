const mongoose = require("mongoose");

const {
    MONGODB_URI,
    MONGODB_USER,
    MONGODB_PASS,
    DATABASE_NAME,
} = require("./config");

module.exports = function () {
    mongoose
        .connect(MONGODB_URI, {
            authSource: DATABASE_NAME,
            user: MONGODB_USER,
            pass: MONGODB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to mongodb");
        })
        .catch((err) => {
            console.log(err);
        });
};
