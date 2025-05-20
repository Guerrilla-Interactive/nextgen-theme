# NextGen Theme Architectural Patterns

This document provides a comprehensive guide to the patterns and conventions used throughout the NextGen Theme project.

## 1. Route Organization Patterns

### Route Group Hierarchy
The project uses Next.js App Router with a sophisticated hierarchical structure:

```
app/
├── (main)/                  # Main application container (doesn't affect URL)
│   ├── (root)/              # Root pages without URL prefix
│   │   ├── (index)/         # Homepage-specific components
│   │   │   ├── page.tsx
│   │   │   └── index.page-component.tsx
│   │   └── [slug]/          # Dynamic general pages
│   │       ├── (page-slug-core-utilities)/
│   │       │   ├── page-slug.desk-structure.ts
│   │       │   ├── page-slug.route-query.ts
│   │       │   ├── page-slug.route-schema.ts
│   │       │   └── page-slug.server-actions.ts
│   │       └── page.tsx
│   ├── blog/                # Blog section (affects URL)
│   │   ├── (index)/         # Blog listing page
│   │   │   ├── blog-index.page-component.tsx
│   │   │   ├── blog-index.route-query.ts
│   │   │   └── page.tsx
│   │   └── [slug]/          # Individual blog post pages
│   │       ├── (blog-slug-core-utilities)/
│   │       │   ├── blog-slug.desk-structure.ts
│   │       │   ├── blog-slug.route-query.ts
│   │       │   ├── blog-slug.route-schema.ts
│   │       │   └── blog-slug.server-actions.ts
│   │       └── page.tsx
│   ├── course/              # Course section (affects URL)
│   │   └── [slug]/          # Individual course pages
│   │       ├── (course-slug-core-utilities)/
│   │       └── page.tsx
│   ├── service/             # Service section (affects URL)
│   │   └── [slug]/          # Individual service pages
│   │       ├── (service-slug-core-utilities)/
│   │       └── page.tsx
│   ├── all-route-document-schemas.ts  # Central schema registry
│   ├── layout.tsx           # Shared layout for all routes
│   └── not-found.tsx        # Custom 404 page
```

**Key Patterns:**
- Use parentheses `(name)` for logical grouping without affecting URL paths
- Non-parenthesized directories affect URL structure (`blog/`, `service/`, etc.)
- Use dynamic route parameters with `[slug]` for content-specific pages
- Group related utilities in parenthesized directories

### Core Utilities Encapsulation
Each content type encapsulates its core utilities in a designated directory:

```
[content-type]/[slug]/
├── ([content-type]-slug-core-utilities)/
│   ├── [content-type]-slug.desk-structure.ts  # Sanity desk configuration
│   ├── [content-type]-slug.route-query.ts     # GROQ queries
│   ├── [content-type]-slug.route-schema.ts    # Sanity schema definition
│   └── [content-type]-slug.server-actions.ts  # Server actions
└── page.tsx                                  # Next.js page component
```

**Examples:**
- `blog/[slug]/(blog-slug-core-utilities)/`
- `course/[slug]/(course-slug-core-utilities)/`
- `service/[slug]/(service-slug-core-utilities)/`

### Consistent File Naming Convention
Files follow a predictable naming pattern:

```
[content-type].[file-purpose].[file-type].ts(x)
```

**Examples:**
- **Page Components:**
  - `page.tsx` (Next.js convention)
  - `blog-index.page-component.tsx`
  - `service-slug.page-component.tsx`
  
- **Data and Schema Files:**
  - `blog-slug.route-query.ts`
  - `course-slug.route-schema.ts`
  - `service-slug.server-actions.ts`

- **Sanity Integration Files:**
  - `blog-slug.desk-structure.ts`

- **Internationalization Support:**
  - `blog-slug.translations-and-variables.ts`

### Example Route File Implementations

