import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController, 
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// Test routes
router.get("/test", requireSignIn, isAdmin, testController);

// Protected User route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update profile
router.put("/profile", requireSignIn, updateProfileController);

// Orders - User
router.get("/orders", requireSignIn, getOrdersController);

// Orders - Admin
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Order status update - Admin
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

//  All Users - Admin
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

export default router;
