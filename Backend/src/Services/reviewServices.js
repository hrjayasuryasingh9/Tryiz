import prisma from "../../prisma/prismaclient.js";

const addReview = async (uid, pid, stars, review) => {
  const reviewData = await prisma.reviews.create({
    data: {
      user_id: uid,
      product_id: pid,
      stars: stars,
      review: review,
    },
  });

  return reviewData;
};

const getReviews = async (pid) => {
  const reviews = await prisma.reviews.findMany({
    where: { product_id: pid },
    select: {
      id: true,
      stars: true,
      review: true,
      created_at: true,
      users: {
        select: {
          name: true,
          profile_pic: true,
        },
      },
    },
    orderBy: { created_at: "desc" }, // Sort by latest reviews
  });
  console.log(reviews);
  return reviews;
};

const getReviewdetails = async (rid) => {
  const review = await prisma.reviews.findUnique({
    where: {
      id: rid,
    },
  });
  return review;
};

const editReview = async (rid, stars, review) => {
  const updatedReview = await prisma.reviews.update({
    where: { id: rid },
    data: {
      stars,
      review,
      created_at: new Date(),
    },
  });
  return updatedReview;
};

const deleteReview = async (rid) => {
  const review = await prisma.reviews.delete({
    where: {
      id: rid,
    },
  });
  return review;
};
export { addReview, getReviews, getReviewdetails, editReview, deleteReview };
