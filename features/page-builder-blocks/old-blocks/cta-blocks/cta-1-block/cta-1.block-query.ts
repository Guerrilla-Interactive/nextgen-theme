import { groq } from "next-sanity";

// @sanity-typegen-ignore
const cta1BlockQuery = groq`
  _type == "cta-1-block" => {
    _type,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
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

export default cta1BlockQuery; 