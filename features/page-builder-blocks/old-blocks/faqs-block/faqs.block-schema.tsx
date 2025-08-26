import { defineField, defineType } from "sanity";
import { ListCollapse } from "lucide-react";
import { faqsBlockSchemaTranslations as t } from "./faq.block-translation";


export default defineType({
  name: "faqs-block",
  type: "object",
  icon: ListCollapse,
  fields: [

    defineField({
      name: "faqs",
      type: "array",
      title: t("faqs.title", "FAQs"),
      of: [
        {
          name: "faq",
          type: "reference",
          to: [{ type: "faq" }],
        },
      ],


    }),

    defineField({
      name: "noPadding",
      type: "boolean",
      title: t("noPadding.title", "No Padding"),
      description: t("noPadding.description", "If true, the FAQs will not have padding"),
    }),

    defineField({
      name: "faqsByCategory",
      type: "array",
      title: t("faqsByCategory.title", "FAQs by Category"),
      of: [
        {
          name: "faqCategory",
          type: "reference",
          to: [{ type: "faqCategory" }],
        },
      ],
      description: t("faqsByCategory.description", "Title of the FAQs block"),
    }),

  ],
  preview: {
    select: {
      title: "faqs.0.title",
    },
    prepare({ title }) {
      return {
        title: t("faqs.title", "FAQs"),
        subtitle: title || t("noTitle", "No Title"),
      };
    },
  },
}); 