import express from "express";
const router = express.Router();
import * as productsContoller from "../Controllers/productsContoller.js";

router.get("/getproducts", productsContoller.getProducts);
router.get("/getproduct/:id", productsContoller.getProduct);
router.post("/addproduct", productsContoller.addProduct);
router.delete("/deleteproduct/:id", productsContoller.deleteProduct);
router.delete("/deleteproductimage/:id", productsContoller.deleteProductImage);
router.patch("/editproduct/:id", productsContoller.editProduct);

export default router;
