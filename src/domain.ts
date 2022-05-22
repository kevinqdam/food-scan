import * as t from 'io-ts';
import { withMessage } from 'io-ts-types';

type NonEmptyNumericString6To12Brand = {
  readonly NonEmptyNumericString6To12: unique symbol
}

const nonEmptyNumericStringPattern = /[0-9]+/;
const NonEmptyNumericString6To12Codec = t.brand(
  t.string,
  (s: string): s is t.Branded<string, NonEmptyNumericString6To12Brand> => (
    (s.length >= 6) && (s.length <= 12) && nonEmptyNumericStringPattern.test(s)
  ),
  'NonEmptyNumericString6To12',
);

const BarcodeCodec = withMessage(
  NonEmptyNumericString6To12Codec,
  (input) => `Barcode value must be a string (size between 6 and 12 characters), got: ${input}`,
);

type Barcode = t.TypeOf<typeof BarcodeCodec>;

export { BarcodeCodec, Barcode };
