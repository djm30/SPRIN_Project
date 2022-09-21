const express = require("express");
const session = require("express-session");
const passport = require("passport");
const getRedisClient = require("./config/redis");
const RedisStore = require("connect-redis")(session);
const morganMiddleware = require("./config/morgan");
const errorMiddleware = require("./middleware/error");

const logger = require("./config/logger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing connection to redis
const redisClient = getRedisClient();
redisClient.connect();
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

// Express-session middleware configruation
// Express-session is used to establish a session for the user
// The details for which are stored in ther redis server
// This middleware will retrieve the session db on each request so we can access it in the request object
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
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

logger.info("This is a winston log message");

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

app.use(errorMiddleware);

module.exports = app;
