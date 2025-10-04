import express from "express";
import * as userController from "../Controllers/userController.js";
import * as userMiddleware from "../Middleware/userMiddleware.js";
const router = express.Router();

router.post("/signup", userController.signUpUser);
router.get("/verify", userController.getVerified);
router.post("/login", userController.userLogin);
router.get("/logout", userController.userLogout);
router.get("/check", userMiddleware.protectRoute, userController.checkAuth);
router.get("/getuser", userMiddleware.protectRoute, userController.getUserDetails);
router.put("/update", userMiddleware.protectRoute, userController.updateUserController);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/changepassword", userController.changePassword);

export default router;
