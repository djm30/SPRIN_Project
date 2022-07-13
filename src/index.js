const express = require("express");
const session = require("express-session");
const getRedisClient = require("./config/redis");
const mongoose = require("mongoose");
const RedisStore = require("connect-redis")(session);
const User = require("./models/User");
const passport = require("passport");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mongoose to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const redisClient = getRedisClient();
redisClient.connect();
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

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
  })
);

// setting up passport take 2
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.get("/", (req, res) => {
  const sess = req.session;
  sess.hithere = "Hello";
  console.log(sess);
  res.send("Hello World");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("here");
  res.status(200).json({
    id: req.user._id,
    role: req.user.role,
    sessionID: req.sessionID,
  });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/protected", (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.send("hi there");
  } else res.status(401).send("fuck outta here");
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(500).send("Sorry, something went wrong");
    }
  });
  res.status(200).send("Logged out");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
