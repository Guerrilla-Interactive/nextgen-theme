import { groq } from "next-sanity";
import { linksQuery } from "@/features/unorganized-queries/links.query";

// @sanity-typegen-ignore
export const headerSettingsQuery = groq`
    email,
    phoneNumber,
    logo,
    navigationItems[] {
        ${linksQuery}
    }
`;

export const headerSettingsFetchQuery = groq`
  *[_type == "headerSettings"][0] {
  ${headerSettingsQuery}
  }
`;






