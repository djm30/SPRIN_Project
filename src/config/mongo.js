const mongoose = require("mongoose");

const URI = require("./config").MONGODB_URI;

module.exports = function () {
  mongoose
    .connect(URI, {
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
