const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("passport");
const getRedisClient = require("./config/redis");

const morganMiddleware = require("./config/morgan");
const errorMiddleware = require("./middleware/error");

const logger = require("./config/logger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing connection to redis
// const redisClient = getRedisClient();
// redisClient.connect();
// redisClient.on("error", (err) => {
//     logger.error(`Could not establish a connection with redis: ${err}`);
// });
// redisClient.on("connect", () => {
//     logger.info("Connected to redis successfully");
// });

require("./config/mongo")();

// Express-session middleware configruation
// Express-session is used to establish a session for the user
// The details for which are stored in ther redis server
// This middleware will retrieve tße session db on eacß
// request so we can access it in the request object
app.use(
    session({
        store: MongoStore.create({ client: mongoose.connection.getClient() }),
        // store: new RedisStore({ client: redisClient }),
        secret: "secret$%^134",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: true, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 60, // session max age in miliseconds
        },
    }),
);

// Importing passport configruation and establishing its respesctive middleware
// Passport is used to authenticate the user
// Passport is extensible and so other auth strategies can be used
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(morganMiddleware);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

app.use(errorMiddleware);

module.exports = app;