#### Example: Page Component (page.tsx)
```tsx
// app/(main)/custom-route/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Blocks } from '@/features/page-builder-blocks/block-component-exporter';
import { fetchCustomRouteBySlug, generateStaticParams } from './custom-route-core-utilities/custom-route.server-actions';

export const dynamicParams = true;

// Generate metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = params;
  const data = await fetchCustomRouteBySlug(slug);
  
  if (!data) return {};
  
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.mainImage ? [data.mainImage.url] : [],
    },
  };
}

// Generate static paths for all custom route items
export async function generateStaticParams() {
  const paths = await generateStaticParams();
  return paths;
}

export default async function CustomRoutePage({ params }) {
  const { slug } = params;
  const data = await fetchCustomRouteBySlug(slug);
  
  // Handle 404 if no data found
  if (!data) {
    notFound();
  }
  
  return (
    <main className="custom-route-container">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
        {data.blocks && <Blocks blocks={data.blocks} />}
      </div>
    </main>
  );
}
```

#### Example: Route Schema (custom-route.route-schema.ts)
```ts
// app/(main)/custom-route/[slug]/(custom-route-core-utilities)/custom-route.route-schema.ts
import { defineField, defineType } from 'sanity';
import { blocksField } from '@/sanity/schemas/blocks-field';

export const customRouteSchema = defineType({
  name: 'customRoute',
  title: 'Custom Route',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    blocksField({ 
      name: 'blocks', 
      title: 'Page Builder Blocks',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
});
```

#### Example: Route Query (custom-route.route-query.ts)
```ts
// app/(main)/custom-route/[slug]/(custom-route-core-utilities)/custom-route.route-query.ts
import { groq } from 'next-sanity';

// Base query for custom route items
export const customRouteBaseQuery = groq`
  _type == "customRoute" {
    _id,
    title,
    slug,
    description,
    "mainImage": mainImage {
      "url": asset->url,
      "alt": alt,
    },
  }
`;

// Detailed query for single custom route item
export const customRouteBySlugQuery = groq`
  *[_type == "customRoute" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    "mainImage": mainImage {
      "url": asset->url,
      "alt": alt,
    },
    blocks[] {
      _type == "hero1Block" => {
        _type,
        _key,
        title,
        subtitle,
        description,
        "image": image {
          "url": asset->url,
          "alt": alt,
        },
        // Other hero1Block fields
      },
      _type == "cardGridBlock" => {
        _type,
        _key,
        title,
        cards[] {
          _key,
          title,
          description,
          "image": image.asset->url,
        },
        // Other cardGridBlock fields
      },
      // Additional block type patterns
      _type,
      _key,
    }
  }
`;

// Query for listing all custom route items
export const allCustomRoutesQuery = groq`
  *[_type == "customRoute"] {
    _id,
    title,
    "slug": slug.current,
    description,
    "mainImage": mainImage.asset->url,
  }
`;
```

#### Example: Server Actions (custom-route.server-actions.ts)
```ts
// app/(main)/custom-route/[slug]/(custom-route-core-utilities)/custom-route.server-actions.ts
import { client } from '@/sanity/lib/client';
import { customRouteBySlugQuery, allCustomRoutesQuery } from './custom-route.route-query';

// Fetch a single custom route by slug
export async function fetchCustomRouteBySlug(slug: string) {
  try {
    const data = await client.fetch(customRouteBySlugQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching custom route:', error);
    return null;
  }
}

// Fetch all custom routes for static generation
export async function generateStaticParams() {
  try {
    const routes = await client.fetch(allCustomRoutesQuery);
    return routes.map((route) => ({
      slug: route.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch all custom routes for listing
export async function fetchAllCustomRoutes() {
  try {
    const routes = await client.fetch(allCustomRoutesQuery);
    return routes;
  } catch (error) {
    console.error('Error fetching all custom routes:', error);
    return [];
  }
}
```

#### Example: Desk Structure (custom-route.desk-structure.ts)
```ts
// app/(main)/custom-route/[slug]/(custom-route-core-utilities)/custom-route.desk-structure.ts
import { StructureBuilder } from 'sanity/desk';
import { FolderIcon } from '@sanity/icons';

// Custom desk structure for custom routes
export const customRouteStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Custom Routes')
    .icon(FolderIcon)
    .child(
      S.documentTypeList('customRoute')
        .title('Custom Routes')
        .filter('_type == "customRoute"')
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('customRoute')
        )
    );
```

