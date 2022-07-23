import React, { useState } from 'react';
import Scanner from '../Scanner';
import { SCANNER_HEIGHT, SCANNER_WIDTH } from '../Scanner/config';
import ScannerResult from '../ScannerResult';

const scannerViewportStyle = { height: SCANNER_HEIGHT, width: SCANNER_WIDTH };

const ScannerContainer = function () {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeLike, setBarcodeLike] = useState('');

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        className="flex flex-col items-center"
        style={scannerViewportStyle}
      >
        {isScanning && (
          <div className="absolute block z-10">
            <Scanner
              setIsScanning={setIsScanning}
              setBarcodeLike={setBarcodeLike}
            />
          </div>
        )}
        <div
          style={{ height: SCANNER_HEIGHT, width: SCANNER_WIDTH }}
          className="absolute block bg-black z-0"
        ></div>
      </div>
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
      {!isScanning && barcodeLike && (
        <ScannerResult barcodeLike={barcodeLike} />
      )}
    </div>
  );
};

export default ScannerContainer;
