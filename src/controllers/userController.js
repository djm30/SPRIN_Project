const User = require("../models/User");
const Logger = require("../config/logger");

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
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    user.approved = true;
    await user.save();
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "No user for that ID" });
  }
};

const registerUser = async (req, res) => {
  console.log(req);
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password });
  if (role) user.role = role;
  await user.save();
  res.send(user);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.sendStatus(204);
};

const editUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const user = await User.findById(id);
  user.name = name;
  user.email = email;
  user.password = password;
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
