import experss from "express";
import { addToCart, deleteCartItems, getCartDetails, updateCart } from "../controller/cartController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = experss.Router();

router
  .route("/")
  .get(checkAuth, getCartDetails)
  .post(checkAuth, addToCart)
  .put(checkAuth, updateCart)
  .delete(checkAuth, deleteCartItems);

export default router;