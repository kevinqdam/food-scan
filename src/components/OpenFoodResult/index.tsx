import React from 'react';
import { PRODUCT_NOT_FOUND } from './constants';
import { OpenFoodApiPayload } from './types';

type OpenFoodResultProps = {
  apiPayload: OpenFoodApiPayload;
};

const OpenFoodResult = function (props: OpenFoodResultProps) {
  const { apiPayload } = props;

  return (
    (((apiPayload.status === PRODUCT_NOT_FOUND) || (!apiPayload.product))
      ? <div>
          Product not found for code: <b>{apiPayload.code}</b>
        </div>
      : <div>
          <h2>{apiPayload!.product!.product_name}</h2>
          <h3>Ingredients:</h3>
          {((!apiPayload!.product!.ingredients)
          ? <div>No ingredient data to display</div>
          : <ul>
              {apiPayload.product!.ingredients.map((ingredient, i) => <li key={`ing_${i}`}>{JSON.stringify(ingredient, null, 4)}</li>)}
            </ul>)}
          <ul>
            {apiPayload.product!.ingredients_analysis_tags!.map((ingredientAnalysisTag, i) => <li key={`iat_${i}`}>{ingredientAnalysisTag}</li>)}
          </ul>
        </div>
    )
  )
};

export default OpenFoodResult;
