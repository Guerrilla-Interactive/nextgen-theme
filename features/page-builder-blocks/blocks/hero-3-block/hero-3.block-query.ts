import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
const hero3BlockQuery = groq`
  _type == "hero-3-block" => {
    _type,
    titleOrange,
    titleWhite,
    subtitle,
    backgroundImage{
      ${imageQuery}
    },
    showOverlay,
    "overlayColor": select(
      
      overlayColor == "dark" => "0,0,0",
      overlayColor == "light" => "255,255,255",
      overlayColor
    ),
  
  
    topOverlayStrength,
    upperCenterOverlayStrength,
    lowerCenterOverlayStrength,
    bottomOverlayStrength,
  }
`;

export default hero3BlockQuery;
