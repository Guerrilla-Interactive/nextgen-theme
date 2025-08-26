import { groq } from "next-sanity";

// @sanity-typegen-ignore
const testimonialsBlockQuery = groq`
  _type == "testimonials-block" => {
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
    items[]{
      rating,
      quote,
      initials,
      name,
      role,
      bgColor,
    }
  }
`;

export default testimonialsBlockQuery;
