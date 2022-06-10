import React, { useEffect } from 'react';
const Quagga = require('quagga');

const Scanner = function () {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      function(err: string) {
        if (err) {
          console.log(err);

          return;
        }
        Quagga.start()
      },
    );
    Quagga.onDetected(console.log);
  }, []);

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
