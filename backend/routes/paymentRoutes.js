import express from "express";
import OrderModel from "../models/paymentmodel.js";
import ProductModel from "../models/productmodel.js";
import uploadOnCloudinary from "../utils/cloudinary.js"; 
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// @desc Get product by ID for payment
// @route GET /api/payment/:id
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

// @desc Create an order after payment
// @route POST /api/payment
router.post("/", async (req, res) => {
  try {
    const { email, ...rest } = req.body;

    const order = new OrderModel({
      ...rest,
      email,
    });

    const savedOrder = await order.save();

    // === Send mail if email provided ===
    if (email) {
      await sendMail({
        to: email,
        subject: "Order Confirmation - YourMart",
        html: `<h2>Thank you for your payment!</h2>
               <p>Your order for <b>${rest.productName}</b> has been received.</p>
               <p>We will process it soon.</p>`,
      });
    }

    // === Send mail to admin always ===
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received - YourMart",
      html: `<h2>New Order Alert</h2>
             <p><b>Product:</b> ${rest.productName}</p>
             <p><b>Customer Email:</b> ${email || "Not Provided"}</p>
             <p><b>Amount:</b> ₹${rest.productPrice}</p>
             <p><b>TXNID:</b> ${rest.txnid}</p>
             <p><b>Payer's Name:</b> ${rest.payerName}</p>`
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order", error });
  }
});


export default router;
