import { groq } from "next-sanity";

// @sanity-typegen-ignore
const logoCloud1BlockQuery = groq`
  _type == "logo-cloud-1-block" => {
    _type,
    padding,
    colorVariant,
    title,
    images[]{
      asset->{
        _id,
        url,
        metadata {
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

export default logoCloud1BlockQuery; 