import React, { Dispatch, SetStateAction, useState } from 'react';
import Scanner from './Scanner';

const App: React.FC = function () {
  const [ isScanning, setIsScanning ]: [boolean, any] = useState(false); 

  return (
    <>
      <button onClick={() => setIsScanning(!isScanning)} className='border-black border-2 hover:bg-green-400'>Click me</button>
      {isScanning && <Scanner />}
    </>
  );
};

export default App;
