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
  
  export const hero1BlockSchemaTranslations = translate({
    // Block metadata
    blockTitle: "Hero 1",
    blockDescription: "A hero block with a tagline, title, body, and links.",
    imagePositionField: "Image Position",
    imagePositionRight: "Right (Default)",
    imagePositionLeft: "Left",
  });
  
  
  export const hero1BlockComponentTranslations = translate({
    // Component translation
    "hero1.tagline": "Hero 1 Tagline",
    "hero1.title": "Hero 1 Title",
    "hero1.body": "Hero 1 Body",
    "hero1.links": "Hero 1 Links",
    "hero1.imagePosition": "Image Position",
  });
