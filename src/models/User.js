const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../config/roles");

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

/*eslint-disable */
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const user = this;
    try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (Err) {
      return next(Err);
    }
  } else next();
});
/*eslint-reenable */

// This method is attached to any instance of the UserSchema
// Validates if a given password is correct
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const comparison = await bcrypt.compare(password, user.password);
  return comparison;
};

// This method ensures the hashed password is never returned in a request
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
