import express from "express";
const router = express.Router();
import * as reviewsController from "../Controllers/reviewsController.js";
import * as userMiddleware from "../Middleware/userMiddleware.js";

router.post(
  "/addreview",
  userMiddleware.protectRoute,
  reviewsController.addReview
);
router.get(
  "/getreviews/:pid",
  userMiddleware.protectRoute,
  reviewsController.getReviews
);
router.patch(
  "/editreview/:rid",
  userMiddleware.protectRoute,
  reviewsController.editReview
);

router.delete(
  "/deletereview/:rid",
  userMiddleware.protectRoute,
  reviewsController.deleteReview
)
export default router;
