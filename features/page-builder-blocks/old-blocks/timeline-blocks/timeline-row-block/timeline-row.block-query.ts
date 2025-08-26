import { groq } from "next-sanity";

// @sanity-typegen-ignore
const timelineRowBlockQuery = groq`
  _type == "timeline-row-block" => {
    _type,
    padding,
    colorVariant,
    timelines[]{
      title,
      tagLine,
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
    },
  }
`;

export default timelineRowBlockQuery;
