import { groq } from "next-sanity";

// @sanity-typegen-ignore
const splitContentBlockQuery = groq`
  _type == "split-content-block" => {
    _type,
    sticky,
    padding,
    colorVariant,
    tagLine,
    title,
    body[]{
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
    link,
  }
`;

export default splitContentBlockQuery; 