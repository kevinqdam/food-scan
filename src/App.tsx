import React, { useState } from 'react';
import Scanner from './components/Scanner';
import ScannerResult from './components/ScannerResult';

const App: React.FC = function () {
  const [ isScanning, setIsScanning ] = useState(false); 
  const [ barcodeLike, setBarcodeLike ] = useState('');

  return (
    <>
      <button
        onClick={() => setIsScanning(!isScanning)}
        className='border-black border-2 hover:bg-green-400'>
          Click me
      </button>
      {isScanning
        && <Scanner
          setIsScanning={setIsScanning}
          setBarcodeLike={setBarcodeLike}
        />}
      {!isScanning && barcodeLike && <ScannerResult barcodeLike={barcodeLike} />}
    </>
  );
};

export default App;
