import React, { useState } from 'react';
import { Barcode, BarcodeParser } from '../../domain/barcode';
import OpenFoodResult from '../OpenFoodResult';
import { OpenFoodApiPayloadParser } from '../OpenFoodResult/types';

type ScannerSuccessProps = {
  barcode: Barcode;
}

const API_ENDPOINT = 'https://world.openfoodfacts.org/api/v2/product';

const ScannerSuccess = function (props: ScannerSuccessProps) {
  const { barcode } = props;

  const [ apiPayload, setApiPayload ]  = useState(null);

  const fetchFactsForBarcode = async function (barcode: Barcode) {
    const barcodeString = barcode;
    const response = await fetch(`${API_ENDPOINT}/${barcodeString}`);
    const payload = await response.json();
    if (OpenFoodApiPayloadParser.safeParse(payload).success) {
      setApiPayload(payload);
    }
  };

  fetchFactsForBarcode(barcode);

  return (
    <div>
      {!apiPayload && <div>Looking up barcode: <b>{barcode}</b>...</div>}
      {apiPayload && <OpenFoodResult apiPayload={apiPayload} />}
    </div>
  )
};

export default ScannerSuccess;
