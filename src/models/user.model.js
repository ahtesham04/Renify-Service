const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (v) => {
    //     return /\S+@S+\.\S+/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email address`,
    // },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    // validate(value) {
    //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    //     throw new Error(
    //       "Password must contain at least one letter and one number"
    //     );
    //   }
    // },
  },
  phoneNumber: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.statics.isEmailTaken = async function (email) {
  try {
    // Find a user with the given email
    const user = await this.find({ email });
    // If a user with the given email exists, return true (email is taken)
    return !!user;
  } catch (error) {
    // If an error occurs during the database query, log the error and return false
    console.error("Error while checking if email is taken:", error);
    return false;
  }
};

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
