const scannerConfig = {
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
}

export default scannerConfig
