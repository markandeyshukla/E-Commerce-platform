import express from "express";
import Cart from "../models/cartModel.js";
import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

// ✅ Get cart items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.user._id })
      .populate("productId", "productName price imgUrl");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", err });
  }
});


// ✅ Add product to cart
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "ProductId required" });

    const exist = await Cart.findOne({ productId, userId: req.user._id });
    if (exist) {
      exist.quantity += 1;
      const updated = await exist.save();
      return res.status(200).json(updated);
    }

    const newItem = new Cart({ productId, userId: req.user._id });
    const saved = await newItem.save();
    const populated = await saved.populate("productId", "productName price imgUrl");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", err });
  }
});


// ✅ Remove product from cart
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ productId: req.params.productId, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Cart item not found" });
    res.status(200).json({ message: "Removed from cart", deleted });
  } catch (err) {
    res.status(500).json({ message: "Error removing from cart", err });
  }
});


// ✅ Update quantity
router.put("/:productId", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    const updated = await Cart.findOneAndUpdate(
      { productId: req.params.productId, userId: req.user._id },
      { quantity },
      { new: true }
    ).populate("productId", "productName price imgUrl");
    if (!updated) return res.status(404).json({ message: "Cart item not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity", err });
  }
});

export default router;
