import { instance } from "../server.js";
import orderModel from "../models/orderModel.js";
import crypto from "crypto";

// 🔄 Razorpay Order Creation
export const processPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid amount" 
      });
    }

    const order = await instance.orders.create({
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });


    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Payment Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Payment order creation failed",
      error: error.message 
    });
  }
};

// 🔑 Return Razorpay Public Key
export const getkey = (req, res) => {
  try {
    if (!process.env.RAZORPAY_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: "Razorpay API key not configured" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      key: process.env.RAZORPAY_API_KEY 
    });
  } catch (error) {
    console.error("❌ Get Key Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get API key" 
    });
  }
};

// ✅ Verify Signature & Save Order
export const paymentVerification = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      cart 
    } = req.body;
    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing payment verification data" 
      });
    }

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty or invalid" 
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    // Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    ("🔐 Signature verification:", {
      expected: expectedSignature,
      received: razorpay_signature,
      match: expectedSignature === razorpay_signature
    });

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid payment signature" 
      });
    }

    // Create order in database
    const orderData = {
      products: cart.map((item) => item._id),
      payment: {
        success: true,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      buyer: req.user._id,
      status: "Processing"
    };

   

    const order = await orderModel.create(orderData);
    
    // Populate the order to verify it was saved correctly
    const populatedOrder = await orderModel
      .findById(order._id)
      .populate("products")
      .populate("buyer", "name email");

    
    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      reference: razorpay_payment_id,
      orderId: order._id,
      order: populatedOrder
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Payment verification failed",
      error: error.message 
    });
  }
};