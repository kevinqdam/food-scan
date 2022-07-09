import * as React from 'react';
import { useEffect } from 'react';
import type QuaggaData from './types/QuaggaData';
import './styles.scss';
import scannerConfig from './config';

const Quagga = require('quagga');

const clearCanvas = function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, parseInt(canvas.getAttribute("width")!, 10), parseInt(canvas.getAttribute("height")!, 10));
};

const drawGreenBoxesAroundCodeLikes = (data: QuaggaData, ctx: CanvasRenderingContext2D) => {
  data.boxes!.filter(function (box: number[][]) {
    return box !== data.box;
  }).forEach(function (box: number[][]) {
    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, ctx, { color: "green", lineWidth: 2 });
  });
};

const drawRedLineThroughCode = (data: QuaggaData, ctx: CanvasRenderingContext2D) => {
  Quagga.ImageDebug.drawPath(data.line, { x: 'x', y: 'y' }, ctx, { color: 'red', lineWidth: 3 });
};

type ScannerProps = {
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  setBarcodeLike: React.Dispatch<React.SetStateAction<string>>;
};

const Scanner = function (props: ScannerProps) {
  const { setIsScanning, setBarcodeLike } = props;

  useEffect(() => {
    Quagga.init(
      scannerConfig,
      function (err: string) {
        if (err) {
          console.log(`ERROR: ${err}`);

          return;
        }
        Quagga.start();
      },
    );
    Quagga.onProcessed((data: QuaggaData) => {
      if (!data || !data.boxes) return;

      const drawingCtx: CanvasRenderingContext2D = Quagga.canvas.ctx.overlay;
      const drawingCanvas: HTMLCanvasElement = Quagga.canvas.dom.overlay;
      clearCanvas(drawingCtx, drawingCanvas);
      drawGreenBoxesAroundCodeLikes(data, drawingCtx);
    });
    Quagga.onDetected((data: QuaggaData) => {
      if (!data?.codeResult?.code) return;

      const drawingCtx: CanvasRenderingContext2D = Quagga.canvas.ctx.overlay;
      drawRedLineThroughCode(data, drawingCtx);
      setBarcodeLike(data.codeResult.code);
      Quagga.stop();
      setIsScanning(false);
    });
  }, []);

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
