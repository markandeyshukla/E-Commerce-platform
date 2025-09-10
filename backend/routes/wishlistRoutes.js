import express from "express";
import Wishlist from "../models/wishlistModel.js";
import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

// ✅ GET wishlist with populated product
router.get("/", authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.find().populate("productId", "productName price imgUrl");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", err });
  }
});

// ✅ ADD product to wishlist
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body; // <-- frontend se body.productId aana chahiye

    if (!productId) return res.status(400).json({ message: "ProductId required" });

    // check duplicate
    const exist = await Wishlist.findOne({ productId });
    if (exist) return res.status(400).json({ message: "Already in wishlist" });

    const newItem = new Wishlist({ productId });
    const savedItem = await newItem.save();

    // populate before returning
    const populatedItem = await savedItem.populate("productId", "productName price imgUrl");

    res.status(201).json(populatedItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist", err });
  }
});

// ✅ REMOVE product from wishlist
// ✅ REMOVE product from wishlist (by productId)
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({ productId: req.params.productId });
    if (!deleted) return res.status(404).json({ message: "Wishlist item not found" });

    res.status(200).json({ message: "Removed from wishlist", deleted });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist", err });
  }
});


export default router;
