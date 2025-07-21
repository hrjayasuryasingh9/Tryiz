import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import wishlistRoutes from "./Routes/wishlistRoutes.js";
const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","https://tryiz.vercel.app"],
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

export default app;
