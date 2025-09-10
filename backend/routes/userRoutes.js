
// ================== SELLER SIGNUP ==================
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import Cloudinary from "../utils/cloudinary.js";
// import nodemailer from "nodemailer";


const router = express.Router();

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================== SELLER SIGNUP ==================
router.post("/seller/signup", upload.single("file"), async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      phone,
      altPhone,
      panCard,
      gstin,
      addressLine1,
      addressLine2,
      state,
      city,
      pincode,
      accountNumber,
      ifscCode,
      accountHolderName
    } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "Email, username and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Upload file to Cloudinary if exists
    let fileUrl = "";
    if (req.file) {
      const uploaded = await Cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) throw error;
          fileUrl = result.secure_url;
        }
      );
      uploaded.end(req.file.buffer);
    }

    const newUser = new User({
      email,
      username,
      passwordHash,
      role: "seller",
      phone,
      altPhone,
      panCard,
      gstin,
      addressLine1,
      addressLine2,
      state,
      city,
      pincode,
      accountNumber,
      ifscCode,
      accountHolderName,
      fileUrl
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user: { username: newUser.username, email: newUser.email, role: newUser.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// OTP store for password reset
// const resetOtpStore = {}; // { email: { otp, expires } }

// // Send OTP for password reset
// router.post("/forgot-password/send-otp", async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ success: false, message: "Email required" });

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ success: false, message: "Email not registered" });

//   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//   const expires = Date.now() + 5 * 60 * 1000; // 5 min
//   resetOtpStore[email] = { otp, expires };

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
//     });

//     res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Email sending failed" });
//   }
// });

// // Verify OTP & Reset Password
// router.post("/forgot-password/verify-otp", async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: "All fields required" });

//   const record = resetOtpStore[email];
//   if (!record || record.otp.toString() !== otp || record.expires < Date.now()) {
//     return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//   }

//   const passwordHash = await bcrypt.hash(newPassword, 10);
//   await User.updateOne({ email }, { $set: { passwordHash } });

//   delete resetOtpStore[email]; // Remove OTP after reset
//   res.json({ success: true, message: "Password reset successful" });
// });









// ================== NORMAL USER SIGNUP ==================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      role: "buyer"
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ success: true, token, user: { username: newUser.username, email: newUser.email, role: newUser.role } });

  } catch(err){
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ================== LOGING ==================

router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "Provide email/phone and password" });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Login successful: send token + user info
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
