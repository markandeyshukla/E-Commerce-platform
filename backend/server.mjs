
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./Mongodbconnect.mjs";
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import uploadRoutes from "./routes/upload.js";
import supportroutes from "./routes/supportroutes.js";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from './routes/otpRoutes.js';


connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.use("/api/products", productRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/support",supportroutes)
app.use("/api/user", userRoutes)
app.use("/api/forgot-password", otpRoutes)
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("YourMart backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
