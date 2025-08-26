import { groq } from "next-sanity";

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
    primaryCta{
      title,
      href,
      target,
      buttonVariant,
      size
    },
    secondaryCta{
      title,
      href,
      target,
      buttonVariant,
      size
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
