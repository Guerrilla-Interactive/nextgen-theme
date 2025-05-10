
import { groq } from "next-sanity";

export const siteSettingsFetchQuery = groq`
  *[_type == "siteSettings"][0] {
    privacyPolicyPage-> {
      "slug": slug.current,
      title
    },
  }
`;
