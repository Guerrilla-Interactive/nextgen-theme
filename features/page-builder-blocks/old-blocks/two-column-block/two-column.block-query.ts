import { groq } from "next-sanity";


const twoColumnBlockQuery = groq`
  _type == "two-column-block" => {
    _type,
    firstColumn {
      blockContent[]{
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
    },
    secondColumn {
      blockContent[]{
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
    }
  }
`;

export default twoColumnBlockQuery;