## 2. Page Builder Blocks Architecture

The page builder system is organized into block categories with a consistent implementation pattern:

```
features/
└── page-builder-blocks/
    ├── blocks/
    │   ├── hero-blocks/
    │   │   ├── hero-1-block/
    │   │   │   ├── hero-1-block-components/
    │   │   │   │   ├── hero-1-background.component.tsx
    │   │   │   │   └── hero-1-content.component.tsx
    │   │   │   ├── hero-1.block-component.tsx
    │   │   │   ├── hero-1.block-query.ts
    │   │   │   ├── hero-1.block-schema.tsx
    │   │   │   ├── hero-1.block-translation.ts
    │   │   │   └── index.ts
    │   │   ├── hero-2-block/
    │   │   └── hero-3-block/
    │   ├── grid-blocks/
    │   │   ├── card-grid-block/
    │   │   ├── post-grid-block/
    │   │   └── pricing-grid-block/
    │   ├── content-blocks/
    │   │   ├── section-header-block/
    │   │   └── faq-block/
    │   └── interactive-blocks/
    │       ├── form-block/
    │       ├── map-block/
    │       └── carousel-block/
    ├── shared/
    │   ├── button-components/
    │   │   ├── button.component.tsx
    │   │   └── button.schema.ts
    │   └── schemas/
    │       ├── block-content.schema.ts
    │       ├── color-variants.schema.ts
    │       ├── layout-variants.schema.ts
    │       ├── link.schema.ts
    │       └── section-padding.schema.ts
    ├── utils/
    │   ├── block-helpers.ts
    │   └── block-types.ts
    ├── block-component-exporter.tsx
    └── block-indexer.tsx
```

### Block Implementation Pattern
Every block follows this consistent structure:

```
[block-name]-block/
├── [block-name]-block-components/  # (Optional) For complex blocks
│   ├── [component-name].component.tsx
│   └── [component-name].component.tsx
├── [block-name].block-component.tsx  # Main React component
├── [block-name].block-query.ts       # GROQ queries
├── [block-name].block-schema.tsx     # Sanity schema definition
├── [block-name].block-translation.ts # (Optional) Translation strings
└── index.ts                         # Exports for registration
```

### Block Registration System
The central registry in `block-indexer.tsx`:
- Imports all blocks from their directories
- Maps block types to React components
- Registers schemas with Sanity
- Provides TypeScript type definitions

Example block indexer structure:
```typescript
// Simplified example
const blockComponents = {
  'hero-1': Hero1Block,
  'hero-2': Hero2Block,
  'card-grid': CardGridBlock,
  // ... other blocks
};

const blockSchemas = [
  hero1BlockSchema,
  hero2BlockSchema,
  cardGridBlockSchema,
  // ... other schemas
];

export { blockComponents, blockSchemas };
```

### Shared Resources
Resources used across multiple blocks:
- **Button Components**: Reusable button components with schemas
- **Shared Schemas**: Common schema patterns (colors, layouts, spacing)
- **Utility Functions**: Helper functions for block rendering

### Example Block File Implementations

#### Example: Block Component (custom-block.block-component.tsx)
```tsx
// features/page-builder-blocks/blocks/content-blocks/custom-block/custom-block.block-component.tsx
import React from 'react';
import { CustomBlockProps } from './custom-block.types';
import CustomBlockHeader from './custom-block-components/custom-block-header.component';
import CustomBlockContent from './custom-block-components/custom-block-content.component';

export default function CustomBlock({ data }: CustomBlockProps) {
  const { 
    title,
    subtitle,
    content,
    ctaButton,
    backgroundColor = 'white',
    textAlign = 'left',
    paddingSize = 'medium'
  } = data;
  
  // Generate classes based on configuration
  const containerClasses = `custom-block ${backgroundColor} text-${textAlign} padding-${paddingSize}`;
  
  return (
    <section className={containerClasses}>
      <div className="container mx-auto">
        {/* Render header if title or subtitle exists */}
        {(title || subtitle) && (
          <CustomBlockHeader 
            title={title} 
            subtitle={subtitle} 
          />
        )}
        
        {/* Render main content */}
        <CustomBlockContent 
          content={content}
          ctaButton={ctaButton}
        />
      </div>
    </section>
  );
}
```

