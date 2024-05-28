const jwt = require("jsonwebtoken");
const { tokenTypes } = require("../config/token");
require("dotenv").config();
const generateToken = (
  userId,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
  };

  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const expiresIn =
    Math.floor(Date.now() / 1000) +
    process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60;
  // console.log(expiresIn,'time')
  const token = await generateToken(
    user._id,
    expiresIn,
    tokenTypes.ACCESS,
    process.env.JWT_SECRET
  );
  const userVerify = await jwt.verify(token, process.env.JWT_SECRET);
  // console.log(token)
  // Calculate token expiration date
  const expiryDate = new Date();
  // console.log(expiryDate)
  return token;
  // {
  //   access: {
  //     token,
  //     expires: expiryDate,
  //   },
  // };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
