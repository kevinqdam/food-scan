export type OpenFoodApiPayload = {
  code: string;
  product: {
    ingredients_analysis_tags: string[];
    product_name: string;
  },
  status: number;
  status_verbose: string;
}
