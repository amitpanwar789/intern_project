import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsbyCategory,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router();
//import { checkAuth } from "../middleware/authMiddleware.js";

//router.route("/").post(createProduct);
router.route("/category/:categoryId").get(getProductsbyCategory);

router
  .route("/:id")
  .get(getProductById)
  //.delete(checkAuth, deleteProduct)
  //.put(checkAuth, updateProduct);

export default router;
