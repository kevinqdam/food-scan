import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ScannerResult from './components/ScannerResult';

const App: React.FC = function () {
  const [ isScanning, setIsScanning ] = useState(false);
  const [ barcodeLike, setBarcodeLike ] = useState('');

  return (
    <div className="flex flex-col">
      <h1 className="text-center">
        FoodScan
      </h1>
      <button
        onClick={() => setIsScanning(!isScanning)}
        className={['border-black', 'border-2', (isScanning ? 'hover:bg-red-400' : 'hover:bg-green-400')].join(' ')}>
          {isScanning ? 'Stop' : 'Scan'}
      </button>
      {isScanning
        && <Scanner
          setIsScanning={setIsScanning}
          setBarcodeLike={setBarcodeLike}
        />}
      {!isScanning && barcodeLike && <ScannerResult barcodeLike={barcodeLike} />}
    </div>
  );
};

export default App;
