require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const AuthRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const AddressRoutes = require("./routes/addressRoutes");
const { authLimiter, limiter } = require("./utils/rateLimiter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

app.use(limiter);
app.use("/api/auth", authLimiter);
app.use(morgan("dev"));

connectDB();

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/user/addresses", AddressRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Oops! Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
