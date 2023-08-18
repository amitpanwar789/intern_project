import AsyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

//@desc get Cart Details of user
//@route GET /api/cart/
//@access Private/user

const getCartDetails = AsyncHandler(async (req, res) => {
  const user = req.user._id;
  let userCart = await Cart.findOne({ user });
  if (userCart === null || userCart.cartItems?.length == 0) {
    res.json({ message: "Cart is Empty" });
  } else {
    res.json(userCart);
  }
});

//@desc  add item to cart
//@route POST /api/cart/
//@access Private/user

const addToCart = AsyncHandler(async (req, res) => {
  const user = req.user._id;
  let userCart = await Cart.findOne({ user });
  if (userCart === null) {
    userCart = new Cart({
      user: user,
    });
  }
  const { qty, productId } = req.body;
  const product = await Product.findById(productId);

  if (product === null) {
    res.status(404).json({ message: "Product not found" });
  }
  // check for duplicate product
  const duplicate_check = userCart.cartItems.filter((item) => {
    if (item.product.toString() === productId) return true;
    else return false;
  });
  if (duplicate_check.length > 0) {
    await updateCart(req, res);
    return;
  }
  const validQty = qty > product.countInStock ? product.countInStock : qty;
  const item = {
    name: product.name,
    price: product.price,
    qty: validQty,
    product: productId,
  };
  userCart.cartItems.push(item);
  userCart.totalPrice += product.price * qty;
  const updatedCart = await userCart.save();
  res.status(201).json(updatedCart);
});

//@desc  update quantity of a product
//@route PUT /api/cart/
//@access Private/user

const updateCart = AsyncHandler(async (req, res) => {
  const { productId, qty } = req.body;
  const user = req.user._id;
  let userCart = await Cart.findOne({ user });
  if (userCart == null) {
    userCart = new Cart({
      user: user,
    });
  }
  const check = userCart.cartItems.filter((prod) => {
    if (prod.product == productId) return true;
    else return false;
  });
  const product = await Product.findById(productId);
  if (product === null) {
    res.json({ message: "Error Product not valid" });
  }
  const validQty = qty > product.countInStock ? product.countInStock : qty;
  if (check.length == 0) {
    userCart.cartItems.push({
      name: product.name,
      price: product.price,
      product: productId,
      qty: validQty,
    });
    userCart.totalPrice += validQty * product.price;
  } else {
    const updatedCart = userCart.cartItems.map((item) => {
      if (item.product.toString() === productId) {
        userCart.totalPrice =
          userCart.totalPrice + (validQty - item.qty) * product.price;
        item.qty = validQty;
      }
      return item;
    });
    userCart.cartItems = updatedCart;
  }

  const newCart = await userCart.save();
  res.json(newCart);
});

//@desc  remove item for cart
//@route DELETE /api/cart/
//@access Private/user
const deleteCartItems = AsyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = req.user._id;
  const userCart = await Cart.findOne({ user });
  if (userCart === null) {
    res.json({ message: "item does not exist in cart" });
  }
  const product = await Product.findById(productId);
  if (product === null) {
    res.status(404).json({ message: "product not found" });
  }
  userCart.totalPrice = 0;
  const updatedCart = userCart.cartItems.filter((item) => {
    if (item.product.toString() !== productId) {
      userCart.totalPrice += item.qty * item.price;
      return true;
    } else return false;
  });
  userCart.cartItems = updatedCart;
  const newCart = await userCart.save();
  res.json(newCart);
});

export { getCartDetails, addToCart, updateCart, deleteCartItems };
