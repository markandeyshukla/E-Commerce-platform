import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String }, // later token se
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Cart", cartSchema);
