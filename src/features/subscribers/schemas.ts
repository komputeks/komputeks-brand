import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().default('landing'),
});