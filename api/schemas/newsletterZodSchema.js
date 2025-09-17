import { z } from "zod";

export const newsletterSubscribeZodSchema = z.object({
  email: z.string().email(),
});
