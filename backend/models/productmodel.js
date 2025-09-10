// models/productmodel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String, // example: "M", "L", "XL" or "40x60 cm"
      required: false,
    },
    ages: {
      type: String, // example: "3-5 years", "18+"
      required: false,
    },
    material: {
      type: String,
      required: false,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    assemble: {
      type: String, // "Yes / No / Self / Pre-assembled"
      required: false,
    },
    warranty: {
      type: String, // example: "1 Year", "6 Months"
      required: false,
    },
    returnDays: {
      type: Number, // number of days
      required: false,
      default: 7,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
