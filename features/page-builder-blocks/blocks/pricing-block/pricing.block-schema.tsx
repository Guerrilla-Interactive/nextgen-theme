import { defineField, defineType } from "sanity";
import { CreditCard } from "lucide-react";

export default defineType({
  name: "pricing-block",
  type: "object",
  title: "Pricing",
  description: "Heading, description and a 3-column pricing grid with footer notes",
  icon: CreditCard,
  initialValue: {
    heading: "Choose your plan",
    description: [
      {
        _key: "desc-1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "desc-1-span-1",
            _type: "span",
            text: "Start free and scale as you grow. All plans include core features with premium support and enterprise-grade security.",
            marks: [],
          },
        ],
      },
    ],
    plans: [
      {
        _key: "plan-free",
        name: "Free",
        price: "$0",
        priceSuffix: "/month",
        button: { title: "Get Started", variant: "outline" },
        features: [
          "✓ Up to 3 team members",
          "✓ 5 projects",
          "✓ Basic integrations",
          "✗ AI-powered insights",
          "✗ Priority support",
        ],
      },
      {
        _key: "plan-pro",
        name: "Pro",
        price: "$49",
        priceSuffix: "/month",
        mostPopular: true,
        button: { title: "Start 14-day trial", variant: "default" },
        features: [
          "✓ Up to 10 team members",
          "✓ Unlimited projects",
          "✓ AI-powered insights",
          "✓ Advanced integrations",
          "✓ Priority email support",
        ],
      },
      {
        _key: "plan-enterprise",
        name: "Enterprise",
        price: "Custom",
        button: { title: "Contact Sales", variant: "outline" },
        features: [
          "✓ Unlimited team members",
          "✓ Custom integrations",
          "✓ Dedicated support",
          "✓ SLA guarantees",
          "✓ On-premise deployment",
        ],
      },
    ],
    footerNotes: [
      "All plans include a 14-day free trial. No credit card required.",
      "💳 Cancel anytime",
      "🔒 SOC 2 compliant",
      "📞 24/7 support",
    ],
  },
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "block-content" }),
    defineField({
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        defineField({
          name: "plan",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "price", type: "string" }),
            defineField({ name: "priceSuffix", type: "string" }),
            defineField({ name: "mostPopular", type: "boolean" }),
            defineField({
              name: "button",
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "variant", type: "button-variant" }),
              ],
            }),
            defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        }),
      ],
      validation: (r) => r.length(3),
    }),
    defineField({ name: "footerNotes", title: "Footer Notes", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return {
        title: "Pricing",
        subtitle: title,
      };
    },
  },
});
