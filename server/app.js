import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";

import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";
import AddressRoutes from "./routes/addressRoutes.js";
import CartRoutes from "./routes/cartRoutes.js";
import WishlistRoutes from "./routes/wishlistRoutes.js";
import TransactionRoutes from "./routes/transactionRoutes.js";
import NotificationRoutes from "./routes/notificationRoutes.js";
import NewsletterRoutes from "./routes/newsletterRoutes.js";
import { limiter } from "./utils/rateLimiter.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

app.use(limiter);
app.use(morgan("dev"));

connectDB();
connectRedis();

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/user/addresses", AddressRoutes);
app.use("/api/user/cart", CartRoutes);
app.use("/api/user/wishlist", WishlistRoutes);
app.use("/api/user/transactions", TransactionRoutes);
app.use("/api/user/notifications", NotificationRoutes);
app.use("/api/newsletter", NewsletterRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Oops! Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
