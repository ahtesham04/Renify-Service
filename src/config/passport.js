const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenTypes } = require("./token");
const { User } = require("../models/user.model");
require("dotenv").config();

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  // console.log(payload)
  // const user = await User.findById(payload.sub);
  if (payload.type !== tokenTypes.ACCESS) {
    return done("Invalid token type");
  } else {
    User.findOne({ _id: payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
  // try {
  //   const user = await User.findById(payload.sub); // Assuming sub contains the user ID
  //   if (!user) {
  //     return done(null, false); // User not found
  //   }
  //   if(payload.type !== tokenTypes.ACCESS){
  //     return done('Invalid token type')
  //   }
  //   return done(null, user); // User found
  // } catch (error) {
  //   return done(error, false); // Error occurred
  // }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
