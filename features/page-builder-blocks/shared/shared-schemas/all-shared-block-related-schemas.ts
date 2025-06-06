import blockContent from "./block-content/block-content.schema";
import link from "./link.schema";
import colorVariant from "./color-variant.schema";;
import sectionPadding from "./section-padding.schema";
import buttonVariantSchema from "../button/button-variant.schema";

const sharedSchemas = {
  blockContent,
  link,
  colorVariant,
  sectionPadding,
  buttonVariantSchema,
  // hero4BlockSchema,
};

const allSharedBlockRelatedSchemas = Object.values(sharedSchemas)
  .filter((schema) => schema !== undefined)
  .map((schema) => schema);


export default allSharedBlockRelatedSchemas;


