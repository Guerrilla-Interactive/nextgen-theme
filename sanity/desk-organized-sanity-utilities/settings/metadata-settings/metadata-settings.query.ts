import { groq } from "next-sanity";
import { metadataQuery } from "./metadata.query";

export const metadataSettingsFetchQuery = groq`
  *[_type == "metadataSettings"][0] {
    ${metadataQuery}
  }
`;
