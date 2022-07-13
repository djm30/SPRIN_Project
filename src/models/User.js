const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//create uer schema
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
    enum: ["user", "admin"],
    default: "user",
  },
});

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

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  let comparison = await bcrypt.compare(password, user.password);
  return comparison;
};

module.exports = mongoose.model("User", UserSchema);
