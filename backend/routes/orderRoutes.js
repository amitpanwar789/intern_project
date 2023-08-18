import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controller/orderController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

router.route("/").post(checkAuth, addOrderItems).get(checkAuth,getMyOrders);
router.route('/:orderId').get(checkAuth, getOrderById)
router.route("/:id/pay").put(checkAuth, updateOrderToPaid);
router.route('/:id/deliver').put(checkAuth, updateOrderToDelivered)

export default router;
