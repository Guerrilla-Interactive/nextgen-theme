import { groq } from "next-sanity";

// @sanity-typegen-ignore
const statsSectionBlockQuery = groq`
  _type == "stats-section-block" => {
    _type,
    title,
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
    items[]{
      value,
      label,
    }
  }
`;

export default statsSectionBlockQuery;
