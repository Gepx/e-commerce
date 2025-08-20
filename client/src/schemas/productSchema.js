const { z } = require('zod');

const variantSchema = z.object({
  type: z.enum(['color', 'size']),
  options: z.array(z.string())
});

const productSchema = z.object({
  productImages: z.array(z.url()),
  productName: z.string().min(2).max(100),
  productSpecification: z.object({
    brand: z.string().min(2).optional(),
    weight: z
      .object({
        value: z.number(),
        unit: z.enum(['g', 'kg', 'lb'])
      })
      .optional(),
    material: z.array(z.string().min(2)).optional(),
    origin: z.string().min(2).optional(),
    warranty: z.string().min(2).optional()
  }),
  productDescription: z.string().min(10).max(1000),
  productCategory: z.array(z.string().min(2)),
  variants: z.array(variantSchema).optional().default([]),
  productPrice: z.number().positive(),
  stock: z.number().nonnegative().default(0),
  reviews: z
    .array(
      z.object({
        user: z.string(),
        rating: z.number().min(0).max(5).optional(),
        comment: z.string().min(2).max(1000).optional()
      })
    )
    .optional()
    .default([])
});

const productIdSchema = z.object({
  id: z.string()
});

module.exports = {
  productSchema,
  productIdSchema
};
