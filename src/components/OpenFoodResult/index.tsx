import React from 'react';
import { OpenFoodApiPayload } from './types';

type OpenFoodResultProps = {
  apiPayload: OpenFoodApiPayload;
};

const OpenFoodResult = function (props: OpenFoodResultProps) {
  const {
    apiPayload: {
      code,
      product: {
        product_name: productName,
        ingredients_analysis_tags: ingredientsAnalysisTags,
      }
    }
  } = props;

  return (
    <div>
      {productName}
      <div>{JSON.stringify(ingredientsAnalysisTags, null, 4)}</div>
    </div>
  )
};

export default OpenFoodResult;
