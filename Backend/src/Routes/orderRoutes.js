import express from "express";
import * as orderController from "../Controllers/orderController.js";
import * as userMiddleware from "../Middleware/userMiddleware.js";// make sure you have auth middleware

const router = express.Router();

// Protected routes
router.post("/create", userMiddleware.protectRoute, orderController.checkout);
router.post("/update-payment", userMiddleware.protectRoute, orderController.updatePayment);

// Get all orders of logged-in user
router.get("/", userMiddleware.protectRoute, orderController.getOrders);

// Get order by ID
router.get("/:id", userMiddleware.protectRoute, orderController.getOrderById);

export default router;