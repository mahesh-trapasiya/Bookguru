const express = require("express");
const usersController = require("../Controllers/User");

const router = express.Router();

router.post("/api/adduser", usersController.addUser);

module.exports = router;
