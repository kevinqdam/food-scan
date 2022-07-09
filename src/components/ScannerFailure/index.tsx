import React from 'react';

type ScannerFailureProps = {
  errors: (string | undefined)[];
};

const ScannerFailure = function (props: ScannerFailureProps) {
  const { errors } = props;

  return (
    <div>
      <div>The scanner failed to parse the barcode</div>
      <ul>
        {errors.filter((error) => (error !== null || error !== undefined))}
      </ul>
    </div>
  )
};

export default ScannerFailure;
