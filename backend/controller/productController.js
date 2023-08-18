import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch products by category
// @route   GET /api/products/:categoryId
// @access  Public
const getProductsbyCategory = AsyncHandler(async (req, res) => {
  const category = req.params.categoryId;
  const categoryCheck = ["Mobiles", "Electronics", "Books"].includes(category);
  if (categoryCheck === false) {
    res.json({ message: "category not available" });
  }
  const products = await Product.find({ category }).select(
    "-createdAt -updatedAt -__v -category"
  );
  if (products) {
    res.json(products);
  } else {
    res.json({ message: "No item found" });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/user
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/user
const createProduct = AsyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = new Product({
    name: name,
    price: price,
    image: image,
    brand: brand,
    category: category,
    countInStock: countInStock,
    description: description,
  });
  
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/user
const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsbyCategory,
};
