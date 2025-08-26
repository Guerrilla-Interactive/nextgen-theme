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
    formTitle: "Kontakt oss",
    formDescription: "Ta kontakt med oss for forspørsmål og et uforpliktet tilbud angående deres prosjekt.",
    submitButtonText: "Send melding",
    successMessage: "Takk for meldingen. Vi vil kontakte deg så fort som mulig!",
    
    // Form field labels and placeholders
    name: "Fornavn",
    namePlaceholder: "Ditt fornavn...",

    phone: "Telefon",
    phonePlaceholder: "Ditt telefonnummer...",
    email: "Epost",
    emailPlaceholder: "Din epostadresse...",
    message: "Melding",
    messagePlaceholder: "Din melding...",
    messageHelpText: "Det er fint med litt beskrivelse om hva du trenger hjelp med, så vil vi kunne være mer behjelpelig når vi tar kontakt!",
    
    // Validation messages
    required: "er påkrevd",
    invalidEmail: "Vennligst skriv inn en gyldig e-postadresse",
    invalidPhone: "Vennligst skriv inn et gyldig telefonnummer",
    invalidDate: "Vennligst velg en gyldig dato",
    invalidDateTime: "Vennligst velg en gyldig dato og tid",
    mustBeConfirmed: "må bekreftes",
    mustSelectOneOption: "Du må velge minst ett alternativ",
    pleasePick: "Vennligst velg en",
    errorMessage: "En feil oppstod.",
    submissionError: "En feil oppstod under innsendingen av skjemaet.",
    
    // Schema specific validation
    fieldNameRequired: "Feltnavn er påkrevd for denne felttypen.",
    fieldNameRegexError: "Feltnavn kan kun inneholde bokstaver, tall og understreker",
    optionLabelRequired: "Etikett er påkrevd for et alternativ",
    optionValueRequired: "Verdi er påkrevd når 'Bruk unik verdi' er aktivert.",
    
    // File upload
    selectFile: "Velg fil",
    
    // Form labels
    getHelp: "Få hjelp",

    // Schema Field Type Titles
    fieldTypeTextInput: "Tekstinnmating",
    fieldTypeEmail: "Epost",
    fieldTypePhone: "Telefon",
    fieldTypeTextarea: "Tekstområde",
    fieldTypeCheckbox: "Avkrysningsboks",
    fieldTypeCheckboxGroup: "Avkrysningsgruppe",
    fieldTypeSelect: "Nedtrekksliste",
    fieldTypeDate: "Dato",
    fieldTypeDateTime: "Dato og tid",
    fieldTypeRadioGroup: "Radiogruppe",
    fieldTypeFileUpload: "Filopplasting",
    fieldTypeSectionHeading: "Seksjonsoverskrift",

    // Schema Field Titles & Descriptions
    formTitleTitle: "Skjematittel",
    formTitleDescription: "Tittel som vises over skjemaet",
    formDescriptionTitle: "Skjemabeskrivelse",
    formDescriptionDescription: "Beskrivelse som vises over skjemafeltene",
    submitButtonTextTitle: "Send-knapp tekst",
    successMessageTitle: "Suksessmelding",
    successMessageDescription: "Melding som vises etter vellykket innsending",
    formFieldsTitle: "Skjemafelt",
    formFieldsDescription: "Legg til og konfigurer skjemafelt",
    formFieldTitle: "Skjemafelt", // Title for the object within the array
    fieldTypeTitle: "Felttype",
    fieldNameTitle: "Feltnavn",
    fieldNameDescription: "Identifikatoren for dette feltet (uten mellomrom)",
    fieldLabelTitle: "Feltetikett",
    fieldLabelDescription: "Etiketten som vises til brukere",
    placeholderTitle: "Plassholder",
    placeholderDescription: "Plassholdertekst for feltet",
    isRequiredTitle: "Påkrevd",
    isRequiredDescription: "Er dette feltet påkrevd?",
    fieldWidthTitle: "Feltbredde",
    fieldWidthDescription: "Bredden på feltet i skjemaoppsettet",
    fieldWidthFull: "Full bredde",
    fieldWidthHalf: "Halv bredde",
    fieldWidthThird: "Tredjedels bredde",
    fieldWidthQuarter: "Fjerdedels bredde",
    fieldWidthRemaining: "Resterende bredde",
    optionsTitle: "Alternativer",
    optionsDescription: "Alternativer for nedtrekksliste-, radio- eller avkrysningsgruppe-felt",
    optionItemTitle: "Alternativ", // Title for the option object
    optionLabelTitle: "Etikett",
    optionUseUniqueValueTitle: "Bruk unik verdi?",
    optionUseUniqueValueDescription: "Kryss av her hvis verdien som sendes inn fra skjemaet skal være annerledes enn etiketten som vises.",
    optionValueTitle: "Verdi",
    helpTextTitle: "Hjelpetekst",
    helpTextDescription: "Ekstra informasjon som vises under feltet",
    labelOnlyTitle: "Kun etikett",
    labelOnlyDescription: "Hvis aktivert, vis kun etiketten (som plassholder) uten en separat tittel over feltet.",
    preCheckedTitle: "Forhåndsvalgt",
    preCheckedDescription: "Hvis aktivert, vil avkrysningsboksen være forhåndsvalgt",

    // Conditional Logic Translations
    conditionalLogicTitle: "Betinget logikk",
    conditionalLogicDescription: "Vis/skjul dette feltet basert på verdien til et annet felt.",
    conditionalLogicEnableTitle: "Aktiver betinget logikk?",
    conditionalLogicControllerFieldNameTitle: "Kontrollerende feltnavn",
    conditionalLogicControllerFieldNameDescription: "Skriv inn 'Feltnavn' på feltet som skal kontrollere dette feltet (f.eks. en avkrysningsboks).",
    conditionalLogicActionTitle: "Handling",
    conditionalLogicActionShow: "Vis feltet når betingelsen er oppfylt",
    conditionalLogicActionHide: "Skjul feltet når betingelsen er oppfylt",
    conditionalLogicControllerValueCheckedTitle: "Betingelse (for avkrysningsboks)",
    conditionalLogicControllerValueCheckedDescription: "Skal betingelsen være oppfylt når den kontrollerende avkrysningsboksen er...",
    conditionalLogicControllerValueCheckedChecked: "Avkrysset",
    conditionalLogicControllerValueCheckedUnchecked: "Ikke avkrysset",
});


export const customContactFormBlockComponentTranslations = translate({
    formTitle: "Kontakt oss",
    // Add component-specific translations here if needed
});


