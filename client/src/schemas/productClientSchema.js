import z from 'zod';
import { productZodSchema } from '@shared';

const productClientSchema = productZodSchema.extend({
  productImages: z.array(z.any()).min(1, 'At least one image is required'),
  productPrice: z.coerce.number().nonnegative(),
  stock: z.coerce.number().nonnegative().default(0)
});

export default productClientSchema;
