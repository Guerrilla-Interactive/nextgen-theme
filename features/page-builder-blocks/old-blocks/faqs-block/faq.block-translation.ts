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


export const faqsBlockSchemaTranslations = translate({
  // Block metadata
  blockTitle: "Ofte stillte spørsmål",
  blockDescription: "En blokk som viser ofte stilte spørsmål og svar.",

  // Fields
  "faqs.title": "Ofte stillte spørsmål",
  "faqs.description": "En blokk som viser ofte stilte spørsmål og svar.",

  "faqsByCategory.title": "Ofte stillte spørsmål etter kategori",
  "faqsByCategory.description": "En blokk som viser ofte stilte spørsmål og svar etter kategori.",

  // Preview text
  "noTitle": "Ingen tittel satt",
  "noPadding.title": "Ingen padding",
  "noPadding.description": "Hvis true, vil blokken ikke ha padding",
});


export const faqsBlockComponentTranslations = translate({
  // Component translation
  "faqs.title": "Ofte stillte spørsmål"

});


