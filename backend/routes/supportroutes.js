// backend/routes/support.js
import express from "express";
import multer from "multer";
import { sendMail } from "../utils/mailer.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const { name, email, issue } = req.body;
    let screenshotUrl = null;

    // agar screenshot aaya hai to Cloudinary pe upload karo
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "support_screenshots",
      });
      screenshotUrl = result.secure_url;

      // local temp file delete kar do
      fs.unlinkSync(req.file.path);
    }

    // Mail to Admin
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Support Issue Submitted",
      html: `
        <h3>New Support Ticket</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Issue:</b> ${issue}</p>
        ${screenshotUrl ? `<p><b>Screenshot:</b> <a href="${screenshotUrl}" target="_blank">View Screenshot</a></p>` : ""}
      `,
    });

    // Mail to User
    await sendMail({
      to: email,
      subject: "We received your support request",
      html: `
        <p>Dear ${name},</p>
        <p>We have received your issue and will try to resolve it within 24 hours.</p>
        <p><b>Issue:</b> ${issue}</p>
        ${screenshotUrl ? `<p>Here is the screenshot you uploaded: <a href="${screenshotUrl}" target="_blank">View Screenshot</a></p>` : ""}
        <p>Our Support Team</p>
      `,
    });

    res.status(200).json({ message: "Support ticket submitted successfully" });
  } catch (error) {
    console.error("Support route error:", error);
    res.status(500).json({ message: "Error submitting support ticket" });
  }
});

export default router;
