"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { media } from "sanity-plugin-media";
import { iconify } from 'sanity-plugin-iconify';



// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/all-schemas-combined";
import { resolve } from "@/sanity/desk-organized-sanity-utilities/structure-utilities/presentation-resolve";
import { structure } from "./sanity/desk-organized-sanity-utilities/structure";
import AppIcon from "./features/theme/AppIcon";
import { imageBrightnessPlugin } from "./sanity/plugins/image-brightness-plugin";






export default defineConfig({
  basePath: "/studio",
  projectId,
  icon: AppIcon,
  dataset,
  name: "Nextgen",
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    
      
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    imageBrightnessPlugin(),
    iconify({
      // Optional configuration
  
      // Filter icons by collection for all Icon fields (this field has typed autocomplete ✨)
      // Defaults to empty array (all collections)
      collections: [ "mdi", "lucide"],
  
      // Shows the selected icon name and collection underneath the icon picker
      // Defaults to false
      showName: false,
    }),
  ],
});
