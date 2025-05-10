import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";


export default defineType({
  name: "page-slug",
  type: "document",
  title: "Page Slug",
  icon: Files,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Settings",
    },
    {
      name: "visual",
      title: "Visual Preview",
    },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "captureImage",
      title: "Page Screenshot",
      type: "screenshotImage",
      group: "visual",
      description: "Server-side screenshot of how this page appears on the frontend",
    }),

    defineField({
      name: "captureMetadata",
      title: "Capture Metadata",
      type: "object",
      group: "visual",
      hidden: true,
      
      fields: [
        { name: "captureDate", type: "datetime", title: "Capture Date" },
        { name: "pageTitle", type: "string", title: "Page Title" },
        { name: "pageUrl", type: "string", title: "Page URL" },
        { name: "path", type: "string", title: "Path" },
        { name: "viewportWidth", type: "number", title: "Viewport Width" },
        { name: "captureMethod", type: "string", title: "Capture Method" },
        { name: "viewportHeight", type: "number", title: "Viewport Height" },
        { name: "captureMode", type: "string", title: "Capture Mode", options: { list: ["draft", "published"] } },
        { name: "deviceTypes", type: "array", title: "Device Types", of: [{ type: "string" }] },
      ],
    }),
    defineField({
      name: "blocks",
      type: "array",
      group: "content",
      of: getSanityPageBuilderBlocks(),
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),
    orderRankField({ type: "page-slug" }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      blocks: 'blocks',
      ogImage: 'ogImage',
      captureImage: 'captureImage',
    },
    prepare({ title, slug, blocks, ogImage, captureImage }) {
      // Find the first hero block
      const firstBlock = blocks && blocks.length > 0 ? blocks[0] : null;
      
      // Check if the first block is a hero block and has an image
      let heroImage = null;
      if (firstBlock) {
        const isHero3or4 = ['hero-3-block', 'hero-4-block'].includes(firstBlock._type) && firstBlock.backgroundImage;
        const isHero5 = firstBlock._type === 'hero-5-block' && firstBlock.image;
        
        if (isHero3or4) {
          heroImage = firstBlock.backgroundImage;
        } else if (isHero5) {
          heroImage = firstBlock.image;
        }
      }
      
      // Use capture image first, then hero image, then OG image as fallback
      const media = captureImage || heroImage || ogImage || Files;
      
      // Create subtitle with slug and block count
      const slugText = slug?.current ? `/${slug.current}` : '(no slug)';
      const blocksText = blocks?.length ? `${blocks.length} block${blocks.length !== 1 ? 's' : ''}` : 'No blocks';
      
      return {
        title: title || 'Untitled Page',
        subtitle: `${slugText} • ${blocksText}`,
        media,
      };
    },
  },
});
