const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

// This is the callback function that is called when the user tries to log in
// It takes the username and password from the request body and checks if they are valid
// If they are valid, it calls done with the user object
// If they are not valid, it calls done with false
const authCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username });
        if (!user) return done(null, false);
        const isValid = await user.isValidPassword(password);
        if (!isValid) return done(null, false);
        const isApproved = user.approved;
        if (!isApproved) return done(null, false);
        return done(null, user);
    } catch (Err) {
        done(Err);
    }
};

// This is the strategy that passport uses to authenticate the user
const strategy = new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    authCallback,
);

passport.use(strategy);

// I think this is used to attach something identifiable about the user to the session which it can use later
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// I think passport then takes the aforementioned id and finds the user to attach to the request object
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId);
        done(null, user);
    } catch (Err) {
        done(Err, null);
    }
});
