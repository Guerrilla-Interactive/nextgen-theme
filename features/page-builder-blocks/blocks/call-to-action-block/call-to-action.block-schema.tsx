import { defineField, defineType } from "sanity";
import { Megaphone } from "lucide-react";
import { linksField } from "@/sanity/type-organized-schemas/generator-fields/links.field";

export default defineType({
  name: "call-to-action-block",
  type: "object",
  title: "Call To Action",
  description: "Centered CTA with heading, body, links and a footer note",
  icon: Megaphone,
  initialValue: {
    heading: "Ready to ship faster?",
    body: [
      {
        _key: "body-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "body-1-span-1",
            _type: "span",
            text:
              "Join 10,000+ teams already using Velocity to build better products. Start your free trial today and see the difference intelligent automation makes.",
            marks: [],
          },
        ],
      },
    ],
    footerNote: [
      {
        _key: "foot-1",
        _type: "block",
        style: "normal",
        children: [
          { _key: "foot-1-span-1", _type: "span", text: "No credit card required • Setup in 5 minutes • Cancel anytime", marks: [] },
        ],
      },
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "block-content" }),
    linksField({
      name: "ctaLinks",
      title: "CTA Links",
      includeInternal: true,
      includeExternal: true,
      includeDownload: false,
      includeLinkGroup: false,
      includeCustomTitle: true,
      includeDescription: false,
      includeLinkStyle: true,
      includeIcon: false,
      required: false,
    }),
  
    defineField({ name: "footerNote", title: "Footer Note", type: "block-content" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Call To Action",
        subtitle: title,
      };
    },
  },
});
