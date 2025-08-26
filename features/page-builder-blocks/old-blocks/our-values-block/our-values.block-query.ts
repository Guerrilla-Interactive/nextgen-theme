import { groq } from "next-sanity";

// @sanity-typegen-ignore
const ourValuesBlockQuery = groq`
  _type == "our-values-block" => {
    _type,
    values
  }
`;

export default ourValuesBlockQuery;
