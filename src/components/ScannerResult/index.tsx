import React from 'react';
import { ZodError } from 'zod';
import { BarcodeParser } from '../../domain/barcode';
import ScannerSuccess from '../ScannerSuccess';

type ScannerResultProps = {
  barcodeLike: string;
};

const getErrorMessages = function (errors: ZodError) {
  return errors.issues
    .map((issues) => issues.message)
    .filter((message) => message !== null && message !== undefined);
};

const ScannerResult = function (props: ScannerResultProps) {
  const { barcodeLike } = props;

  const parseResult = BarcodeParser.safeParse(barcodeLike);

  return !parseResult.success ? (
    <div>
      <div>The scanner failed to parse the barcode</div>
      <ul>{getErrorMessages(parseResult.error)}</ul>
    </div>
  ) : (
    <ScannerSuccess barcode={parseResult.data} />
  );
};

export default ScannerResult;
