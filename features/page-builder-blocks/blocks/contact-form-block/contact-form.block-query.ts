import { groq } from "next-sanity";
import { customContactFormBlockQueryDetails } from "@/features/page-builder-blocks/old-blocks/custom-contact-form-block/custom-contact-form.block-query";

const contactFormBlockQuery = groq`
  _type == "contact-form-block" => {
    _type,
    sectionId,
    title,
    highlight,
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
            dimensions { width, height }
          }
        }
      }
    },
    listType,
    bullets,
    tags,
    customContactForm{
      ${customContactFormBlockQueryDetails}
    },
    formPosition,
  }
`;

export default contactFormBlockQuery;
