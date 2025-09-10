// utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail use kar rhe ho to
  auth: {
    user: process.env.EMAIL_USER, // tumhara email
    pass: process.env.EMAIL_PASS, // app password (not direct password)
  },
});

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"YourMart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};
