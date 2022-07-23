import React, { useState } from 'react';
import Scanner from '../Scanner';
import { SCANNER_HEIGHT, SCANNER_WIDTH } from '../Scanner/config';
import ScannerResult from '../ScannerResult';

const ScannerContainer = function () {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeLike, setBarcodeLike] = useState('');

  return (
    <>
      {(isScanning && (
        <Scanner
          setIsScanning={setIsScanning}
          setBarcodeLike={setBarcodeLike}
        />
      )) || (
        <div
          style={{ height: SCANNER_HEIGHT, width: SCANNER_WIDTH }}
          className='block bg-black'
        >
          tests
        </div>
      )}
      <button
        onClick={() => setIsScanning(!isScanning)}
        className={[
          'border-black',
          'border-2',
          isScanning ? 'hover:bg-red-400' : 'hover:bg-green-400',
          'rounded',
          'px-2',
          'py-1',
        ].join(' ')}
      >
        {isScanning ? 'Stop' : 'Scan'}
      </button>
      {!isScanning && barcodeLike && <ScannerResult barcodeLike={barcodeLike} />}
    </>
  );
};

export default ScannerContainer;
