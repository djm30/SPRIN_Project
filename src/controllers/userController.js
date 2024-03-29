const User = require("../models/User");
const Logger = require("../config/logger");
const authorizeUser = require("../utils/authorizeUser");
const {
    validateName,
    validateEmail,
    validatePassword,
} = require("../validation/User");
const { validate, validateSync } = require("../validation/common");

const getUser = async (req, res) => {
    const { id } = req.params;

    if (!authorizeUser(req.user, id)) return res.sendStatus(403);

    const user = await User.findById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "No user for that ID" });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

const approveUser = async (req, res) => {
    Logger.info(`Request recieved to approve user: ${req.params.id}`);
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
        user.approved = true;
        await user.save();
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "No user for that ID" });
    }
};

const registerUser = async (req, res) => {
    Logger.info("Request recieved to register new user");
    const { name, email, password } = req.body;

    // If no users exist, the first user to register will be an admin
    const users = await User.find();
    let role = users.length === 0 ? "admin" : "user";
    let approved = users.length === 0 ? true : false;

    // Validation
    // Name
    if (!validateSync(validateName, [name], res)) return res;

    // Email
    if (!(await validate(validateEmail, [email], res))) return res;

    // Password
    if (!validateSync(validatePassword, [password], res)) return res;

    const user = await User.create({
        name,
        email,
        password,
        role,
        approved,
    });

    return res.status(201).send(user);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (!authorizeUser(req.user, id))
        return res.status(403).json({ message: "forbidden" });

    await User.findByIdAndDelete(id);
    return res.sendStatus(204);
};

const editUser = async (req, res) => {
    const id = req.params.id;

    if (!authorizeUser(req.user, id))
        return res.status(403).json({ message: "forbidden" });

    const { name, email, role, password } = req.body;
    const user = await User.findById(id);

    // Checking if a user was found
    if (!user) {
        return res.status(404).json({ message: "No user found for this id" });
    }

    // Validation
    // Name
    if (!validateSync(validateName, [name], res)) return res;

    // Email
    // Only validating if new email differs from current email
    if (user.email !== email)
        if (!(await validate(validateEmail, [email], res))) return res;

    // Checking if new role is admin, and if it is ensuring the request sender is also an admin
    if (role === "admin" && req.user.role !== "admin")
        return res.sendStatus(403);

    if (password) {
        if (!validateSync(validatePassword, [password], res)) return res;
        user.password = password;
    }

    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    return res.send(user);
};

const preLogin = async (req, res, next) => {
    // Checking if there are any missing fields before passing to passport for login
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    } else {
        // Checking if user is approved before logging in
        const user = await User.findOne({ email });
        if (user.approved === false) {
            return res.status(400).json({
                message: "Account needs to be approved before logging in",
            });
        }
        next();
    }
};

const login = async (req, res) => {
    res.status(200).json({
        id: req.user._id,
        role: req.user.role,
        sessionID: req.sessionID,
    });
};

const logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).send("Sorry, something went wrong");
        }
    });
    res.status(200).send("Logged out");
};

const reauthenticate = async (req, res) => {
    if (req.user) {
        return res.status(200).json({
            id: req.user._id,
            role: req.user.role,
            sessionID: req.sessionID,
        });
    }
    res.status(403).json({
        message: "Session has expired, please login again!",
    });
};

module.exports = {
    getUser,
    getUsers,
    approveUser,
    preLogin,
    registerUser,
    deleteUser,
    editUser,
    login,
    logout,
    reauthenticate,
};
