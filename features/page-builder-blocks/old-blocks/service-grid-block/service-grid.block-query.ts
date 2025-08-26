import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
const serviceGridBlockQuery = groq`
  _type == "service-grid-block" => {
    _type,
    services[]{
      _type == "manualService" => {
         title,
         link,
         featuredImage{
           ${imageQuery}
         }
      },
      _type != "manualService" => @->{
         _id,
         title,
         slug,
         excerpt,
         featuredImage{
           ${imageQuery}
         }
      }
    },
  }
`;

export default serviceGridBlockQuery;
