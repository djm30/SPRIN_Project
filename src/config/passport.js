const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const authCallback = async (username, password, done) => {
  console.log("auth callback getting invoked");
  try {
    // console.log(username);
    const user = await User.findOne({ email: username });
    console.log(user);
    if (!user) return done(null, false);
    const isValid = await user.isValidPassword(password);
    if (!isValid) return done(null, false);
    console.log("we returning");
    return done(null, user);
  } catch (Err) {
    done(Err);
  }
};

const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  authCallback
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (Err) {
    done(Err, null);
  }
});