#### Example: Block Schema (custom-block.block-schema.tsx)
```tsx
// features/page-builder-blocks/blocks/content-blocks/custom-block/custom-block.block-schema.tsx
import { defineField, defineType } from 'sanity';
import { colorOptions } from '../../../shared/schemas/color-variants.schema';
import { paddingOptions } from '../../../shared/schemas/section-padding.schema';
import { buttonSchema } from '../../../shared/button-components/button.schema';

export const customBlockSchema = defineType({
  name: 'customBlock',
  title: 'Custom Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: buttonSchema.fields,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'paddingSize',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Custom Block',
        subtitle: 'Content Block',
      };
    },
  },
});
```

#### Example: Block Query (custom-block.block-query.ts)
```ts
// features/page-builder-blocks/blocks/content-blocks/custom-block/custom-block.block-query.ts
import { groq } from 'next-sanity';

export const customBlockQuery = groq`
  _type == "customBlock" => {
    _type,
    _key,
    title,
    subtitle,
    content,
    ctaButton {
      text,
      url,
      style,
      openInNewTab
    },
    backgroundColor,
    textAlign,
    paddingSize
  }
`;
```

#### Example: Block Translation (custom-block.block-translation.ts)
```ts
// features/page-builder-blocks/blocks/content-blocks/custom-block/custom-block.block-translation.ts
export const customBlockTranslations = {
  en: {
    readMore: 'Read more',
    ctaDefault: 'Learn More',
    contentMissing: 'Content is missing',
  },
  es: {
    readMore: 'Leer más',
    ctaDefault: 'Más información',
    contentMissing: 'Falta contenido',
  },
  fr: {
    readMore: 'Lire la suite',
    ctaDefault: 'En savoir plus',
    contentMissing: 'Contenu manquant',
  },
};
```

#### Example: Block Component (custom-block-header.component.tsx)
```tsx
// features/page-builder-blocks/blocks/content-blocks/custom-block/custom-block-components/custom-block-header.component.tsx
import React from 'react';

interface CustomBlockHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function CustomBlockHeader({ title, subtitle }: CustomBlockHeaderProps) {
  if (!title && !subtitle) return null;
  
  return (
    <div className="custom-block-header mb-8">
      {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
      {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
}
```

#### Example: Index file (index.ts)
```ts
// features/page-builder-blocks/blocks/content-blocks/custom-block/index.ts
import CustomBlock from './custom-block.block-component';
import { customBlockSchema } from './custom-block.block-schema';
import { customBlockQuery } from './custom-block.block-query';
import { customBlockTranslations } from './custom-block.block-translation';

export {
  CustomBlock,
  customBlockSchema,
  customBlockQuery,
  customBlockTranslations,
};
```

## 3. Context System Architecture

The context system provides application-wide state management:

```
features/
└── context/
    ├── screen-status/
    │   ├── screen-status.hooks.ts     # Custom hooks
    │   └── screen-status.states.ts    # State definitions
    ├── session-status/
    │   ├── session-status.hooks.ts
    │   ├── session-status.states.ts
    │   └── session-status.actions.ts
    ├── theme-status/
    │   ├── theme-status.hooks.ts
    │   └── theme-status.states.ts
    ├── global-context.tsx            # Combined context provider
    ├── nextgen-context-panel-toggle.tsx
    └── nextgen-context-panel.tsx
```

### Context Organization Pattern
Each context is separated into:
- **State definitions**: Types and initial states
- **Hooks**: Custom hooks for accessing context
- **Actions**: (Optional) Functions that modify context state

Example hook implementation:
```typescript
// Example of a custom hook
export function useScreenStatus() {
  const context = React.useContext(ScreenStatusContext);
  if (context === undefined) {
    throw new Error('useScreenStatus must be used within a ScreenStatusProvider');
  }
  return context;
}
```

