import { groq } from "next-sanity";
import { linksQuery } from "@/features/unorganized-queries/links.query";

// @sanity-typegen-ignore
const footerBlockQuery = groq`
  _type == "footer-block" => {
    _type,
    brandMark,
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
    columns[]{
      heading,
      links[]{
        ${linksQuery}
      }
    },
    socialLinks[]{
      ${linksQuery}
    },
    legalNote[]{
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
    bottomLinks[]{
      ${linksQuery}
    }
  }
`;

export default footerBlockQuery;
