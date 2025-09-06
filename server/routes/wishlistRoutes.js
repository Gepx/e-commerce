import express from "express";
import wishlistController from "../controllers/wishlistController.js";
import verifyToken from "../middleware/auth/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, wishlistController.getUserWishList);
router.post("/", verifyToken, wishlistController.addItemToWishlist);
router.delete("/", verifyToken, wishlistController.removeItemFromWishlist);

export default router;
