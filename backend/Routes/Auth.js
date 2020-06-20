const express = require("express");
const authController = require("../Controllers/Auth");

const router = express.Router();

router.post("/api/auth/signup", authController.Signup);
router.get("/api/auth/signin", authController.Signin);
router.get("/api/auth/verifyotp", authController.VerifyOtp);

module.exports = router;
