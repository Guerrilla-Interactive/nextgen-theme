import { groq } from "next-sanity";

// @sanity-typegen-ignore
const heroBlockQuery = groq`
  _type == "hero-block" => {
    _type,
    badge,
    title,
    highlight,
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
    links[]{
      title,
      href,
      target,
      buttonVariant,
      size
    },
    bullets,
  }
`;

export default heroBlockQuery;
