import * as t from 'io-ts';
import { withMessage } from 'io-ts-types';

type BarcodeBrand = {
  readonly Barcode: unique symbol
}

const nonEmptyNumericStringPattern: RegExp = /^[0-9]+$/;

const BarcodeCodec: t.BrandC<t.StringC, BarcodeBrand> = withMessage(
  t.brand(
    t.string,
    (s: string): s is t.Branded<string, BarcodeBrand> => (
      (s.length >= 6) && (s.length <= 12) && nonEmptyNumericStringPattern.test(s)
    ),
    'Barcode',
  ),
  (input) => `Barcode value must be a numeric string (length from 6 through 12 characters), got: ${input}`,
);

type Barcode = t.TypeOf<typeof BarcodeCodec>;

export { BarcodeCodec, Barcode };
