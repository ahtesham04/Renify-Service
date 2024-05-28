const express = require("express");
const { getUser } = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/:id", auth, getUser);

module.exports = router;
