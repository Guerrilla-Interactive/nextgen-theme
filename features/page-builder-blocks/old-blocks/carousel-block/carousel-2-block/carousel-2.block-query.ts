import { groq } from "next-sanity";
import { getAllReferencedTestimonialsQuery } from "@/sanity/desk-organized-sanity-utilities/testimonial/testimonial.document-queries";

// @sanity-typegen-ignore
const carousel2BlockQuery = groq`
  _type == "carousel-2-block" => {
    _type,
    padding,
    colorVariant,
    ${getAllReferencedTestimonialsQuery},
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
      rating,
    }
`;

export default carousel2BlockQuery; 