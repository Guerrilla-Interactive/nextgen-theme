/**
 * Translation helper function
 */
function translate<T extends Record<string, any>>(
    translations: T | undefined | null
  ) {
    // Will output a translation variable, if not found, will output the fallback
    // Fallback is now optional and defaults to the key itself
    return function t<K extends keyof T>(
      key: K, 
      fallback?: string
    ): string {
      if (!translations) return fallback || String(key);
      const value = translations[key];
      return (value !== undefined ? String(value) : fallback || String(key));
    };
  } 
  
  /**
   * Variables helper function
   * Provides a consistent way to access variables with fallbacks
   */
  function variableStore<T extends Record<string, any>>(
    vars: T | undefined | null
  ) {
    // Fallback is now optional
    return function v<K extends keyof T>(
      key: K,
      fallback?: any
    ): T[K] | undefined {
      if (!vars) return fallback;
      const value = vars[key];
      return value !== undefined ? value : fallback;
    };
  }
  
  /**
   * Course slug variables - single values used throughout the codebase
   */
  export const courseVariables = {
    // Schema type identifier
    DOCUMENT_TYPE: "course-slug",
  
    // Query slug parameter
    SLUG_PARAM: "slug",
    
    // Route path for course pages
    NEXT_FOLDER_PATH: "/course",
    ROUTE_PATH: "/kurs",
  };
  
  /**
   * Course slug translations - localized strings
   */
  const translationsData = {
    // Schema metadata
    schemaTitle: "Kurs",
    schemaDescription: "En kursside med detaljer, påmeldingsskjema og FAQ.",
    
    // Field titles and descriptions
    "title.title": "Tittel",
    "title.description": "Kursets tittel",
    
    "slug.title": "Slug",
    "slug.description": "URL-vennlig navn for kurset",
    
    "featuredImage.title": "Fremhevet Bilde",
    "featuredImage.description": "Hovedbilde for kurset, vises øverst på siden",
    
    "aboutCourse.title": "Om Kurset",
    "aboutCourse.description": "En detaljert beskrivelse av hva kurset handler om",
    
    "keyConcepts.title": "Nøkkelkonsepter",
    "keyConcepts.description": "Viktige konsepter eller temaer som dekkes i kurset",
    
    "body.title": "Tekstinnhold",
    "body.description": "Hovedinnhold for kurssiden",
    
    "customContactForm.title": "Tilpasset Kontaktskjema",
    "customContactForm.description": "Skjema for påmelding eller henvendelser",
    
    "excerpt.title": "Utdrag",
    "excerpt.description": "Kort oppsummering av kurset, vises i søkeresultater og kurslistinger",
    
    "digitalCourse.title": "Digitalt Kurs",
    "digitalCourse.description": "Innstillinger for digitale kurs",
    
    "map.title": "Kart",
    "map.description": "Kart som viser kurslokasjonen",
    
    "faqs.title": "Vanlige Spørsmål",
    "faqs.description": "Spørsmål og svar relatert til kurset",
    
    // Group names (translated versions)
    "group.content": "Innhold", 
    "group.details": "Kursdetaljer",
    "group.seo": "SEO",
    "group.settings": "Innstillinger",
    
    // UI elements
    "readMore": "Les mer",
    "noImage": "Intet bilde",
    
    // Preview text
    "noTitle": "Ingen tittel angitt"
  };
  
  // Create the accessor functions
  export const courseSlugTranslations = translate(translationsData);
  export const courseSlugVariables = variableStore(courseVariables);