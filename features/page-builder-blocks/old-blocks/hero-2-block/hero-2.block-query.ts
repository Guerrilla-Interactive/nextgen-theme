import { groq } from "next-sanity";

// @sanity-typegen-ignore
const hero2BlockQuery = groq`
  _type == "hero-2-block" => {
    _type,
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
    links,
  }
`;

export default hero2BlockQuery; 