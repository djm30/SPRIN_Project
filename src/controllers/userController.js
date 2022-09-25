const User = require("../models/User");
const Logger = require("../config/logger");

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

  //Check if email is a valid email
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
  if (!/d/.test(password)) {
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

const authorizeUser = async (reqUser, userID) => {
  if (reqUser.role !== "admin") {
    return reqUser._id.toString() === userID;
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
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
  const { name, email, password, role } = req.body;

  // Validation
  const { success: nameSuccess, message: nameMessage } = validateName(name);
  if (!nameSuccess) return res.status(400).json({ message: nameMessage });
  const { success: emailSuccess, message: emailMessage } = await validateEmail(
    email,
  );

  if (!emailSuccess) return res.status(400).json({ message: emailMessage });
  const { success: passwordSuccess, message: passwordMessage } =
    validatePassword(password);
  if (!passwordSuccess)
    return res.status(400).json({ message: passwordMessage });

  const user = await User.create({ name, email, password });
  if (role) user.role = role;
  await user.save();
  res.send(user);
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

  const { name, email } = req.body;

  // Validation
  const { nameSuccess, nameMessage } = validateName(name);
  if (!nameSuccess) return res.status(400).json({ message: nameMessage });
  const { emailSuccess, emailMessage } = validateEmail(email);
  if (!emailSuccess) return res.status(400).json({ message: emailMessage });

  const user = await User.findById(id);
  user.name = name;
  user.email = email;
  await user.save();
  res.send(user);
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

module.exports = {
  getUser,
  getUsers,
  approveUser,
  registerUser,
  deleteUser,
  editUser,
  login,
  logout,
};
