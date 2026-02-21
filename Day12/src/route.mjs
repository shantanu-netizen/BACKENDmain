import express from "express";
const router = express.Router();
import {
  addProduct,
  getProductById,
  getProducts,
} from "./controllers/productController.mjs";
router.get("/", (req, res) => {
  return res.send("Welcome to the API");
});
router.post("/products", addProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
export default router;
