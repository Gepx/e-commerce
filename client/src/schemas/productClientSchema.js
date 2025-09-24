import { z } from 'zod';

const variantZodSchema = z.object({
  type: z.enum(['color', 'size']),
  options: z.array(z.string())
});

const variationZodSchema = z.object({
  attributes: z.record(z.string()),
  stock: z.number().nonnegative().default(0),
  price: z.number().nonnegative().optional(),
  image: z.string().optional()
});

const baseProductSchema = z.object({
  productImages: z.array(z.any()).min(1, 'At least one image is required'),
  productName: z.string().min(2).max(100),
  productSpecification: z.object({
    brand: z.string().optional(),
    weight: z
      .object({
        value: z.number(),
        unit: z.enum(['g', 'kg', 'lb'])
      })
      .optional(),
    material: z.string().optional(),
    origin: z.string().optional(),
    warranty: z.string().optional()
  }),
  productDescription: z.string().min(10),
  productCategory: z.array(z.string()).min(1, 'At least one product category is required.'),
  variants: z.array(variantZodSchema).optional().default([]),
  variations: z.array(variationZodSchema).optional().default([]),
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

const productClientSchema = baseProductSchema;

export default productClientSchema;
