import React, { useState } from 'react';
import ScannerContainer from './components/ScannerContainer';

const App: React.FC = function () {
  return (
    <div className='flex flex-col items-center space-y-6'>
      <h1 className='text-center text-7xl'>FoodScan</h1>
      <ScannerContainer />
    </div>
  );
};

export default App;
