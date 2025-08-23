import { z } from 'zod';

export const variantSchema = z.object({
  type: z.enum(['color', 'size']),
  options: z.array(z.string())
});

export const productSchema = z.object({
  productImages: z.array(z.any()).min(1, 'At least one image is required'),
  productName: z.string().min(2).max(100),
  productSpecification: z.object({
    brand: z.string().optional(),
    weight: z
      .object({
        value: z.coerce.number(),
        unit: z.enum(['g', 'kg', 'lb'])
      })
      .optional(),
    material: z.string().optional(),
    origin: z.string().optional(),
    warranty: z.string().optional()
  }),
  productDescription: z.string().min(10),
  productCategory: z.array(z.string()).min(1, 'Select at least one category'),
  variants: z.array(variantSchema).optional().default([]),
  productPrice: z.coerce.number().nonnegative(),
  stock: z.coerce.number().nonnegative().default(0),
  reviews: z
    .array(
      z.object({
        user: z.string(),
        rating: z.coerce.number().min(0).max(5).optional(),
        comment: z.string().min(2).max(1000).optional()
      })
    )
    .optional()
    .default([])
});

export const productIdSchema = z.object({
  id: z.string()
});
