type QuaggaData = {
  codeResult?: {
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
    decodedCodes?: {
      error?: number;
      code: number;
      start: number;
      end: number;
    }[];
  };
  line?: {
    x: number;
    y: number;
  }[];
  angle?: number;
  pattern?: number[];
  box?: number[][];
  boxes?: number[][][];
};

export default QuaggaData;
