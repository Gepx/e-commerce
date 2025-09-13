import express from "express";
import verifyToken from "../middleware/auth/authMiddleware.js";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", verifyToken, cartController.getUserCart);
router.post("/", verifyToken, cartController.addItemToCart);
router.put("/", verifyToken, cartController.updateCartItem);
router.delete("/", verifyToken, cartController.removeCartItem);

export default router;
