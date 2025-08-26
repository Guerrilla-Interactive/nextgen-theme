import { groq } from "next-sanity";

export const customContactFormBlockQueryDetails = groq`
   _type,
    formTitle,
    formDescription,
    submitButtonText,
    successMessage,
    formFields[] {
      fieldType,
      fieldName,
      fieldLabel,
      placeholder,
      isRequired,
      width,
      helpText,
      labelOnly,
      preChecked,
      options[] {
        label,
        "value": select(value != null && value != "" => value, label)
      },
      conditionalLogic {
        enabled,
        controllerFieldName,
        action,
        controllerValueChecked
      }
  }
`;


const customContactFormBlockQuery = groq`
  _type == "custom-contact-form-block" => {
   ${customContactFormBlockQueryDetails}
  },
`;
export default customContactFormBlockQuery;