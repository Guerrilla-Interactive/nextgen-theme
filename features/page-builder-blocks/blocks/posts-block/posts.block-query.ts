import { groq } from "next-sanity";

// @sanity-typegen-ignore
const postsBlockQuery = groq`
  _type == "posts-block" => {
    _type,
    heading,
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
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    cta{ title, href, variant },
    posts[]{
      category,
      meta,
      title,
      excerpt,
      author{ initials, name, role, bgColor },
      bgClass,
    }
  }
`;

export default postsBlockQuery;
