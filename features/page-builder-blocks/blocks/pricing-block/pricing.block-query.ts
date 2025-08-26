import { groq } from "next-sanity";

// @sanity-typegen-ignore
const pricingBlockQuery = groq`
  _type == "pricing-block" => {
    _type,
    heading,
    description[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    plans[]{
      name,
      price,
      priceSuffix,
      mostPopular,
      button{ title, variant },
      features,
    },
    footerNotes,
  }
`;

export default pricingBlockQuery;
