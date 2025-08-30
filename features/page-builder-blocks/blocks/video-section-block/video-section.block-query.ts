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
    videoFile{
      asset->{
        _id,
        url,
        mimeType,
        extension
      }
    },
    videoUrl,
    posterImage{
      asset->{
        _id,
        url,
        metadata{ lqip, dimensions{ width, height } }
      }
    },
    autoplay,
    loop,
    muted,
    controls,
    playsInline,
    videoPosition,
    videoSize,
  }
`;

export default videoSectionBlockQuery;