### Global Context Integration
The `global-context.tsx` file:
- Combines multiple contexts into a single provider
- Ensures proper context nesting
- Provides a clean API for component consumption

### Example Context File Implementations

#### Example: Context States (custom-context.states.ts)
```ts
// features/context/custom-status/custom-status.states.ts
import { createContext } from 'react';

// Define the state interface
export interface CustomStatusState {
  isActive: boolean;
  mode: 'light' | 'dark' | 'system';
  preferences: {
    notifications: boolean;
    autoSave: boolean;
  };
  lastUpdated: Date | null;
}

// Define action types that can modify the state
export type CustomStatusAction = 
  | { type: 'TOGGLE_ACTIVE' }
  | { type: 'SET_MODE'; payload: 'light' | 'dark' | 'system' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<CustomStatusState['preferences']> }
  | { type: 'RESET' };

// Define the context type that includes state and dispatch
export interface CustomStatusContextType {
  state: CustomStatusState;
  dispatch: React.Dispatch<CustomStatusAction>;
  // Helper functions
  toggleActive: () => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

// Define initial state
export const initialCustomStatusState: CustomStatusState = {
  isActive: false,
  mode: 'system',
  preferences: {
    notifications: true,
    autoSave: true,
  },
  lastUpdated: null,
};

// Create the context with a default undefined value
export const CustomStatusContext = createContext<CustomStatusContextType | undefined>(undefined);

// Define the reducer function for state management
export function customStatusReducer(state: CustomStatusState, action: CustomStatusAction): CustomStatusState {
  switch (action.type) {
    case 'TOGGLE_ACTIVE':
      return {
        ...state,
        isActive: !state.isActive,
        lastUpdated: new Date(),
      };
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        lastUpdated: new Date(),
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
        lastUpdated: new Date(),
      };
    case 'RESET':
      return {
        ...initialCustomStatusState,
        lastUpdated: new Date(),
      };
    default:
      return state;
  }
}
```

#### Example: Context Hooks (custom-context.hooks.ts)
```ts
// features/context/custom-status/custom-status.hooks.ts
import { useContext, useReducer, ReactNode, useCallback, useEffect } from 'react';
import {
  CustomStatusContext,
  CustomStatusContextType,
  initialCustomStatusState,
  customStatusReducer,
} from './custom-status.states';

// Custom hook to access the context
export function useCustomStatus(): CustomStatusContextType {
  const context = useContext(CustomStatusContext);
  if (context === undefined) {
    throw new Error('useCustomStatus must be used within a CustomStatusProvider');
  }
  return context;
}

// Helper hook to check if active
export function useIsCustomActive(): boolean {
  const { state } = useCustomStatus();
  return state.isActive;
}

// Helper hook to get current mode
export function useCustomMode(): 'light' | 'dark' | 'system' {
  const { state } = useCustomStatus();
  return state.mode;
}

// Provider component to wrap children with context
export function CustomStatusProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(customStatusReducer, initialCustomStatusState);
  
  // Helper functions for commonly used actions
  const toggleActive = useCallback(() => {
    dispatch({ type: 'TOGGLE_ACTIVE' });
  }, []);
  
  const setMode = useCallback((mode: 'light' | 'dark' | 'system') => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);
  
  // Load saved preferences on mount
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('customStatusPreferences');
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        dispatch({ 
          type: 'UPDATE_PREFERENCES', 
          payload: parsed 
        });
      }
    } catch (error) {
      console.error('Error loading custom status preferences:', error);
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    try {
      localStorage.setItem(
        'customStatusPreferences',
        JSON.stringify(state.preferences)
      );
    } catch (error) {
      console.error('Error saving custom status preferences:', error);
    }
  }, [state.preferences]);
  
  // Create the context value object
  const value: CustomStatusContextType = {
    state,
    dispatch,
    toggleActive,
    setMode,
  };
  
  return (
    <CustomStatusContext.Provider value={value}>
      {children}
    </CustomStatusContext.Provider>
  );
}
```

