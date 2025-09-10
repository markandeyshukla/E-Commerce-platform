import express from "express";
import ProductModel from "../models/productmodel.js";
import { authMiddleware } from "../middleware/auth.js";
import Cloudinary from "../utils/cloudinary.js"; // 👈 fixed import

const router = express.Router();

// @desc Create new product
// @route POST /api/products
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can create products" });
    }

    const product = new ProductModel({
      ...req.body,       // imgUrl already frontend se aa raha hai
      sellerId: req.user._id,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
});

// ✅ GET seller's products
router.get("/seller", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied" });
    }

    const products = await ProductModel.find({ sellerId: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller products", error });
  }
});

// @desc Get all products
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// @desc Search products
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await ProductModel.find({
      $or: [
        { brandName: { $regex: q, $options: "i" } },
        { productName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { color: { $regex: q, $options: "i" } },
        { material: { $regex: q, $options: "i" } },
        { keywords: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
});

// @desc Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// @desc Update product
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "seller" || product.sellerId.toString() !== req.user._id) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    let imgUrl = product.imgUrl; // default purana image
    if (req.body.imgUrl) {
      const uploaded = await uploadOnCloudinary(req.body.imgUrl);
      imgUrl = uploaded?.secure_url || imgUrl;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imgUrl },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// @desc Delete product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "seller" || product.sellerId.toString() !== req.user._id) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
