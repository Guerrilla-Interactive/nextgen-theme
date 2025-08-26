import { groq } from "next-sanity";

// @sanity-typegen-ignore
const newsletterSectionBlockQuery = groq`
  _type == "newsletter-section-block" => {
    _type,
    heading,
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
    inputPlaceholder,
    buttonText,
    footerNote[]{
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
  }
`;

export default newsletterSectionBlockQuery;
