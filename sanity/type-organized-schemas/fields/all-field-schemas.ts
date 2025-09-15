import { externalLinkSchema } from "@/sanity/type-organized-schemas/fields/external-link.schema";
import { internalLinkSchema } from "@/sanity/type-organized-schemas/fields/internal-link.schema";
import { commandLogic } from "@/app/(main)/commands/[slug]/(command-slug-core-utilities)/command-slug.route-schema";


const fieldSchemas = {
  externalLinkSchema,
  internalLinkSchema,
  ...commandLogic
};

export const allFieldSchemas = Object.values(fieldSchemas);

