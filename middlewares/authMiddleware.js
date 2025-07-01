import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }

    // Check if header starts with Bearer
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use Bearer token"
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing"
      });
    }

   
    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
  
    // Get user from database
    const user = await userModel.findById(decoded._id).select("-password");
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    console.log(" User found:", user.name);
    req.user = user;
    next();
    
  } catch (error) {
    console.error(" Auth middleware error:", error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message
    });
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }
    
    console.log("Admin access granted:", req.user.name);
    next();
  } catch (error) {
    console.error("❌ Admin middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Admin check failed",
      error: error.message
    });
  }
};