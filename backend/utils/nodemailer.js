const nodemailer = require("nodemailer");

const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Whistleblower" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 15 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailOTP;
