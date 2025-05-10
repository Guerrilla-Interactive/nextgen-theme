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

  const variablesData = {
    // Schema type identifier
    DOCUMENT_TYPE: "service-slug",
    // Route path for service pages
    NEXT_FOLDER_PATH: "/service",
    ROUTE_PATH: "/tjenester",
  }

  const translationsData = {
    // Schema metadata
    schemaTitle: "Tjeneste",
    schemaDescription: "En tjeneste-side med detaljer, påmeldingsskjema og FAQ.",
    
    // Field titles and descriptions
  }
  

  export const serviceSlugTranslations = translate(translationsData);
  export const serviceSlugVariables = variableStore(variablesData);