#### Example: Global Context Integration (global-context.tsx)
```tsx
// features/context/global-context.tsx
import React, { ReactNode } from 'react';
import { ScreenStatusProvider } from './screen-status/screen-status.hooks';
import { SessionStatusProvider } from './session-status/session-status.hooks';
import { CustomStatusProvider } from './custom-status/custom-status.hooks';

interface GlobalContextProviderProps {
  children: ReactNode;
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  return (
    // Nest providers in order of dependency
    <ScreenStatusProvider>
      <CustomStatusProvider>
        <SessionStatusProvider>
          {children}
        </SessionStatusProvider>
      </CustomStatusProvider>
    </ScreenStatusProvider>
  );
}

// Usage in _app.tsx or layout.tsx
// <GlobalContextProvider>
//   <Component {...pageProps} />
// </GlobalContextProvider>
```

## 4. Sanity Desk Organization

The Sanity desk structure organizes content in the CMS:

```
sanity/
└── desk-organized-sanity-utilities/
    ├── author/
    │   ├── author.document-queries.ts
    │   ├── author.document-schema.ts
    │   └── author.document-structure.ts
    ├── category/
    │   ├── category.document-queries.ts
    │   ├── category.document-schema.ts
    │   └── category.document-structure.ts
    ├── settings/
    │   ├── footer-settings/
    │   │   ├── footer-settings.document-schema.ts
    │   │   └── footer-settings.component.tsx
    │   ├── header-settings/
    │   ├── menu-settings/
    │   ├── metadata-settings/
    │   ├── site-settings/
    │   ├── all-settings-document-schemas.ts
    │   ├── settings.query.ts
    │   └── settings.structure.ts
    ├── structure-utilities/
    │   ├── document-list.component.tsx
    │   ├── parent-child.component.tsx
    │   └── presentation-resolver.component.tsx
    ├── desk-organized-schemas.ts
    └── structure.ts
```

### Document Type Pattern
Each document type follows this pattern:

```
[document-type]/
├── [document-type].document-queries.ts   # GROQ queries
├── [document-type].document-schema.ts    # Schema definition
└── [document-type].document-structure.ts # Desk configuration
```

### Settings Organization
Settings use a more complex structure:

```
settings/
├── [settings-type]-settings/
│   ├── [settings-type]-settings.document-schema.ts
│   └── [settings-type]-settings.component.tsx
├── all-settings-document-schemas.ts
├── settings.query.ts
└── settings.structure.ts
```

### Example Sanity Desk File Implementations

#### Example: Document Schema (custom-document.document-schema.ts)
```ts
// sanity/desk-organized-sanity-utilities/custom-document/custom-document.document-schema.ts
import { defineField, defineType } from 'sanity';

export const customDocumentSchema = defineType({
  name: 'customDocument',
  title: 'Custom Document',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'metadata', title: 'Metadata' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'metadata',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        { type: 'image' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'mainImage',
    },
  },
});
```

#### Example: Document Queries (custom-document.document-queries.ts)
```ts
// sanity/desk-organized-sanity-utilities/custom-document/custom-document.document-queries.ts
import { groq } from 'next-sanity';

// Query for a single custom document by slug
export const customDocumentBySlugQuery = groq`
  *[_type == "customDocument" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    publishDate,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    "mainImage": mainImage {
      "url": asset->url,
      "alt": alt,
      "aspectRatio": asset->metadata.dimensions.aspectRatio,
    },
    content,
    featured
  }
`;

// Query for all custom documents
export const allCustomDocumentsQuery = groq`
  *[_type == "customDocument"] | order(publishDate desc) {
    _id,
    title,
    description,
    "slug": slug.current,
    publishDate,
    "category": category->{
      _id,
      title
    },
    "mainImage": mainImage.asset->url,
    featured
  }
`;

// Query for featured custom documents
export const featuredCustomDocumentsQuery = groq`
  *[_type == "customDocument" && featured == true] | order(publishDate desc)[0...4] {
    _id,
    title,
    description,
    "slug": slug.current,
    publishDate,
    "mainImage": mainImage.asset->url
  }
`;
```

