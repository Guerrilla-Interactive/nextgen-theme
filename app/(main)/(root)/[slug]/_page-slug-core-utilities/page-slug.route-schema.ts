import { defineField, defineType } from "sanity";
import { Files } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";
import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";
import { NavigationSettingsInput } from "../../../../../sanity/plugins/image-brightness-plugin";


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
      name: "navigationSettings",
      title: "Navigation Settings",
      type: "object",
      group: "settings",
      components: {
        input: NavigationSettingsInput
      },
      fields: [
        defineField({
          // dark or white navigation text
          name: "navigationTextColor",
          title: "Navigation Text Color",
          type: "string",
          initialValue: "dark",
          options: {
            list: ["dark", "white"],
          },
        }),
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
