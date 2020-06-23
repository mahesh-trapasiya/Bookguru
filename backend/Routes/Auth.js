const express = require("express");
const authController = require("../Controllers/Auth");

const router = express.Router();

router.post("/auth/signup", authController.Signup);
router.post("/auth/signin", authController.Signin);
router.put("/auth/verifyotp", authController.VerifyOtp);

module.exports = router;
