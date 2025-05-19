import { groq } from "next-sanity";
import { linksQuery } from "@/features/unorganized-queries/links.query";

// @sanity-typegen-ignore
export const headerSettingsQuery = groq`
    enableTopBar,
    topBar {
      justifyContent,
      items[] {
        ${linksQuery},
        icon,
        hideOnMobile
      }
    },
    logoOptions,
    "logo": select(
        logoOptions.logoType == "svgloop" => logoOptions.svgloopLogo,
        logoOptions.logoType == "lightAndDark" => logoOptions.lightAndDarkLogo {
            lightLogo,
            darkLogo
        },
        logoOptions.logoType == "default" => logoOptions.defaultLogo
    ),
    navigationConfig {
      justifyContent
    },
    navigationItems[] {
        ${linksQuery}
    }
`;

export const headerSettingsFetchQuery = groq`
  *[_type == "headerSettings"][0] {
  ${headerSettingsQuery}
  }
`;






