import { groq } from "next-sanity";

// @sanity-typegen-ignore
const featuresBlockQuery = groq`
  _type == "features-block" => {
    _type,
    layoutVariant,
    cardStyle,
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
    cards[]{
      title,
      body,
      stat,
      icon,
      color,
    }
  }
`;

export default featuresBlockQuery;
