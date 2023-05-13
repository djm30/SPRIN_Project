const morgan = require("morgan");
const Logger = require("./logger");

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message) => Logger.http(message),
};

// Will only log error if in production
// Else logs all incoming requests
const skip = (req, res) => {
    const env = process.env.NODE_ENV || "development";
    if (env === "production") {
        return res.statusCode < 400;
    }
    return false;
};

morgan.token("body", (req) => JSON.stringify(req.body));

const morganFormat =
    process.env.NODE_ENV === "production"
        ? "common"
        : ":method :url :status :res[content-length] - :response-time ms Body - :body";

// Build the morgan middleware
const morganMiddleware = morgan(morganFormat, { stream, skip });

module.exports = morganMiddleware;
