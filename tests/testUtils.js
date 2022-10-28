const mongoose = require("mongoose");
const User = require("../src/models/User");
const Logger = require("../src/config/logger");
require("dotenv").config();

const baseUser = {
  _id: "63593b2abe62496acf00f416",
  email: "email@mail.com",
  name: "Test User",
  password: "Password123",
  approved: true,
};

const authUser = {
  ...baseUser,
  _id: "63593b2abe62496acf00f413",
  email: "authuser@mail.com",
};

const connectToDatabase = () => {
  mongoose
    .connect(process.env.TEST_MONGODB_URI)
    .then(() => {
      Logger.info("Mongoose Connected");
    })
    .catch((e) => {
      Logger.error(`Some error: ${e}`);
    });
};

const loginAndReturnCookie = async (api) => {
  const response = await api
    .post("/api/users/login")
    .send({ email: authUser.email, password: authUser.password });
  const cookie = response.headers["set-cookie"];
  const { body } = response;
  // return `connect.sid=${body.sessionID}`;
  return cookie;
};

const getUserAuthCookie = async (api) => {
  await User.create({ ...authUser });
  const cookie = await loginAndReturnCookie(api);
  return cookie;
};
const getAdminAuthCookie = async (api) => {
  await User.create({ ...authUser, role: "admin" });
  const cookie = await loginAndReturnCookie(api);
  return cookie;
};

module.exports = {
  connectToDatabase,
  baseUser,
  authUser,
  getAdminAuthCookie,
  getUserAuthCookie,
};
