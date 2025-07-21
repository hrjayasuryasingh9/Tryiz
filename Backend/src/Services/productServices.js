import prisma from "../../prisma/prismaclient.js";

const getproducts = async () => {
  const products = await prisma.products.findMany({
    include: {
      images: {
        select: {
          id: true,
          image_url: true,
        },
      },
    },
  });

  return products;
};

const addProduct = async (name, images, description, price, category) => {
  const product = await prisma.products.create({
    data: {
      name: name,
      description: description,
      price: price,
      category: category,
      images: {
        create: images.map((imageUrl) => ({
          image_url: imageUrl,
        })),
      },
    },
    include: {
      images: {
        select: {
          id: true,
          image_url: true,
        },
      }, // This ensures the returned object includes images
    },
  });
  return product;
};

const deleteProduct = async (pid) => {
  const product = await prisma.products.delete({
    where: { id: pid }, // Replace productId with the actual ID
  });
  return product;
};
const deleteProductImage = async (iid) => {
  const image = await prisma.images.delete({
    where: { id: iid },
  });
  return image;
};

const updateProduct = async (
  id,
  name,
  description,
  price,
  category,
  images
) => {
  const updatedProduct = await prisma.products.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      price,
      category,
    },
    include: { images: true },
  });

  if (images && images.length > 0) {
    await prisma.images.deleteMany({
      where: { pid: Number(id) },
    });

    await prisma.images.createMany({
      data: images.map((imageUrl) => ({
        pid: updatedProduct.id,
        image_url: imageUrl,
      })),
    });
  }

  return updatedProduct;
};
export {
  getproducts,
  addProduct,
  deleteProduct,
  deleteProductImage,
  updateProduct,
};
