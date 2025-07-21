import prisma from "../../prisma/prismaclient.js";

const addToWishlist = async (uid, pid) => {
  const item = await prisma.wishlist.create({
    data: {
      uid: uid,
      pid: pid,
    },
    select: {
      id: true,
      added_at: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true,
          images: {
            select: {
              image_url: true,
            },
            take: 1,
          },
        },
      },
    },
  });
  return item;
};

const getWishlistItems = async (uid) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { uid: uid },
    orderBy: { added_at: "desc" },
    select: {
      id: true,
      added_at: true,
      products: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          category: true,
          images: {
            select: {
              image_url: true,
            },
            take: 1,
          },
        },
      },
    },
  });
  return wishlist;
};

const deletefromWishlist = async (id) => {
  const item = await prisma.wishlist.delete({
    where: {
      id: id,
    },
  });
  return item;
};

const getWishlistCount = async (uid) => {
  const count = await prisma.wishlist.count({
    where: {
      uid: uid,
    },
  });
  return count;
};
export {
  addToWishlist,
  getWishlistItems,
  deletefromWishlist,
  getWishlistCount,
};
