const mongoose = require("mongoose");
const roles = require("../config/roles");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.USER, roles.ADMIN],
    default: "user",
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const saltRounds = 10;
// Hashes the password before saving
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const user = this;
    try {
      hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (Err) {
      return next(Err);
    }
  } else next();
});

// This method is attached to any instance of the UserSchema
// Validates if a given password is correct
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  let comparison = await bcrypt.compare(password, user.password);
  return comparison;
};

module.exports = mongoose.model("User", UserSchema);
