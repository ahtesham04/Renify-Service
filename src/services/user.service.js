const { User } = require("../models/user.model");

const createUser = async (user) => {
  // const emailTaken = await getUserByEmail(user.email);

  // if (emailTaken) {
  //   return { message: "email already register" };
  // }
  return await User.create(user);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findOne({ _id: id });
};

module.exports = { createUser, getUserByEmail, getUserById };
