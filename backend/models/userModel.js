import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    match: /^[0-9]{10}$/,
    unique: true,
    sparse:true,
    default: undefined
  },
  altPhone: {
    type: String,
    match: /^[0-9]{10}$/,
    default: null
  },
  panCard: {
    type: String,
    uppercase: true
  },
  gstin: {
    type: String,
    default: ""
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String,
    default: ""
  },
  state: { type: String },
  city: { type: String},
  pincode: {
    type: String,
    match: /^[0-9]{6}$/,
    default: null
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
    uppercase: true
  },
  accountHolderName: {
    type: String,
    
  },
  fileUrl: {
    type: String, // yaha hum file ka Cloudinary / S3 URL store karenge
    
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer"
  },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
