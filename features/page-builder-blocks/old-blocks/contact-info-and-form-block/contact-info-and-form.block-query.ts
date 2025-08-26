import { groq } from "next-sanity";
import { customContactFormBlockQueryDetails } from "../custom-contact-form-block/custom-contact-form.block-query";

// @sanity-typegen-ignore
const contactInfoAndFormBlockQuery = groq`
  _type == "contact-info-and-form-block" => {
    _type,
      contactHeading,
      contactDescription,
      contactEmail,
      contactPhone,
      contactAddress,
      customContactForm{
      ${customContactFormBlockQueryDetails}
    },
    }
`;

export default contactInfoAndFormBlockQuery;
