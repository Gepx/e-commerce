import { z } from "zod";

const transactionZodSchema = z.object({
  orderId: z.string(),
  totalAmount: z.number(),
  status: z.enum([
    "pending",
    "settlement",
    "capture",
    "challenge",
    "deny",
    "cancel",
    "refund",
    "expired",
  ]),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
  shippingAddress: z.string(),
});

const transactionIdZodSchema = z.object({
  id: z.string(),
});

const transactionQueryParamZodSchema = z.object({
  orderId: z.string().optional(),
  status: z.string().optional(),
  limit: z.coerce.number().positive().max(100).default(10),
  page: z.coerce.number().positive().default(1),
});

export {
  transactionZodSchema,
  transactionIdZodSchema,
  transactionQueryParamZodSchema,
};
