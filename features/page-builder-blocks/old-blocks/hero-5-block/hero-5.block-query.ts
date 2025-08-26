import { groq } from "next-sanity";
import { imageQuery } from "@/features/unorganized-components/image-component/image.query";

const hero5BlockQuery = groq`
  _type == "hero-5-block" => {
    _type,
    image{
      ${imageQuery}
    },
  }
`;

export default hero5BlockQuery;
