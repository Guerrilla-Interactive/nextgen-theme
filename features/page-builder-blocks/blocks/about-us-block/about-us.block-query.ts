import { groq } from "next-sanity";

const aboutUsBlockQuery = groq`
  _type == "about-us-block" => {
    _type,
    title,
  }
`;

export default aboutUsBlockQuery;
