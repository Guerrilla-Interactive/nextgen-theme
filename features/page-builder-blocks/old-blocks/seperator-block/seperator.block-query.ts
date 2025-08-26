import { groq } from "next-sanity";

const seperatorBlockQuery = groq`
  _type == "seperator-block" => {
    _type,
    padding,
  }
`;

export default seperatorBlockQuery;
