import Notification from "../models/notificationModel.js";
import cacheService from "./cacheService.js";

class NotificationService {
  async createNotification({ recipient, type, title, message, metadata = {} }) {
    try {
      const notification = new Notification({
        recipient,
        type,
        title,
        message,
        metadata,
      });

      await notification.save();

      await this.clearUserNotificationCache(recipient);

      return notification;
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  async createWelcomeNotification(userId, username) {
    return this.createNotification({
      recipient: userId,
      type: "welcome",
      title: "Welcome to Our Store! 🎉",
      message: `Hi ${username}! Congratulations on creating your account. Start exploring our amazing products and enjoy your shopping experience!`,
      metadata: {
        isWelcome: true,
      },
    });
  }

  async createPurchaseNotification(userId, orderId, totalAmount, itemCount) {
    return this.createNotification({
      recipient: userId,
      type: "purchase",
      title: "Order Confirmed! 🛒",
      message: `Your order #${orderId} has been successfully processed. Total: $${totalAmount.toFixed(
        2
      )} for ${itemCount} item(s). Thank you for your purchase!`,
      metadata: {
        orderId,
        totalAmount,
        itemCount,
      },
    });
  }

  async getUserNotifications(userId, { type, isRead, page = 1, limit = 10 }) {
    try {
      const cacheKey = `notifications:${userId}:${JSON.stringify({
        type,
        isRead,
        page,
        limit,
      })}`;
      const cachedResult = await cacheService.get(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      const filter = {
        recipient: userId,
        deletedAt: null,
      };

      if (type) filter.type = type;
      if (isRead !== undefined) filter.isRead = isRead;

      const skip = (page - 1) * limit;

      const [notifications, total] = await Promise.all([
        Notification.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Notification.countDocuments(filter),
      ]);

      const result = {
        notifications,
        total,
        hasMore: total > skip + notifications.length,
      };

      await cacheService.set(cacheKey, result, 300);

      return result;
    } catch (error) {
      throw new Error(`Failed to get notifications: ${error.message}`);
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId, deletedAt: null },
        { isRead: true },
        { new: true }
      );

      if (!notification) {
        throw new Error("Notification not found");
      }

      await this.clearUserNotificationCache(userId);

      return notification;
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }

  async markAllAsRead(userId, type = null) {
    try {
      const filter = { recipient: userId, deletedAt: null, isRead: false };
      if (type) filter.type = type;

      const result = await Notification.updateMany(filter, { isRead: true });

      await this.clearUserNotificationCache(userId);

      return { modifiedCount: result.modifiedCount };
    } catch (error) {
      throw new Error(
        `Failed to mark all notifications as read: ${error.message}`
      );
    }
  }

  async getUnreadCount(userId) {
    try {
      const cacheKey = `notifications:unread_count:${userId}`;
      const cachedCount = await cacheService.get(cacheKey);
      if (cachedCount !== null) {
        return cachedCount;
      }

      const count = await Notification.countDocuments({
        recipient: userId,
        isRead: false,
        deletedAt: null,
      });

      await cacheService.set(cacheKey, count, 120);

      return count;
    } catch (error) {
      throw new Error(`Failed to get unread count: ${error.message}`);
    }
  }

  async deleteNotification(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, recipient: userId, deletedAt: null },
        { deletedAt: new Date() },
        { new: true }
      );

      if (!notification) {
        throw new Error("Notification not found");
      }

      await this.clearUserNotificationCache(userId);

      return notification;
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }

  async clearUserNotificationCache(userId) {
    try {
      await cacheService.clearPattern(`notifications:${userId}:*`);
      await cacheService.delete(`notifications:unread_count:${userId}`);
    } catch (error) {
      console.warn("Failed to clear notification cache:", error.message);
    }
  }
}

export default new NotificationService();
