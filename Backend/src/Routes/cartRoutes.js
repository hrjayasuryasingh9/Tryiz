import express from "express";
import * as userMiddleware from "../Middleware/userMiddleware.js";
const router = express.Router();
import * as cartController from "../Controllers/cartController.js";

router.post(
  "/addcartitem",
  userMiddleware.protectRoute,
  cartController.addCartItem
);

router.get(
  "/getcartitems",
  userMiddleware.protectRoute,
  cartController.getCartItems
);

router.delete(
  "/deletecartitem/:id",
  userMiddleware.protectRoute,
  cartController.deleteCartItem
);

router.patch(
  "/updatecartitem/:id",
  userMiddleware.protectRoute,
  cartController.updateCartItem
);

router.get(
  "/getcartcount",
  userMiddleware.protectRoute,
  cartController.getCartCount
);

export default router;