#### Example: Document Structure (custom-document.document-structure.ts)
```ts
// sanity/desk-organized-sanity-utilities/custom-document/custom-document.document-structure.ts
import { StructureBuilder } from 'sanity/desk';
import { DocumentsIcon, StarIcon } from '@sanity/icons';

export const customDocumentStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Custom Documents')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Custom Documents')
        .items([
          S.listItem()
            .title('All Custom Documents')
            .icon(DocumentsIcon)
            .child(
              S.documentTypeList('customDocument')
                .title('All Custom Documents')
                .filter('_type == "customDocument"')
            ),
          S.listItem()
            .title('Featured Custom Documents')
            .icon(StarIcon)
            .child(
              S.documentTypeList('customDocument')
                .title('Featured Custom Documents')
                .filter('_type == "customDocument" && featured == true')
            ),
          S.divider(),
          S.listItem()
            .title('Custom Documents by Category')
            .child(
              S.documentTypeList('category')
                .title('Select a Category')
                .child((categoryId) =>
                  S.documentList()
                    .title('Custom Documents')
                    .filter('_type == "customDocument" && category._ref == $categoryId')
                    .params({ categoryId })
                )
            ),
        ])
    );
```

#### Example: Settings Schema (custom-settings.document-schema.ts)
```ts
// sanity/desk-organized-sanity-utilities/settings/custom-settings/custom-settings.document-schema.ts
import { defineField, defineType } from 'sanity';

export const customSettingsSchema = defineType({
  name: 'customSettings',
  title: 'Custom Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  groups: [
    { name: 'appearance', title: 'Appearance' },
    { name: 'functionality', title: 'Functionality' },
    { name: 'advanced', title: 'Advanced Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      initialValue: 'Custom Settings',
      readOnly: true,
      group: 'appearance',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      group: 'appearance',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      group: 'appearance',
    }),
    defineField({
      name: 'enableFeature',
      title: 'Enable Special Feature',
      type: 'boolean',
      initialValue: false,
      group: 'functionality',
    }),
    defineField({
      name: 'itemsPerPage',
      title: 'Items Per Page',
      type: 'number',
      initialValue: 10,
      validation: (Rule) => Rule.min(1).max(50),
      group: 'functionality',
    }),
    defineField({
      name: 'apiEndpoint',
      title: 'API Endpoint',
      type: 'url',
      group: 'advanced',
    }),
    defineField({
      name: 'customCode',
      title: 'Custom Code',
      type: 'text',
      rows: 10,
      group: 'advanced',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Custom Settings',
      };
    },
  },
});
```

#### Example: Settings Component (custom-settings.component.tsx)
```tsx
// sanity/desk-organized-sanity-utilities/settings/custom-settings/custom-settings.component.tsx
import React from 'react';
import { Card, Stack, Text, Switch, Code, Box } from '@sanity/ui';
import { ColorInput } from 'sanity-plugin-color-input';

// This is a custom input component for the settings page
export function CustomSettingsComponent(props) {
  const { value, onChange } = props;
  
  // Handle color change
  const handleColorChange = (field) => (newColor) => {
    onChange({
      ...value,
      [field]: newColor,
    });
  };
  
  // Handle toggle features
  const handleToggleFeature = () => {
    onChange({
      ...value,
      enableFeature: !value.enableFeature,
    });
  };
  
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={5}>
        <Text size={2} weight="semibold">
          Custom Settings Quick Access
        </Text>
        
        <Stack space={3}>
          <Text size={1}>Brand Colors:</Text>
          <Box padding={2}>
            <ColorInput
              value={value?.primaryColor}
              onChange={handleColorChange('primaryColor')}
            />
            <Text size={0} style={{ marginTop: 4 }}>Primary Color</Text>
          </Box>
          
          <Box padding={2}>
            <ColorInput
              value={value?.secondaryColor}
              onChange={handleColorChange('secondaryColor')}
            />
            <Text size={0} style={{ marginTop: 4 }}>Secondary Color</Text>
          </Box>
        </Stack>
        
        <Stack space={2}>
          <Text size={1}>Feature Toggles:</Text>
          <Box padding={2} display="flex" alignItems="center">
            <Switch
              checked={value?.enableFeature || false}
              onChange={handleToggleFeature}
            />
            <Text size={1} style={{ marginLeft: 10 }}>
              Enable Special Feature
            </Text>
          </Box>
        </Stack>
        
        {value?.customCode && (
          <Stack space={2}>
            <Text size={1}>Custom Code Preview:</Text>
            <Code size={0} language="javascript">
              {value.customCode}
            </Code>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
```

