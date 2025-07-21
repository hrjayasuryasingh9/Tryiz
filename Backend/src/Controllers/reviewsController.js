import prisma from "../../prisma/prismaclient.js";
import * as reviewServices from "../Services/reviewServices.js";

const addReview = async (req, res) => {
  try {
    const { stars, review } = req.body;
    const uid = Number(req.body.uid);
    const pid = Number(req.body.pid);

    if (!uid || !pid || !stars || !review) {
      res
        .status(400)
        .json({ messsage: "please give all the required details" });
      return;
    }
    const ReviewData = await reviewServices.addReview(uid, pid, stars, review);
    res
      .status(200)
      .json({ message: "the Review added successfully ", data: ReviewData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const reviews = await reviewServices.getReviews(pid);
    res.status(200).json({ data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editReview = async (req, res) => {
  try {
    const rid = Number(req.params.rid);
    const uid = req.user.id;
    const { stars, review } = req.body; // Get updated review details

    // Fetch the review details
    const existingReview = await reviewServices.getReviewdetails(rid);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (uid !== existingReview.user_id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this review" });
    }

    const updatedReview = await reviewServices.editReview(rid, stars, review);

    res.status(200).json({
      message: "Review updated successfully",
      updatedReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const rid = Number(req.params.rid);
    const uid = req.user.id;

    const existingReview = await reviewServices.getReviewdetails(rid);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (uid !== existingReview.user_id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this review" });
    }
    const deletedReview = await reviewServices.deleteReview(rid);

    res.status(200).json({
      message: "The Review Deleted Successfully",
      data: deletedReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addReview, getReviews, editReview, deleteReview };
