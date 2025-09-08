import express from "express";
import AddressController from "../controllers/addressController.js";
import verifyToken from "../middleware/auth/authMiddleware.js";
import { addressCacheMiddleware } from "../middleware/cache/cacheMiddleware.js";

const router = express.Router();

router.get(
  "/",
  addressCacheMiddleware,
  verifyToken,
  AddressController.getUserAddresses
);
router.post("/", verifyToken, AddressController.addUserAddress);
router.put("/:id", verifyToken, AddressController.updateUserAddress);
router.delete("/:id", verifyToken, AddressController.deleteUserAddress);

export default router;
