import * as productServices from "../Services/productServices.js";

const getProducts = async (req, res) => {
  try {
    const products = await productServices.getproducts();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Servber error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, images, description, price, category } = req.body;

    if (!name || !images || !description || !price || !category) {
      res.status(400).json({ message: "please provide all the details" });
      return;
    }
    const product = await productServices.addProduct(
      name,
      images,
      description,
      price,
      category
    );
    res
      .status(200)
      .json({ message: "products added successfully", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const pid = Number(req.params.id);
  try {
    const product = await productServices.deleteProduct(pid);
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductImage = async (req, res) => {
  const iid = Number(req.params.id);
  try {
    const image = await productServices.deleteProductImage(iid);
    res.status(200).json({ message: "image deleted successfully", image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, category, images } = req.body;

    const updatedProduct = await productServices.updateProduct(
      id,
      name,
      description,
      price,
      category,
      images
    );
    res.status(200).json({message: "The product is updated successfully", data : updatedProduct});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  getProducts,
  addProduct,
  deleteProduct,
  deleteProductImage,
  editProduct,
};
