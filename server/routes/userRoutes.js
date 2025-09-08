import express from "express";
import verifyToken from "../middleware/auth/authMiddleware.js";
import UserController from "../controllers/userController.js";
import authorizeRoles from "../middleware/auth/roleMiddleware.js";
import upload from "../config/multer.js";
import { userCacheMiddleware } from "../middleware/cache/cacheMiddleware.js";

const router = express.Router();

router.get(
  "/",
  userCacheMiddleware,
  verifyToken,
  authorizeRoles("admin"),
  UserController.getUserController
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  UserController.updateUserController
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  UserController.deleteUserController
);
router.get(
  "/:userId",
  userCacheMiddleware,
  verifyToken,
  UserController.getUserProfileController
);

// avatar
router.put(
  "/:id/avatar",
  verifyToken,
  upload.single("avatar"),
  UserController.updateAvatarController
);
router.delete(
  "/:id/avatar",
  verifyToken,
  UserController.removeAvatarController
);

export default router;
