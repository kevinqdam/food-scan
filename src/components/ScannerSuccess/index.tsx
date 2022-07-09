import React, { useState } from 'react';
import { Barcode, BarcodeCodec } from '../../domain/barcode';
import OpenFoodResult from '../OpenFoodResult';
import { OpenFoodApiPayload } from '../OpenFoodResult/types';

type ScannerSuccessProps = {
  barcode: Barcode;
}

const API_ENDPOINT = 'https://world.openfoodfacts.org/api/v2/product';

const ScannerSuccess = function (props: ScannerSuccessProps) {
  const { barcode } = props;

  const [ apiPayload, setApiPayload ]  = useState();

  const fetchFactsForBarcode = async function (barcode: Barcode) {
    const barcodeString = BarcodeCodec.encode(barcode);
    const response = await fetch(`${API_ENDPOINT}/${barcodeString}`);
    const payload = await response.json();
    setApiPayload(payload);
  };

  fetchFactsForBarcode(barcode);

  return (
    <div>
      {!apiPayload && <div>Looking up barcode: <b>{BarcodeCodec.encode(barcode)}</b>...</div>}
      {apiPayload && <OpenFoodResult apiPayload={apiPayload} />}
    </div>
  )
};

export default ScannerSuccess;
