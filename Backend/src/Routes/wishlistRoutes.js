import express from "express";
import * as userMiddleware from "../Middleware/userMiddleware.js";
import * as wishlistController from "../Controllers/wishlistController.js"

const router = express.Router();

router.post("/addtowishlist",userMiddleware.protectRoute,wishlistController.addToWishlist)
router.get("/getwishlistitems",userMiddleware.protectRoute,wishlistController.getWishlistItems)
router.delete("/deletewishlistitem/:id",userMiddleware.protectRoute,wishlistController.deletefromWishlist)
router.get("/getwishlistcount",userMiddleware.protectRoute,wishlistController.getWishlistCount)

export default router;
