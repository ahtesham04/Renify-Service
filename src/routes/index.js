const express = require("express");
const propertyRoute = require("./property.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const router = express.Router();

router.use("/property", propertyRoute);
router.use("/auth", authRoute);

router.use("/user", userRoute);

module.exports = router;
