import { groq } from "next-sanity";

// @sanity-typegen-ignore
const faqBlockQuery = groq`
  _type == "faq-block" => {
    _type,
    heading,
    items[]{
      question,
      answer[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            url,
            mimeType,
            metadata { lqip, dimensions { width, height } }
          }
        }
      }
    }
  }
`;

export default faqBlockQuery;
