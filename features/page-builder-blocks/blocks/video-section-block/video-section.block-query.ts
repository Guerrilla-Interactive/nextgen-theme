import { groq } from "next-sanity";

// @sanity-typegen-ignore
const videoSectionBlockQuery = groq`
  _type == "video-section-block" => {
    _type,
    title,
    highlight,
    description[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions { width, height }
          }
        }
      }
    },
    listType,
    bullets,
    tags,
    videoDescription,
    videoPosition,
  }
`;

export default videoSectionBlockQuery;
