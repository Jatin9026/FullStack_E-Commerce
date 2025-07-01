import express from "express";
import { getkey, paymentVerification, processPayment } from "../controllers/payment.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/razorpay", processPayment);
router.get("/getkey", getkey);
router.post("/paymentverification", requireSignIn, paymentVerification);

export default router;
