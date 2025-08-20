const { z } = require("zod");

const variantZodSchema = z.object({
  type: z.enum(["color", "size"]),
  options: z.array(z.string()),
});

const productZodSchema = z.object({
  productImages: z.array(z.url()),
  productName: z.string().min(2).max(100),
  productSpecification: z.object({
    brand: z.string().min(2).optional(),
    weight: z
      .object({
        value: z.number(),
        unit: z.enum(["g", "kg", "lb"]),
      })
      .optional(),
    material: z.array(z.string().min(2)).optional(),
    origin: z.string().min(2).optional(),
    warranty: z.string().min(2).optional(),
  }),
  productDescription: z.string().min(10).max(1000),
  productCategory: z.array(z.string().min(2)),
  variants: z.array(variantZodSchema).optional().default([]),
  productPrice: z.number().positive(),
  stock: z.number().nonnegative().default(0),
  reviews: z
    .array(
      z.object({
        user: z.string(),
        rating: z.number().min(0).max(5).optional(),
        comment: z.string().min(2).max(1000).optional(),
      })
    )
    .optional()
    .default([]),
});

const productIdZodSchema = z.object({
  id: z.string(),
});

const queryParamZodSchema = z.object({
  search: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  minPrice: z.coerce().number().min(0).optional(),
  maxPrice: z.coerce().number().min(0).optional(),
  limit: z.coerce().int().positive().optional(),
  page: z.coerce().int().positive().optional(),
});

module.exports = {
  productZodSchema,
  productIdZodSchema,
  queryParamZodSchema,
};
