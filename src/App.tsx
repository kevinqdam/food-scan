import React, { useState } from 'react';
import Scanner from './components/Scanner';
import { SCANNER_HEIGHT, SCANNER_WIDTH } from './components/Scanner/config';
import ScannerResult from './components/ScannerResult';

const App: React.FC = function () {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeLike, setBarcodeLike] = useState('');

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-7xl">
        FoodScan
      </h1>
      {(isScanning
        && <Scanner
          setIsScanning={setIsScanning}
          setBarcodeLike={setBarcodeLike}
        />) || <div style={{
          height: SCANNER_HEIGHT,
          width: SCANNER_WIDTH,
        }} className={[
          'block',
          'bg-black',
        ].join(' ')}>tests</div>}
      <button
        onClick={() => setIsScanning(!isScanning)}
        className={[
            'border-black',
            'border-2',
            (isScanning ? 'hover:bg-red-400' : 'hover:bg-green-400'),
            'rounded',
            'px-2',
            'py-1',
          ].join(' ')}>
        {isScanning ? 'Stop' : 'Scan'}
      </button>
      {!isScanning && barcodeLike && <ScannerResult barcodeLike={barcodeLike} />}
    </div>
  );
};

export default App;
