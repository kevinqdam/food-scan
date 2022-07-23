import React from 'react';
import { BarcodeParser } from '../../domain/barcode';
import ScannerFailure from '../ScannerFailure';
import ScannerSuccess from '../ScannerSuccess';

type ScannerResultProps = {
  barcodeLike: string;
};

const ScannerResult = function (props: ScannerResultProps) {
  const { barcodeLike } = props;

  const parseResult = BarcodeParser.safeParse(barcodeLike);

  return !parseResult.success ? (
    <ScannerFailure
      errors={parseResult.error.issues.map((issue) => issue.message)}
    />
  ) : (
    <ScannerSuccess barcode={parseResult.data} />
  );
};

export default ScannerResult;
