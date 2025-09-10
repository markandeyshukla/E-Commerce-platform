import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  userName: { type: String, required: true },
    email: { type: String },
  userPhone: { type: String, required: true },
  altPhone: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  txnid: { type: String, required: true },
  payerName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
