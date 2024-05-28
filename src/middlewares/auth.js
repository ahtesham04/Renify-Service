// const jwt = require("jsonwebtoken");
// // const User = require('../models/User');

// module.exports = async function (req, res, next) {
//   const token = req.header("x-auth-token");
//   if (!token)
//     return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Custom callback function implementation to verify callback from passport
 * - If authentication failed, reject the promise and send back an ApiError object with
 * --- Response status code - "401 Unauthorized"
 * --- Message - "Please authenticate"
 *
 * - If authentication succeeded,
 * --- set the `req.user` property as the user object corresponding to the authenticated token
 * --- resolve the promise
 */
// const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
//   console.log(err, user, info);
//   if (err || !user || info) {
//     reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
//   }
//   req.user = user;
//   resolve();
// };

/**
 * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
 *
 */
// const auth = async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate(
//       "jwt",
//       { session: false },
//       verifyCallback(req, resolve, reject)
//     )(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

// module.exports = auth;
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const auth = async (req, res, next) => {
  // console.log(req);
  try {
    // const token = req.cookies.jwt;
    // const token = req.headers["autorization"];
    const token = req.headers.authorization;
    // console.log(token, "token");
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyUser, "verify");
    if (verifyUser) {
      // const user = await User.findOne({ _id: verifyUser });
      req.user = verifyUser.sub;
      next();
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
