import notificationService from "../services/notificationService.js";
import {
  notificationQueryZodSchema,
  updateNotificationZodSchema,
  markAllAsReadZodSchema,
} from "../schemas/notificationZodSchema.js";
import { z } from "zod";

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const parsed = await notificationQueryZodSchema.parseAsync(req.query);

    const result = await notificationService.getUserNotifications(userId, {
      type: parsed.type,
      isRead: parsed.isRead,
      page: parsed.page,
      limit: parsed.limit,
    });

    res.status(200).json({
      message: "Notifications retrieved successfully",
      data: result.notifications,
      pagination: {
        total: result.total,
        page: parsed.page,
        limit: parsed.limit,
        totalPages: Math.ceil(result.total / parsed.limit),
        hasMore: result.hasMore,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Failed to retrieve notifications",
      error: error.message,
    });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);

    res.status(200).json({
      message: "Unread count retrieved successfully",
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get unread count",
      error: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const parsed = await updateNotificationZodSchema.parseAsync(req.body);

    if (parsed.isRead === false) {
      return res.status(400).json({
        message: "Cannot mark notification as unread",
      });
    }

    const notification = await notificationService.markAsRead(id, userId);

    res.status(200).json({
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: error.errors,
      });
    }
    res.status(400).json({
      message: error.message,
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const parsed = await markAllAsReadZodSchema.parseAsync(req.body);

    const result = await notificationService.markAllAsRead(userId, parsed.type);

    res.status(200).json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await notificationService.deleteNotification(id, userId);

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
