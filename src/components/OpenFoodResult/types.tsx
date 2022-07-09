import { z } from 'zod';

export const OpenFoodApiPayloadParser = z.object({
  code: z.string(),
  product: z.object({
    ingredients_analysis_tags: z.array(z.string()),
    product_name: z.string(),
  }).optional(),
  status: z.number(),
  status_verbose: z.string(),
});

export type OpenFoodApiPayload = z.infer<typeof OpenFoodApiPayloadParser>;
