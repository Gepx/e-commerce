import { z } from "zod";

export const createNotificationZodSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  type: z.enum(["welcome", "purchase", "system", "promotion"], {
    errorMap: () => ({ message: "Invalid notification type" }),
  }),
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message too long"),
  metadata: z.object({}).optional(),
});

export const updateNotificationZodSchema = z.object({
  isRead: z.boolean().optional(),
});

export const notificationQueryZodSchema = z.object({
  type: z.enum(["welcome", "purchase", "system", "promotion"]).optional(),
  isRead: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => {
      if (typeof val === "string") {
        return val.toLowerCase() === "true";
      }
      return val;
    }),
  page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});

export const markAllAsReadZodSchema = z.object({
  type: z.enum(["welcome", "purchase", "system", "promotion"]).optional(),
});
