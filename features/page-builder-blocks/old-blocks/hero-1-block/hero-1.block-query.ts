import { groq } from "next-sanity";

// @sanity-typegen-ignore
const hero1BlockQuery = groq`
  _type == "hero-1-block" => {
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
    image{
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
    },
    imagePosition,
    links,
  }
`;

export default hero1BlockQuery; 