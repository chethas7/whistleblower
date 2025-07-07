const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendEmailOTP = require("../utils/nodemailer");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// REGISTER USER
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password, dob } = req.body;
  console.log(req.body, "signuphit");

  if (!username) throw new Error("Username is required");
  if (!email) throw new Error("Email is required");

  const existingUser = await User.findOne({
    $or: [{ email }, { username }, { phone }],
  });
  if (existingUser) throw new Error("User already exists");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    email,
    phone,
    dob,
    password: hashedPassword,
    otp,
    otpExpires: otpExpiry,
  });

  await sendEmailOTP(email, otp);

  await user.validate();
  await user.save();

  res.status(201).json({ msg: `OTP sent to email` });
});

// VERIFY EMAIL OTP
exports.verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body, "otp verification");
  

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.emailVerified) throw new Error("Account already verified");
  if (user.otp !== otp) throw new Error("Invalid OTP");
  if (user.otpExpires < Date.now()) throw new Error("OTP expired");

  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ msg: "Account verified successfully" });
});

// LOGIN USER
exports.loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password, rememberMe } = req.body;
  console.log("LOGIN REQUEST BODY:", req.body);

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) throw new Error("User not found login procedure");
  if (!user.emailVerified) throw new Error("Account not verified");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? "30d" : "1d",
  });

  res.status(200).json({
    msg: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// FORGOT PASSWORD
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await sendEmailOTP(email, otp);

  res.status(200).json({ msg: "OTP sent to email" });
});

// RESET PASSWORD
exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match");

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp || user.otpExpires < Date.now())
    throw new Error("Invalid or expired OTP");

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ msg: "Password reset successfully" });
});

// CHANGE PASSWORD (send OTP)
exports.changePassword = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Incorrect old password");

  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await sendEmailOTP(user.email, otp);
  res.status(200).json({ msg: "OTP sent to email for verification" });
});

// VERIFY CHANGE PASSWORD OTP
exports.verifyChangePasswordOtp = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { otp, newPassword, confirmPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.otp !== otp || user.otpExpires < Date.now())
    throw new Error("Invalid or expired OTP");

  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match");

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ msg: "Password changed successfully" });
});
