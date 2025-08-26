import { groq } from "next-sanity";

// @sanity-typegen-ignore
const splitInfoListBlockQuery = groq`
  _type == "split-info-list-block" => {
    _type,
    list[]{
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
      title,
      body[]{
        ...,
        _type == "image" => {
          ...,
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
          }
        }
      },
      tags[],
    },
  }
`;

export default splitInfoListBlockQuery; 