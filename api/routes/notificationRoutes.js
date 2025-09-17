import express from "express";
import notificationController from "../controllers/notificationController.js";
import auth from "../middleware/auth/authMiddleware.js";

const router = express.Router();
router.use(auth);
router.get("/", notificationController.getNotifications);
router.get("/unread-count", notificationController.getUnreadCount);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/mark-all-read", notificationController.markAllAsRead);
router.delete("/:id", notificationController.deleteNotification);

export default router;
