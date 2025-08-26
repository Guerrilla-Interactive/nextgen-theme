import { translate } from "@/features/page-builder-blocks/utils/translation-utils";

const hero5SchemaTranslations = {
  // Block metadata
  blockTitle: "Fullbredde Bilde Hero",
  blockDescription: "Hero med fullbredde bilde og tittel under",
  
  // Image field
  "image.title": "Hero Bilde",
  "image.description": "Fullbredde bilde med 16:9 aspektforhold",
  
  // Preview text
  "preview.hasImage": "Har bakgrunnsbilde",
  "preview.noImage": "Ikke noe bilde valgt"
};


 const hero5Translations = translate(hero5SchemaTranslations);

 export default hero5Translations;