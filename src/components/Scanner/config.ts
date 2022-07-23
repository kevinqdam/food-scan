import { z } from 'zod';

export const SCANNER_WIDTH = 640;
export const SCANNER_HEIGHT = 480;

type Reader = 'code_128_reader'
  | 'ean_reader'
  | 'ean_8_reader'
  | 'code_39_reader'
  | 'code_39_vin_reader'
  | 'codabar_reader'
  | 'upc_reader'
  | 'upc_e_reader'
  | 'i20f5_reader'
  | '2of5_reader'
  | 'code_93_reader';

type PatchSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

type ScannerConfig = {
  numOfWorkers: number;
  locate: boolean;
  inputStream: {
    type: 'ImageStream' | 'VideoStream' | 'LiveStream';
    constraints: {
      width: number;
      height: number;
      facingMode: 'environment';
      deviceId?: string;
    },
    area?: {
      top: string;
      right: string;
      left: string;
      bottom: string;
    }
    singleChannel?: false;
  };
  frequency: number;
  decoder: {
    readers: Reader[];
    debug?: {
      drawBoundingBox?: boolean;
      showFrequency?: boolean;
      drawScanline?: boolean;
      showPattern?: boolean;
    };
    multiple: boolean;
  };
  locator: {
    halfSample: boolean;
    patchSize: PatchSize;
    debug?: {
      showCanvas?: boolean;
      showPatches?: false;
      showFoundPatches?: false;
      showSkeleton?: boolean;
      showLabels?: boolean;
      showPatchLabels?: boolean;
      showRemainingPatchLabels?: boolean;
      boxFromPatches?: {
        showTransformed?: boolean;
        showTransformedBox?: boolean;
        showBB?: boolean;
      }
    }
  };
  debug?: boolean;
};

export const scannerConfig: ScannerConfig = {
  numOfWorkers: 4,
  locate: true,
  inputStream: {
    type: 'LiveStream',
    constraints: {
      width: 640,
      height: 480,
      facingMode: 'environment', // or user
    },
  },
  frequency: 10,
  decoder: {
    readers: ['upc_reader'] as Reader[],
    debug: {
      drawBoundingBox: true,
      drawScanline: true,
    },
    multiple: false,
  },
  locator: {
    halfSample: true,
    patchSize: 'medium',
  },
}
