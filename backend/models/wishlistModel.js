import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String }, // optional, baad me JWT se laa sakte
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Wishlist", wishlistSchema);
