const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  console.log(user, "new user");
  const isMatch = bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
