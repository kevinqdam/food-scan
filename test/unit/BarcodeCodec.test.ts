import { match } from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';
import { ValidationError } from 'io-ts';
import { BarcodeCodec, Barcode } from '../../src/domain/barcode';

const returnErrors = (errors: Array<ValidationError>) => errors.map((error: ValidationError) => error.message).join(', ');
const returnEncoding = (barcode: Barcode) => BarcodeCodec.encode(barcode);
const decodeInput = flow(BarcodeCodec.decode, match(returnErrors, returnEncoding));

test('Decodes invalid barcodes to wrapped errors', () => {
  expect(decodeInput(null)).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${null}`);
  expect(decodeInput(undefined)).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${undefined}`);
  expect(decodeInput(123)).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${123}`);
  expect(decodeInput('abcd')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'abcd'}`);
  expect(decodeInput('abcdefghij')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'abcdefghij'}`);
  expect(decodeInput('abcdefghijklmnopqrstuvwxyz')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'abcdefghijklmnopqrstuvwxyz'}`);
  expect(decodeInput('1234')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'1234'}`);
  expect(decodeInput('1234567890123')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'1234567890123'}`);
  expect(decodeInput('123abc')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'123abc'}`);
  expect(decodeInput('a1b2c3d4')).toBe(`Barcode value must be a numeric string (length from 6 through 12 characters), got: ${'a1b2c3d4'}`);
});

test('Decodes valid barcodes to its literal string representation', () => {
  expect(decodeInput('123456')).toBe('123456');
  expect(decodeInput('1234567')).toBe('1234567');
  expect(decodeInput('123456789')).toBe('123456789');
  expect(decodeInput('1234567890')).toBe('1234567890');
  expect(decodeInput('12345678901')).toBe('12345678901');
  expect(decodeInput('123456789012')).toBe('123456789012');
});
