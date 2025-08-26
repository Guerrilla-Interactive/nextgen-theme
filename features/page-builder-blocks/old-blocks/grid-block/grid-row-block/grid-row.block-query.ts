import { groq } from "next-sanity";
// Update paths for the queries based on your reorg

import pricingCardBlockQuery from "../pricing-card-block/pricing-card.block-query";
import gridPostBlockQuery from "../grid-post-block/grid-post.block-query";
import gridCardBlockQuery from "../grid-card-block/grid-card.block-query";

// @sanity-typegen-ignore
const gridRowBlockQuery = groq`
  _type == "grid-row-block" => {
    _type,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardBlockQuery},
      ${pricingCardBlockQuery},
      ${gridPostBlockQuery},
    },
  }
`;

export default gridRowBlockQuery; 