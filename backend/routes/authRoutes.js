const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyOtp,
  forgotPassword,
  changePassword,
  verifyChangePasswordOtp,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);

//Forgot Password
router.post("/forgot-password", forgotPassword); // 1️⃣ send OTP to email
router.post("/verify-forgot-otp", verifyChangePasswordOtp); // 2️⃣ verify OTP & set new password

// Protected route
router.post("/change-password", protect, changePassword); // 3️⃣ logged-in user changes password

module.exports = router;
