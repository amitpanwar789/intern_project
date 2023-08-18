import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/catergoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { rateLimit } from "express-rate-limit";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

// Apply rate limiter to all routes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(express.json());
app.use(limiter);
app.set('trust proxy', true);
app.use("/api/category", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is runnning");
});
