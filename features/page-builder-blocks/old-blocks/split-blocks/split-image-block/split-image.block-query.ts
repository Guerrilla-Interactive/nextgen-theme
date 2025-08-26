import { groq } from "next-sanity";

// @sanity-typegen-ignore
const splitImageBlockQuery = groq`
  _type == "split-image-block" => {
    _type,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
  }
`;

export default splitImageBlockQuery; 