const multer = require("multer");

// Middleware to upload file from http request to server
const upload = multer({ dest: "./src/uploads" });

module.exports = upload;
