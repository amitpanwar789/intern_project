import AsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = AsyncHandler(async (req, res) => {
  const user = req.user._id;
  const { shippingAddress } = req.body;
  if (user === null) {
    res.status(400).json({ message: "Unexpected Error" });
  }

  const userCart = await Cart.findOne({ user });
  if (userCart === null || userCart.cartItems === null) {
    res.status(404).json({ message: "User Cart is Empty" });
  }

  const newOrder = new Order({
    orderItems: userCart.cartItems,
    user,
    shippingAddress,
    totalPrice: userCart.totalPrice,
  });
  const createdOrder = await newOrder.save();
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order not found");
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = User.findById(req.user._id);
  const {status, id, email_address, } = req.body;
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: id,
      status: status,
      update_time: Date.now(),
      email_address: email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});


export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
};
