import React, { useEffect } from 'react';
import './scanner.css';
const Quagga = require('quagga');

type QuaggaData = {
  codeResult: {
    code: string;
    format: string;
    start: number;
    end: number;
    codeset: number;
    startInfo: {
      error: number;
      code: number;
      start: number;
      end: number;
    };
    decodedCodes: {
      error?: number;
      code: number;
      start: number;
      end: number;
    }[];
  };
  line: {
    x: number;
    y: number;
  }[];
  angle: number;
  pattern: number[];
  box: number[][];
  boxes: number[][][];
};

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
          readers: ['upc_reader'],
        },
        drawBoundingBox: true,
        locate: true,
      },
      function(err: string) {
        if (err) {
          console.log(`ERROR: ${err}`);

          return;
        }
        Quagga.start();
      },
    );
    Quagga.onProcessed((result: QuaggaData) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (!result) return;

      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width"), 10), parseInt(drawingCanvas.getAttribute("height"), 10));
        result.boxes.filter(function (box: unknown) {
            return box !== result.box;
        }).forEach(function (box: unknown) {
            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
        });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
      }
      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
      }
      if (result.codeResult) {
        console.log(result); 
      }
    });
    Quagga.onDetected((data: string) => console.log(data));
  }, []);

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
