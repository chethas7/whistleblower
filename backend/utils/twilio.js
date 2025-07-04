const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendPhoneOTP = async (phone) => {
  try {
    // Ensure it's a 10-digit Indian number
    if (!/^[6-9]\d{9}$/.test(phone)) {
      throw new Error("Invalid Indian phone number");
    }

    const fullPhone = `+91${phone}`;

    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: fullPhone,
        channel: "sms",
      });

    console.log("OTP sent:", verification.status);
  } catch (err) {
    console.error("Failed to send OTP:", err.message);
    throw err;
  }
};

const verifyPhoneOTP = async (phone, otp) => {
  try {
    const fullPhone = `+91${phone}`;

    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: fullPhone,
        code: otp,
      });

    return verificationCheck.status === "approved";
  } catch (err) {
    console.error("OTP verification failed:", err.message);
    return false;
  }
};

module.exports = { sendPhoneOTP, verifyPhoneOTP };
