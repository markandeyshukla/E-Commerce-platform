// backend/routes/upload.js
import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage folder

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products", // Cloudinary folder
    });

    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({ imgUrl: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: "Image upload failed", error: err });
  }
});

export default router;
