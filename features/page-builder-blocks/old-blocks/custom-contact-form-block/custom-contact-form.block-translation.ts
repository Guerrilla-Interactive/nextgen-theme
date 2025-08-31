function translate<T extends Record<string, any>>(
    translations: T | undefined | null
  ) {
    return function t<K extends keyof T>(
      key: K, 
      fallback: string
    ): string {
        if (!translations) return fallback;
        const value = translations[key];
        return (value !== undefined ? String(value) : fallback);
    };
}


export const customContactFormBlockTranslations = translate({
    formTitle: "Contact us",
    formDescription: "Get in touch with us for inquiries and a no-obligation quote for your project.",
    submitButtonText: "Send message",
    successMessage: "Thank you for your message. We will contact you as soon as possible!",
    
    // Form field labels and placeholders
    name: "First name",
    namePlaceholder: "Your first name...",

    phone: "Phone",
    phonePlaceholder: "Your phone number...",
    email: "Email",
    emailPlaceholder: "Your email address...",
    message: "Message",
    messagePlaceholder: "Your message...",
    messageHelpText: "A brief description of what you need help with is helpful, so we can assist you better when we contact you!",
    
    // Validation messages
    required: "is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    invalidDate: "Please pick a valid date",
    invalidDateTime: "Please pick a valid date and time",
    mustBeConfirmed: "must be confirmed",
    mustSelectOneOption: "You must select at least one option",
    pleasePick: "Please pick a",
    errorMessage: "An error occurred.",
    submissionError: "An error occurred while submitting the form.",
    
    // Schema specific validation
    fieldNameRequired: "Field name is required for this field type.",
    fieldNameRegexError: "Field name can only contain letters, numbers and underscores",
    optionLabelRequired: "Label is required for an option",
    optionValueRequired: "Value is required when 'Use unique value' is enabled.",
    
    // File upload
    selectFile: "Select file",
    
    // Form labels
    getHelp: "Get help",

    // Schema Field Type Titles
    fieldTypeTextInput: "Text input",
    fieldTypeEmail: "Email",
    fieldTypePhone: "Phone",
    fieldTypeTextarea: "Textarea",
    fieldTypeCheckbox: "Checkbox",
    fieldTypeCheckboxGroup: "Checkbox group",
    fieldTypeSelect: "Select",
    fieldTypeDate: "Date",
    fieldTypeDateTime: "Date and time",
    fieldTypeRadioGroup: "Radio group",
    fieldTypeFileUpload: "File upload",
    fieldTypeSectionHeading: "Section heading",

    // Schema Field Titles & Descriptions
    formTitleTitle: "Form title",
    formTitleDescription: "Title displayed above the form",
    formDescriptionTitle: "Form description",
    formDescriptionDescription: "Description displayed above the form fields",
    submitButtonTextTitle: "Submit button text",
    successMessageTitle: "Success message",
    successMessageDescription: "Message shown after successful submission",
    formFieldsTitle: "Form fields",
    formFieldsDescription: "Add and configure form fields",
    formFieldTitle: "Form field", // Title for the object within the array
    fieldTypeTitle: "Field type",
    fieldNameTitle: "Field name",
    fieldNameDescription: "Identifier for this field (no spaces)",
    fieldLabelTitle: "Field label",
    fieldLabelDescription: "The label shown to users",
    placeholderTitle: "Placeholder",
    placeholderDescription: "Placeholder text for the field",
    isRequiredTitle: "Required",
    isRequiredDescription: "Is this field required?",
    fieldWidthTitle: "Field width",
    fieldWidthDescription: "The width of the field in the form layout",
    fieldWidthFull: "Full width",
    fieldWidthHalf: "Half width",
    fieldWidthThird: "One-third width",
    fieldWidthQuarter: "One-quarter width",
    fieldWidthRemaining: "Remaining width",
    optionsTitle: "Options",
    optionsDescription: "Options for select, radio, or checkbox group fields",
    optionItemTitle: "Option", // Title for the option object
    optionLabelTitle: "Label",
    optionUseUniqueValueTitle: "Use unique value?",
    optionUseUniqueValueDescription: "Check this if the value submitted from the form should be different from the label shown.",
    optionValueTitle: "Value",
    helpTextTitle: "Help text",
    helpTextDescription: "Additional information shown below the field",
    labelOnlyTitle: "Label only",
    labelOnlyDescription: "If enabled, only show the label (as a placeholder) without a separate title above the field.",
    preCheckedTitle: "Pre-checked",
    preCheckedDescription: "If enabled, the checkbox will be pre-selected",

    // Conditional Logic Translations
    conditionalLogicTitle: "Conditional logic",
    conditionalLogicDescription: "Show/hide this field based on the value of another field.",
    conditionalLogicEnableTitle: "Enable conditional logic?",
    conditionalLogicControllerFieldNameTitle: "Controlling field name",
    conditionalLogicControllerFieldNameDescription: "Enter the 'Field name' of the field that should control this field (e.g., a checkbox).",
    conditionalLogicActionTitle: "Action",
    conditionalLogicActionShow: "Show the field when the condition is met",
    conditionalLogicActionHide: "Hide the field when the condition is met",
    conditionalLogicControllerValueCheckedTitle: "Condition (for checkbox)",
    conditionalLogicControllerValueCheckedDescription: "Should the condition be met when the controlling checkbox is...",
    conditionalLogicControllerValueCheckedChecked: "Checked",
    conditionalLogicControllerValueCheckedUnchecked: "Unchecked",
});


export const customContactFormBlockComponentTranslations = translate({
    formTitle: "Contact us",
    // Add component-specific translations here if needed
});


