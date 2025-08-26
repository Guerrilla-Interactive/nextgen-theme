import { groq } from "next-sanity";

// @sanity-typegen-ignore
const sectionHeaderBlockQuery = groq`
  _type == "section-header-block" => {
    _type,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    tagLine,
    title,
    description,
    link,
  }
`;

export default sectionHeaderBlockQuery; 