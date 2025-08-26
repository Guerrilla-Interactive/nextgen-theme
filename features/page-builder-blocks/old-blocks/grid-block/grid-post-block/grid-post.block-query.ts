import { getAllCategoriesQuery } from "@/sanity/desk-organized-sanity-utilities/category/category.document-queries";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
const gridPostBlockQuery = groq`
  _type == "grid-post-block" => {
    _type,
    ...post->{
      title,
      slug,
      excerpt,
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
      ${getAllCategoriesQuery},
    },
  }
`;

export default gridPostBlockQuery; 