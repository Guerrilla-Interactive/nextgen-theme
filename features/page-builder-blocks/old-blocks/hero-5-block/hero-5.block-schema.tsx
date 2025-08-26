import { defineField, defineType } from "sanity";
import { Image } from "lucide-react";
import t from "./hero-5.block-translation";


export default defineType({
  name: "hero-5-block",
  type: "object",
  title: t("blockTitle", "Full-Width Image Hero"),
  description: t("blockDescription", "Hero with full-width image and title below"),
  icon: Image,
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: t("image.title", "Hero Image"),
      description: t("image.description", "Full-width image with 16:9 aspect ratio"),
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({ image }) {
      return {
        title: t("blockTitle", "Full-Width Image Hero"),
        subtitle: image 
          ? t("preview.hasImage", "Has background image")
          : t("preview.noImage", "No image selected"),
        media: image ? image : Image,
      };
    },
  },
});
