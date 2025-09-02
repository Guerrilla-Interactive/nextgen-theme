import { groq } from "next-sanity";
import blockContentQuery from "@/features/page-builder-blocks/shared/shared-schemas/block-content/block-content.query";

const narrowPortableTextSectionBlockQuery = groq`
  _type == "narrow-portable-text-section-block" => {
    _type,
    title,
    body[]{
      ${blockContentQuery}
    },
  }
`;

export default narrowPortableTextSectionBlockQuery;
