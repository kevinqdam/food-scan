import { z } from 'zod';

export const OpenFoodApiPayloadParser = z.object({
  code: z.string(),
  product: z.object({
    ingredients: z.array(z.object({
      id: z.string().optional(),
      percent_estimate: z.number().min(0).max(100).optional(),
      percent_max: z.number().min(0).max(100).optional(),
      percent_min: z.number().min(0).max(100).optional(),
      text: z.string(),
      vegan: z.literal('yes').or(z.literal('maybe')).or(z.literal('no')).optional(),
    })).optional(),
    ingredients_analysis_tags: z.array(z.string()).optional(),
    product_name: z.string(),
  }).optional(),
  status: z.number(),
  status_verbose: z.string(),
});

export type OpenFoodApiPayload = z.infer<typeof OpenFoodApiPayloadParser>;
