import { groq } from "next-sanity";

const dividerBlockQuery = groq`
  _type == "divider-block" => {
    _type,
    showLine,
    spaceY,
  }
`;

export default dividerBlockQuery;
