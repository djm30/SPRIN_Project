const User = require("../models/User");

// Validation functions for the User model
// These functions will be used in the userController
// to validate the data before creating a new user

const validateName = (name) => {
    let success = true;
    let message = "";

    // Check name is longer than one character
    if (name.trim().length < 2) {
        success = false;
        message = "Please enter a name!";
    }

    // Check name is less than 40 characters
    if (name.trim().length > 40) {
        success = false;
        message = "Entered name cannot be longer than 40 characters!";
    }
    return { success, message };
};

const validateEmail = async (email) => {
    let success = true;
    let message = "";

    // Check if email is a valid email
    if (
        !email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        success = false;
        message = "Please enter a valid email!";
    }
    // Check if email alreadys exists in the database
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
        success = false;
        message = "User with email already exists!";
    }

    return { success, message };
};

const validatePassword = (password) => {
    let success = true;
    let message = "";

    // 8 Characters
    if (password.trim().length < 8) {
        success = false;
        message = "Password must be at least 8 characters";
    }

    // 1 Number
    if (!/[0-9]/.test(password)) {
        success = false;
        message = "Password must contain a number";
    }

    if (password.toLowerCase() === password) {
        // 1 Capital
        success = false;
        message = "Password must contain at least one capital letter";
    }

    return { success, message };
};

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
};
