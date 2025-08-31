const { z } = require("zod");
const mongoose = require("mongoose");

const cartItemZodSchema = z.object({
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
  quantity: z.number().min(1),
  selectedVariants: z.record(z.string()).default({}),
});

module.exports = cartItemZodSchema;
