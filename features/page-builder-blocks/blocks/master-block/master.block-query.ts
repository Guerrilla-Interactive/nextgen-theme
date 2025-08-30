import { groq } from "next-sanity";

const masterBlockQuery = groq`
  _type == "master-block" => {
    _type,
    title,
  }
`;

export default masterBlockQuery;
