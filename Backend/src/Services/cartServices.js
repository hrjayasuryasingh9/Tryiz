import prisma from "../../prisma/prismaclient.js";

const addCartItem = async (uid, pid, quantity) => {
  const item = await prisma.cart.create({
    data: {
      uid: uid,
      pid: pid,
      quantity: quantity,
    },
  });
  return item;
};

const getCartItems = async (uid) => {
  const item = await prisma.cart.findMany({
    where: { uid: uid },
    orderBy: { added_at: "desc" },
    select: {
      id: true,
      added_at: true,
      quantity: true,
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

const deleteCartItem = async (id) => {
  const item = await prisma.cart.delete({
    where: {
      id: id,
    },
  });
  return item;
};

const updateCartItem = async (uid, id, quantity) => {
  const updated = await prisma.cart.update({
    where: {
      id: id,
      uid: uid,
    },
    data: {
      quantity: quantity,
    },
  });
  return updated;
};

const getCartCount = async (uid) => {
  const count = await prisma.cart.count({
    where: {
      uid: uid,
    },
  });
  console.log(count)
  return count;
};

export {
  addCartItem,
  getCartItems,
  deleteCartItem,
  updateCartItem,
  getCartCount,
};
