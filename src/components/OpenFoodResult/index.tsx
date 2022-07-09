import React from 'react';
import { OpenFoodApiPayload } from './types';

type OpenFoodResultProps = {
  apiPayload: OpenFoodApiPayload;
};

const OpenFoodResult = function (props: OpenFoodResultProps) {
  const { apiPayload } = props;

  return (
    ((apiPayload.status === 0)
      ? <div>Product not found for code: <b>{apiPayload.code}</b></div>
      : <div>
        {apiPayload!.product!.product_name}
        <div>{JSON.stringify(apiPayload.product!.ingredients_analysis_tags, null, 4)}</div>
      </div>
    )
  )
};

export default OpenFoodResult;
