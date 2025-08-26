import { defineField, defineType } from "sanity";
import { ContactRound } from "lucide-react";

export default defineType({
  name: "contact-info-and-form-block",
  type: "object",
  title: "Contact Info and Form",
  description:
    "A block that displays contact information on the left and a contact form on the right.",
  icon: ContactRound,
  fields: [
    // Contact Info fields
    defineField({
      name: "contactHeading",
      type: "string",
      title: "Contact Heading",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "contactDescription",
      type: "text",
      title: "Contact Description",
      initialValue:
        "We would love to hear from you. Please reach out with any questions or inquiries.",
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      initialValue: "email@example.com",
    }),
    defineField({
      name: "contactPhone",
      type: "string",
      title: "Contact Phone",
      initialValue: "123-456-7890",
    }),
    defineField({
      name: "contactAddress",
      type: "string",
      title: "Contact Address",
      initialValue: "123 Main Street, City, Country",
    }),
    defineField({
      name: "customContactForm",
      title: "Custom Contact Form",
      type: "custom-contact-form-block",
      
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Info and Form",
      };
    },
  },
});
