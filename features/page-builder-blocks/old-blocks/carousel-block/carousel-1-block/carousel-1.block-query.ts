import { groq } from "next-sanity";

// @sanity-typegen-ignore
const carousel1BlockQuery = groq`
  _type == "carousel-1-block" => {
    _type,
    padding,
    colorVariant,
    size,
    orientation,
    indicators,
    images[]{
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
      },
      alt
    }
  }
`;

export default carousel1BlockQuery; 