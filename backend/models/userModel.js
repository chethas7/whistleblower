const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },

    email: { type: String, unique: true, sparse: true },
    emailVerified: { type: Boolean, default: false },

    phone: { type: String, unique: true, sparse: true },

    password: { type: String, required: true },
    dob: { type: Date, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

// TTL index for automatic deletion of expired OTPs
userSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("User", userSchema);
