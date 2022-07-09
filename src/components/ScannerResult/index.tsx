import { match } from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';
import { ValidationError } from 'io-ts';
import React from 'react';
import { Barcode, BarcodeCodec } from '../../domain/barcode';
import ScannerFailure from '../ScannerFailure';
import ScannerSuccess from '../ScannerSuccess';

type ScannerResultProps = {
  barcodeLike: string;
};

const onFailure = (errors: Array<ValidationError>): { errors: (string | undefined)[]; barcode: Barcode | null } =>
  ({ errors: errors.map((error) => error.message), barcode: null });
const onSuccess = (barcode: Barcode): { errors: (string | undefined)[]; barcode: Barcode | null } =>
  ({ errors: [], barcode });

const decodeBarcodeLike = flow(BarcodeCodec.decode, match(onFailure, onSuccess));

const ScannerResult = function (props: ScannerResultProps) {
  const { barcodeLike } = props;

  const { errors, barcode } = decodeBarcodeLike(barcodeLike)
  
  return (
    (errors.length > 0)
    ? <ScannerFailure errors={errors} />
    : <ScannerSuccess barcode={barcode!}/>
  );
};

export default ScannerResult;