#### Example: Central Structure Configuration (structure.ts)
```ts
// sanity/desk-organized-sanity-utilities/structure.ts
import { StructureBuilder } from 'sanity/desk';
import { authorStructure } from './author/author.document-structure';
import { categoryStructure } from './category/category.document-structure';
import { customDocumentStructure } from './custom-document/custom-document.document-structure';
import { settingsStructure } from './settings/settings.structure';
import { testimonialsStructure } from './testimonial/testimonial.document-structure';
import { faqStructure } from './faq/faq.document-structure';

export const getDefaultDocumentNode = (S, { schemaType }) => {
  // Customize views for specific schema types
  return S.document().views([
    S.view.form(),
    // Additional views can be added here
  ]);
};

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Manager')
    .items([
      // Content types
      customDocumentStructure(S),
      S.divider(),
      authorStructure(S),
      categoryStructure(S),
      testimonialsStructure(S),
      faqStructure(S),
      S.divider(),
      // Settings
      settingsStructure(S),
      // Add any additional items
    ]);
```

#### Example: Schema Organization (desk-organized-schemas.ts)
```ts
// sanity/desk-organized-sanity-utilities/desk-organized-schemas.ts
import { authorSchema } from './author/author.document-schema';
import { categorySchema } from './category/category.document-schema';
import { customDocumentSchema } from './custom-document/custom-document.schema';
import { faqSchema } from './faq/faq.document-schema';
import { faqCategorySchema } from './faq-category/faq-category.document-schema';
import { testimonialSchema } from './testimonial/testimonial.document-schema';
import { allSettingsDocumentSchemas } from './settings/all-settings-document-schemas';

// Collect all schemas for registration
export const deskOrganizedSchemas = [
  // Document schemas
  authorSchema,
  categorySchema,
  customDocumentSchema,
  faqSchema,
  faqCategorySchema,
  testimonialSchema,
  // Settings schemas
  ...allSettingsDocumentSchemas,
];
```

## 5. Core Integration Patterns

### Schema Registration Flow
```
Document Schemas → Central Registry → Sanity Config → Studio UI
```

Example flow:
1. Individual schemas: `blog-slug.route-schema.ts`, `service-slug.route-schema.ts`
2. Collected in: `all-route-document-schemas.ts`
3. Combined in: `sanity/all-schemas-combined.ts`
4. Used in: `sanity.config.ts`

### Page Rendering Data Flow
```
Route Component → Server Action → GROQ Query → Sanity → Blocks Renderer
```

Example implementation in a page component:
```typescript
// Simplified example of a page.tsx
export default async function Page({ params }) {
  // 1. Call server action
  const data = await fetchPageBySlug(params.slug);
  
  // 2. Handle errors/not found
  if (!data) {
    notFound();
  }
  
  // 3. Render with Blocks component
  return (
    <main>
      <h1>{data.title}</h1>
      {data.blocks && <Blocks blocks={data.blocks} />}
    </main>
  );
}
```

### Block Integration Pattern
```
Block Schema → Sanity Studio → Content Entry → Block Query → Block Component
```

## 6. General Project Conventions

### File Naming Conventions
- Use kebab-case for directories and files
- Component files: `[name].component.tsx`
- Schema files: `[name].schema.ts`
- Query files: `[name].query.ts`
- Server action files: `[name].server-actions.ts`

### Type System
- Define TypeScript interfaces for all components, props, and data structures
- Use centralized type definitions for shared types
- Export type definitions alongside components

### Feature-Based Organization
- Group related files by feature rather than by technology
- Keep components, utilities, schemas, and queries for a feature together
- Use consistent import patterns across the codebase

### Shared Resources
- Place truly shared components in dedicated directories
- Use consistent naming for shared resources
- Create index files for clean exports 