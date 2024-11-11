import { z } from 'zod';

export const FilterSchema = z
  .object({
    type: z.string().min(3),
  })
  .partial();

export type Filter = z.infer<typeof FilterSchema>;
