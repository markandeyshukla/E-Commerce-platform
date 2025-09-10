
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

    // Upload file to Cloudinary if provided
    let fileUrl = "";
    if (req.file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = Cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const uploaded = await streamUpload(req.file.buffer);
      fileUrl = uploaded.secure_url;
    }

    const newUser = new User({
      email,
      username,
      passwordHash, // <-- Make sure schema expects this field
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

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




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
