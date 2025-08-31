import { groq } from "next-sanity";
import { linksQuery } from "@/features/unorganized-queries/links.query";

// @sanity-typegen-ignore
const callToActionBlockQuery = groq`
  _type == "call-to-action-block" => {
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
    ctaLinks[]{
      ${linksQuery}
    },
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
    }
  }
`;

export default callToActionBlockQuery;
