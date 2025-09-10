import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";

const router = express.Router();
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: "Email not registered" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  // MongoDB me save kar do, purana OTP delete kar do
  await Otp.deleteMany({ email });
  await Otp.create({ email, otp, expiresAt });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});
router.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) 
    return res.status(400).json({ success: false, message: "All fields required" });

  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < new Date())
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { $set: { passwordHash } });

  // OTP delete after use
  await Otp.deleteMany({ email });

  res.json({ success: true, message: "Password reset successful" });
});
export default router;