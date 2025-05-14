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


export const hero3SchemaTranslations = translate({
  // Block metadata
  blockTitle: "Fullskjerm Hero",
  blockDescription: "En hero-blokk med fullskjerm bakgrunnsbilde, et mørkt overlegg, og tekst plassert nederst.",
  
  // Fields
  "titleOrange.title": "Tittel Fremheving",
  "titleOrange.description": "Et enkelt ord vist i oransje på første linje nederst til venstre.",
  
  "titleWhite.title": "Tittel",
  "titleWhite.description": "Tekst vist i hvitt på neste linje under det fremhevede ordet.",
  
  "subtitle.title": "Undertittel",
  "subtitle.description": "Tekst vist nederst til høyre i hero-blokken.",
  
  "backgroundImage.title": "Bakgrunnsbilde",
  "backgroundImage.description": "Fullskjerm bakgrunnsbilde for hero-blokken",
  
  "showOverlay.title": "Vis Overlegg",
  "showOverlay.description": "Slå overlegget på og av",

  "overlayColor.title": "Overlay Farge",
  "overlayColor.description": "Velg fargen til overleggen",
  
  "topOverlayStrength.title": "Øverste Overlegg Styrke",
  "topOverlayStrength.description": "Gjennomsiktighet på toppen (0–1)",
  
  "upperCenterOverlayStrength.title": "Øvre Senter Overlegg Styrke",
  "upperCenterOverlayStrength.description": "Gjennomsiktighet i øvre senter (0–1)",
  
  "lowerCenterOverlayStrength.title": "Nedre Senter Overlegg Styrke",
  "lowerCenterOverlayStrength.description": "Gjennomsiktighet i nedre senter (0–1)",
  
  "bottomOverlayStrength.title": "Nederste Overlegg Styrke",
  "bottomOverlayStrength.description": "Gjennomsiktighet på bunnen (0–1)",

  // Preview text
  "noTitle": "Ingen tittel satt"
});

