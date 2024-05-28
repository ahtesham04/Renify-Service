const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index");
const { jwtStrategy } = require("./src/config/passport");
const passport = require("passport");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use("jwt", jwtStrategy);
app.use("/api", routes);

module.exports = app;
