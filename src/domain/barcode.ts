import { z } from 'zod';

const nonEmptyNumericStringPattern: RegExp = /^[0-9]+$/;

export const BarcodeParser = z.string()
  .min(6)
  .max(12)
  .regex(nonEmptyNumericStringPattern, { message: `Barcode value must be a numeric string (length from 6 through 12 characters)`  });

export type Barcode = z.infer<typeof BarcodeParser>;
