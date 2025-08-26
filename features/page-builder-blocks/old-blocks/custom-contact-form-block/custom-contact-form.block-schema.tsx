import { defineField, defineType } from "sanity";
import {
  Mail,
  Type,
  AtSign,
  Phone,
  AlignLeft,
  CheckSquare,
  List,
  Calendar,
  Radio,
  Upload,
  Heading,
  Clock,
  ListChecks
} from "lucide-react";
import { customContactFormBlockTranslations as t } from "./custom-contact-form.block-translation";

// Field type icon mapping
const fieldTypeIcons = {
  text: Type,
  email: AtSign,
  tel: Phone,
  textarea: AlignLeft,
  checkbox: CheckSquare,
  checkboxGroup: ListChecks,
  select: List,
  date: Calendar,
  datetime: Clock,
  radio: Radio,
  file: Upload,
  heading: Heading,
} as const;

// Define a type based on the keys of fieldTypeIcons
type FieldType = keyof typeof fieldTypeIcons;

export default defineType({
  name: "custom-contact-form-block",
  type: "object",
  title: t('formTitleTitle', "Custom Contact Form"),
  description: t('formDescriptionDescription', "A customizable contact form with dynamic fields"),
  icon: Mail,
  fields: [
    // Form settings
    defineField({
      name: "formTitle",
      type: "string",
      title: t('formTitleTitle', "Form Title"),
      description: t('formTitleDescription', "Title displayed above the form"),
      initialValue: t("getHelp", "Get Help"),
    }),
    defineField({
      name: "formDescription",
      type: "text",
      title: t('formDescriptionTitle', "Form Description"),
      description: t('formDescriptionDescription', "Description displayed above the form fields"),
      initialValue: t("formDescription", "Contact us for inquiries and a non-binding offer regarding your project."),
    }),
    defineField({
      name: "submitButtonText",
      type: "string",
      title: t('submitButtonTextTitle', "Submit Button Text"),
      initialValue: t("submitButtonText", "Send Message"),
    }),
    defineField({
      name: "successMessage",
      type: "text",
      title: t('successMessageTitle', "Success Message"),
      description: t('successMessageDescription', "Message displayed after successful form submission"),
      initialValue: t("successMessage", "Thank you for your message. We will contact you as soon as possible!"),
    }),
    // Dynamic form fields
    defineField({
      name: "formFields",
      type: "array",
      title: t('formFieldsTitle', "Form Fields"),
      description: t('formFieldsDescription', "Add and configure form fields"),
      of: [
        {
          type: "object",
          name: "formField",
          title: t('formFieldTitle', "Form Field"),
          fields: [
            defineField({
              name: "fieldType",
              type: "string",
              title: t('fieldTypeTitle', "Field Type"),
              options: {
                list: [
                  { title: t('fieldTypeTextInput', "Text Input"), value: "text" },
                  { title: t('fieldTypeEmail', "Email"), value: "email" },
                  { title: t('fieldTypePhone', "Phone"), value: "tel" },
                  { title: t('fieldTypeTextarea', "Textarea"), value: "textarea" },
                  { title: t('fieldTypeCheckbox', "Checkbox"), value: "checkbox" },
                  { title: t('fieldTypeCheckboxGroup', "Checkbox Group"), value: "checkboxGroup" },
                  { title: t('fieldTypeSelect', "Select"), value: "select" },
                  { title: t('fieldTypeDate', "Date"), value: "date" },
                  { title: t('fieldTypeDateTime', "Date & Time"), value: "datetime" },
                  { title: t('fieldTypeRadioGroup', "Radio Group"), value: "radio" },
                  { title: t('fieldTypeFileUpload', "File Upload"), value: "file" },
                  { title: t('fieldTypeSectionHeading', "Section Heading"), value: "heading" },
                ],
              },
            }),
            defineField({
              name: "fieldName",
              type: "string",
              title: t('fieldNameTitle', "Field Name"),
              description: t('fieldNameDescription', "The identifier for this field (no spaces)"),
              validation: (Rule) => Rule.custom((value, context) => {
                // Cast parent to access fieldType
                const parent = context.parent as { fieldType?: string };

                // Only require fieldName if the fieldType is not 'heading'
                if (parent?.fieldType !== 'heading' && !value) {
                  return t('fieldNameRequired', "Field name is required for this field type.");
                }

                // Apply regex validation only if not a heading and value exists
                if (parent?.fieldType !== 'heading' && value && !/^[a-zA-Z0-9_]+$/.test(value)) {
                  return t('fieldNameRegexError', "Field name can only contain letters, numbers, and underscores");
                }

                // No validation needed for headings or if optional and empty
                return true;
              }),
              hidden: ({ parent }) => (parent as { fieldType?: string })?.fieldType === "heading", // Also cast here for consistency
            }),
            defineField({
              name: "fieldLabel",
              type: "string",
              title: t('fieldLabelTitle', "Field Label"),
              description: t('fieldLabelDescription', "The label shown to users"),
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              type: "string",
              title: t('placeholderTitle', "Placeholder"),
              description: t('placeholderDescription', "Placeholder text for the field"),
              hidden: ({ parent }) => [
                "heading", "checkbox", "radio", "file", "datetime", "checkboxGroup"
              ].includes((parent as { fieldType?: string })?.fieldType ?? ''),
            }),
            defineField({
              name: "isRequired",
              type: "boolean",
              title: t('isRequiredTitle', "Required"),
              description: t('isRequiredDescription', "Is this field required?"),
              initialValue: false,
              hidden: ({ parent }) => parent?.fieldType === "heading",
            }),
            defineField({
              name: "width",
              type: "string",
              title: t('fieldWidthTitle', "Field Width"),
              description: t('fieldWidthDescription', "Width of the field in the form layout"),
              options: {
                list: [
                  { title: t('fieldWidthFull', "Full Width"), value: "full" },
                  { title: t('fieldWidthHalf', "Half Width"), value: "half" },
                  { title: t('fieldWidthThird', "Third Width"), value: "third" },
                  { title: t('fieldWidthQuarter', "Quarter Width"), value: "quarter" },
                  { title: t('fieldWidthRemaining', "Remaining Width"), value: "remaining" },
                ],
              },
              initialValue: "full",
              hidden: ({ parent }) => parent?.fieldType === "heading",
            }),
            defineField({
              name: "options",
              type: "array",
              title: t('optionsTitle', "Options"),
              description: t('optionsDescription', "Options for select, radio, or checkbox fields"),
              hidden: ({ parent }) =>
                !["select", "radio", "checkboxGroup"].includes((parent as { fieldType?: string })?.fieldType ?? ''),
              of: [
                {
                  type: "object",
                  name: "optionItem",
                  title: t('optionItemTitle', "Option"),
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      title: t('optionLabelTitle', "Label"),
                      validation: Rule => Rule.required().error(t('optionLabelRequired', 'Label is required for an option')),
                    }),
                    defineField({
                      name: "useUniqueValue",
                      type: "boolean",
                      title: t('optionUseUniqueValueTitle', "Use Unique Value?"),
                      description: t('optionUseUniqueValueDescription', "Check this if the value submitted by the form should be different from the label shown."),
                      initialValue: false,
                    }),
                    defineField({
                      name: "value",
                      type: "string",
                      title: t('optionValueTitle', "Value"),
                      hidden: ({ parent }) => {
                        const optionItem = parent as { useUniqueValue?: boolean; value?: string };
                        return !optionItem?.useUniqueValue && !optionItem?.value;
                      },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      value: 'value',
                      useUniqueValue: 'useUniqueValue'
                    },
                    prepare({ title, value, useUniqueValue }) {
                      // Prioritize non-empty value, fallback to title (label)
                      const displayValue = (value != null && value !== "") ? value : title;
                      // Construct the subtitle based on whether value is explicit or derived from label
                      const subtitleText = (value != null && value !== "") ? `Value: ${value}` : `Value: ${title || ''} (from label)`;
                      return {
                        title: title || 'No Label',
                        subtitle: subtitleText
                      }
                    }
                  }
                },
              ],
            }),
            defineField({
              name: "helpText",
              type: "string",
              title: t('helpTextTitle', "Help Text"),
              description: t('helpTextDescription', "Additional information displayed below the field"),
            }),
            defineField({
              name: "labelOnly",
              type: "boolean",
              title: t('labelOnlyTitle', "Label Only"),
              description: t('labelOnlyDescription', "If enabled, display only the label (as placeholder) without a separate title above the field."),
              initialValue: false,
            }),
            defineField({
              name: "preChecked",
              type: "boolean",
              title: t('preCheckedTitle', "Prechecked"),
              description: t('preCheckedDescription', "If enabled, the checkbox will be prechecked"),
              initialValue: false,
              hidden: ({ parent }) => parent?.fieldType !== "checkbox",
            }),
            // Add Conditional Logic field group
            defineField({
              name: "conditionalLogic",
              type: "object",
              title: t('conditionalLogicTitle', "Conditional Logic"),
              description: t('conditionalLogicDescription', "Show/hide this field based on another field's value."),
              // Fieldset to group these options together
              fieldset: 'conditional',
              // Hide this whole group if the field type is 'heading'
              hidden: ({ parent }) => parent?.fieldType === "heading",
              fields: [
                defineField({
                  name: "enabled",
                  type: "boolean",
                  title: t('conditionalLogicEnableTitle', "Enable conditional logic?"),
                  initialValue: false,
                }),
                defineField({
                  name: "controllerFieldName",
                  type: "string",
                  title: t('conditionalLogicControllerFieldNameTitle', "Controlling Field Name"),
                  description: t('conditionalLogicControllerFieldNameDescription', "Enter the 'Field Name' of the field that controls this one (e.g., a checkbox)."),
                  // Only show if conditional logic is enabled
                  hidden: ({ parent }) => !(parent as { enabled?: boolean })?.enabled,
                  validation: Rule => Rule.custom((value, context) => {
                    const parentLogic = context.parent as { enabled?: boolean };
                    if (parentLogic?.enabled && !value) {
                      return "Controller Field Name is required when conditional logic is enabled.";
                    }
                    return true;
                  })
                }),
                defineField({
                  name: "action",
                  type: "string",
                  title: t('conditionalLogicActionTitle', "Action"),
                  options: {
                    list: [
                      { title: t('conditionalLogicActionShow', "Show field when condition is met"), value: "show" },
                      { title: t('conditionalLogicActionHide', "Hide field when condition is met"), value: "hide" },
                    ],
                    layout: "radio"
                  },
                  initialValue: "show",
                  hidden: ({ parent }) => !(parent as { enabled?: boolean })?.enabled,
                }),
                defineField({
                  name: "controllerValueChecked", // Assuming checkbox controller for now
                  type: "string", // Changed to string
                  title: t('conditionalLogicControllerValueCheckedTitle', "Condition (for Checkbox)"),
                  description: t('conditionalLogicControllerValueCheckedDescription', "Condition is met when controlling checkbox is..."),
                  options: {
                    list: [
                      // Use string values
                      { title: t('conditionalLogicControllerValueCheckedChecked', "Checked"), value: "true" },
                      { title: t('conditionalLogicControllerValueCheckedUnchecked', "Unchecked"), value: "false" },
                    ],
                    layout: "radio"
                  },
                  initialValue: "true", // Initial value as string
                  hidden: ({ parent }) => !(parent as { enabled?: boolean })?.enabled,
                }),
              ],
            }),
          ],
          // Define the fieldset used above
          fieldsets: [
            {
              name: 'conditional',
              title: t('conditionalLogicTitle', 'Conditional Logic'),
              options: { collapsible: true, collapsed: true }
            }
          ],
          preview: {
            select: {
              title: "fieldLabel",
              fieldType: "fieldType",
              required: "isRequired",
              width: "width",
              placeholder: "placeholder",
            },
            prepare({ title, fieldType, required, width, placeholder }) {
              const icon = fieldTypeIcons[fieldType as FieldType] || Mail;

              // Create a more descriptive subtitle with just values
              let details = [];
              if (placeholder && !["heading", "checkbox", "radio", "file", "datetime", "checkboxGroup"].includes(fieldType)) details.push(placeholder);
              if (width) details.push(width);
              if (required) details.push("Required");

              const subtitle = details.join(' | ');

              return {
                title: title || "Unnamed Field",
                subtitle: subtitle,
                media: icon,
              };
            },
          },
        },
      ],
      initialValue: () => [
        createFormField("formField", "text", "navn", t("name", "Name"), t("namePlaceholder", "Your name..."), true, "full"),
        createFormField("formField", "tel", "telefonnummer", t("phone", "Phone"), t("phonePlaceholder", "Your phone number..."), true, "full"),
        createFormField("formField", "email", "epost", t("email", "Email"), t("emailPlaceholder", "Your email address"), true, "full"),
        createFormField("formField", "textarea", "melding", t("message", "Message"), t("messagePlaceholder", "Your message..."), false, "full",
          t("messageHelpText", "It's helpful with a brief description of what you need help with, so we can be more helpful when we contact you!"))
      ]
    }),
  ],
  preview: {
    select: {
      title: "formTitle",
    },
    prepare({ title }) {
      return {
        title: title || "Custom Contact Form",
        subtitle: "Dynamic form fields",
        media: Mail,
      };
    },
  },
});

function createFormField(
  _type: "formField",
  fieldType: string,
  fieldName: string,
  fieldLabel: string,
  placeholder: string,
  isRequired: boolean,
  width: "full" | "half",
  helpText?: string,
  preChecked?: boolean
) {
  return {
    _type: "formField",
    fieldType,
    fieldName,
    fieldLabel,
    placeholder,
    isRequired,
    width,
    ...(helpText && { helpText }),
    preChecked: preChecked ?? false,
  };
}
