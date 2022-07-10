import React, { useState } from 'react';
import { Barcode } from '../../domain/barcode';
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
    const response = await fetch(`${API_ENDPOINT}/${barcode}`);
    const payload = await response.json();
    setApiPayload(payload);
  };

  if (!apiPayload) {
    fetchFactsForBarcode(barcode);
  }

  return (
    <div>
      {!apiPayload && <div>Looking up barcode: <b>{barcode}</b>...</div>}
      {apiPayload && OpenFoodApiPayloadParser.safeParse(apiPayload).success && <OpenFoodResult apiPayload={apiPayload} />}
      {apiPayload && !OpenFoodApiPayloadParser.safeParse(apiPayload).success && <div>{JSON.stringify(OpenFoodApiPayloadParser.safeParse(apiPayload))}</div>}
    </div>
  )
};

export default ScannerSuccess;
