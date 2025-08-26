import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
const hero4BlockQuery = groq`
  _type == "hero-4-block" => {
    _type,
    title,
    description,
    showOverlay,
    backgroundImage{
      ${imageQuery}
    },
    topOverlayStrength,
    upperCenterOverlayStrength,
    lowerCenterOverlayStrength,
    bottomOverlayStrength,
  }
`;

export default hero4BlockQuery;
