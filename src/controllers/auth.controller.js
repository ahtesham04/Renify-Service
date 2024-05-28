const { date } = require("joi");
const { loginUserWithEmailAndPassword } = require("../services/auth.service");
const { generateAuthTokens } = require("../services/token.service");
const { createUser, getUserByEmail } = require("../services/user.service");
const httpStatus = require("http-status");
// const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  const user = await createUser(req.body);

  const tokens = await generateAuthTokens(user);
  res.cookie("jwt", tokens, {
    expires: new Date(Date.now() + 30000),
    httpOnly: true,
  });
  res.status(201).json({ user, tokens });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields" });
  }
  // const existUser = await getUserByEmail(email);
  // console.log(existUser);
  // if(existUser === null){
  //   res.status(401).json({ message: "Email id is not correct" });
  // }
  // if (email !== existUser.email) {
  //   return res.status(401).json({ message: "Email id is not correct" });
  // }
  // if (!bcrypt.compare(password, existUser.password)) {
  //   return res.status(401).json({ message: "Password is not correct" });
  // }
  // Call authService to verify if the provided email and password are valid
  const user = await loginUserWithEmailAndPassword(email, password);
  console.log(user, "user");
  // Generate authentication tokens
  const tokens = await generateAuthTokens(user);
  // console.log(res.cookie, tokens);
  res.cookie(
    "jwt",
    tokens
    // , {
    //   expires: new Date(Date.now() + 30000),
    //   // httpOnly: true,
    //   // secure: true,
    // }
  );
  console.log(res);
  // Send back the response
  res.status(httpStatus.OK).json({ user, tokens });
};

module.exports = {
  register,
  login,
};
