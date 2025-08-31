import { pageBuilderQuery } from "@/features/page-builder-blocks/block-queries";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const footerSettingsQuery = groq`
    ${pageBuilderQuery},
    ctaText,
    infoText,
    contactInfo,
    socialMediaLinks[] {
      platform,
      url
  }
`;

export const footerSettingsFetchQuery = groq`
  *[_type == "footerSettings"][0] {
  ${footerSettingsQuery}
  }
`;



