import { groq } from "next-sanity";
import splitCardsListBlockQuery from "../split-cards-list-block/split-cards-list.block-query";
import splitContentBlockQuery from "../split-content-block/split-content.block-query";
import splitImageBlockQuery from "../split-image-block/split-image.block-query";
import splitInfoListBlockQuery from "../split-info-list-block/split-info-list.block-query";

// @sanity-typegen-ignore
const splitRowBlockQuery = groq`
  _type == "split-row-block" => {
    _type,
    padding,
    colorVariant,
    noGap,
    splitColumns[]{
      ${splitContentBlockQuery},
      ${splitCardsListBlockQuery},
      ${splitImageBlockQuery},
      ${splitInfoListBlockQuery},
    },
  }
`;

export default splitRowBlockQuery; 