// footer settings schema
// Pagebuilder blocks.
// CTA text. 
// Info text.
// Contact info.

import { getSanityPageBuilderBlocks } from "@/features/page-builder-blocks/block-indexer";
import { defineField, defineType, defineArrayMember } from "sanity";
import { PanelTop } from "lucide-react";
// Social media links.
import { linksField } from "@/sanity/type-organized-schemas/generator-fields/links.field";


export const headerSettingsSchema = defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  

  icon: PanelTop,
  fields: [
    // title 
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Header",
      
    }),

    // Enable Top Bar Toggle
    defineField({
      name: "enableTopBar",
      title: "Enable Top Bar",
      type: "boolean",
      initialValue: false,
      description: "Toggle to show or hide the top bar section.",
    }),

    // Top Bar with Left and Right Columns
    defineField({
      name: "topBar",
      title: "Top Bar Configuration",
      type: "object",
      
    
      hidden: ({ document }) => !document?.enableTopBar,
      fields: [
        defineField({
          name: "justifyContent",
          title: "Global Alignment",
          type: "string",
          options: {
            list: [
              { title: "Space Between", value: "justify-between" },
              { title: "Space Evenly", value: "justify-evenly" },
              { title: "Space Around", value: "justify-around" },
              { title: "Start (Left)", value: "justify-start" },
              { title: "Center", value: "justify-center" },
              { title: "End (Right)", value: "justify-end" },
            ],
            layout: "radio",
          },
          initialValue: "justify-between",
          description: "How to distribute items across the top bar"
        }),
        linksField({
          name: "items",
          title: "Top Bar Items",
          description: "Add items to the top bar above navigation bar",
          includeInternal: true,
          includeExternal: true,
          includeDownload: false,
          includeLinkGroup: true,
          includeDropdownGroup: false,
          includeIcon: true,
          includeHideOnMobile: true,
          includeCustomTitle: false,
          includeLinkStyle: true,
        }),
      ],
    }),

    // SVGLoop Logo / Light and Dark Logo / Default Logo Options

    defineField({
      name: "logoOptions",
      title: "Logo Options",
      type: "object",

      fields: [
        defineField({
          name: "logoType",
          title: "Logo Type",   
          type: "string",
          options: {
            direction: "horizontal",
            layout: "radio",
            list: [
              { title: "SVGLoop", value: "svgloop" },
              { title: "Light and Dark", value: "lightAndDark" },
              { title: "Default", value: "default" },
            ],
          },
        }),
        
    // SVGLoop is a single JSON object that contains the SVG path data for the logo.
    defineField({
      name: "svgloopLogo",
      title: "SVGLoop Logo",
      type: "text",
      hidden: ({ parent }) => parent?.logoType !== "svgloop",
      description: "This is the SVG path data for the logo.",
    }),

    defineField({
      name: "defaultLogo",
      title: "Default Logo",
      type: "image",
      hidden: ({ parent }) => parent?.logoType !== "default",
      description: "This is the default logo.",
    }),

    // Light and Dark has option between SVG and Image
    defineField({
      name: "lightAndDarkLogo",
      title: "Light and Dark",
      type: "object",
      hidden: ({ parent }) => parent?.logoType !== "lightAndDark",
      fields: [
        defineField({
          name: "logoType",
          title: "Logo Type",
          type: "string",

          options: {
            layout: "radio",
            direction: "horizontal",
            list: [
              { title: "SVG", value: "svg" },
              { title: "Image", value: "image" },
            ],
          },
        }),


        defineField({
          name: "lightLogo",
          title: "Light Logo",
          type: "image",
        }),
        defineField({
          name: "darkLogo",
          title: "Dark Logo",
          type: "image",
        }),
      ]
    }),



    ],
  }),



  // Default is a single image that contains the default logo.


  // Navigation configuration with global alignment
  defineField({
    name: "navigationConfig",
    title: "Navigation Configuration",
    type: "object",
    fields: [
      defineField({
        name: "justifyContent",
        title: "Navigation Alignment",
        type: "string",
        options: {
          list: [
            { title: "Space Between", value: "justify-between" },
            { title: "Space Evenly", value: "justify-evenly" },
            { title: "Space Around", value: "justify-around" },
            { title: "Start (Left)", value: "justify-start" },
            { title: "Center", value: "justify-center" },
            { title: "End (Right)", value: "justify-end" },
          ],
          layout: "radio",
        },
        initialValue: "justify-between",
        description: "How to distribute navigation items across the header"
      }),
    ]
  }),

  // navigation items - using links field for various link types
  linksField({
    name: "navigationItems",
    title: "Navigation Items",
    includeInternal: true,
    includeExternal: true,
    includeDownload: false,
    includeLinkGroup: true,
    includeCustomTitle: true,
    includeDescription: false,
    includeLinkStyle: true,
    required: true,
  })


  ],
});




