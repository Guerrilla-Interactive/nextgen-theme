---
description: 
globs: 
alwaysApply: false
---
 # NextGen Theme Architecture Documentation

## Project Overview

NextGen Theme is a modern, flexible web application built with Next.js 15 and Sanity CMS. It provides a sophisticated theming system with reusable page building blocks, allowing content creators to build complex web pages through a user-friendly content management system. The project follows a modular architecture that separates concerns between content management, presentation, and business logic.

## Tech Stack

### Core Technologies
- **Next.js 15**: React framework for server-rendered applications with built-in routing and API capabilities
- **TypeScript**: For type safety and improved developer experience
- **Sanity CMS**: Headless content management system for structured content
- **TailwindCSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible UI primitives for React components

### Key Dependencies
- **@portabletext/react**: For rendering Sanity's Portable Text format
- **next-sanity**: For integrating Sanity CMS with Next.js
- **react-hook-form**: For form handling
- **zod**: For schema validation
- **Embla Carousel**: For carousel/slider components
- **Mapbox GL**: For map integrations
- **Sonner**: For toast notifications

## Project Structure

### Top-Level Organization

The project follows a feature-based architecture combined with Next.js App Router convention:

```
nextgen-theme/
├── app/                 # Next.js App Router pages and routes
├── features/            # Feature-based organization of components and utilities
├── public/              # Static assets
├── sanity/              # Sanity CMS configuration and schemas
└── types/               # TypeScript type definitions
```

## Detailed Architectural Components

### 1. App Routes Architecture (`app/(main)`)

The `app/(main)` directory implements Next.js App Router route organization using a sophisticated, structured pattern for different content types:

```
📦(main)
 ┣ 📂(root)           # Root routes for basic pages
 ┣ 📂blog             # Blog-specific routes
 ┣ 📂course           # Course-specific routes
 ┣ 📂service          # Service-specific routes
 ┣ 📜all-route-document-schemas.ts
 ┣ 📜layout.tsx
 ┗ 📜not-found.tsx
```

#### Feature-Based Route Organization Pattern

NextGen Theme employs a sophisticated feature-based route architecture with several carefully designed patterns that repeat across different content types:

##### Route Group Hierarchy Pattern

```
app/
├── (main)/              # Main application container
│   ├── (root)/          # Root pages without URL prefix
│   │   ├── (index)/     # Homepage-specific components
│   │   └── [slug]/      # Dynamic general pages
│   ├── blog/            # Blog section (affects URL)
│   │   ├── (index)/     # Blog listing page
│   │   └── [slug]/      # Individual blog post pages
│   ├── course/          # Course section (affects URL)
│   │   └── [slug]/      # Individual course pages
│   └── service/         # Service section (affects URL)
│       └── [slug]/      # Individual service pages
```

Key architectural decisions:
1. **Route Group Naming**: Parentheses (`(main)`, `(root)`, etc.) create logical groups without affecting URL structure
2. **Content Type Separation**: Each content type has its own top-level directory (`blog/`, `course/`, `service/`)
3. **URL-Affecting vs. Non-URL Directories**: Only non-parenthesized directories affect URL paths
4. **Dynamic Routing Pattern**: Consistent use of `[slug]` for content-specific dynamic routes

##### Core Utilities Encapsulation Pattern

For each content type or dynamic route, core utilities are grouped in a parenthesized directory to keep them organized while not affecting URL structure:

```
blog/[slug]/
├── (blog-slug-core-utilities)/
│   ├── blog-slug.desk-structure.ts
│   ├── blog-slug.route-query.ts
│   ├── blog-slug.route-schema.ts
│   └── blog-slug.server-actions.ts
└── page.tsx
```

This pattern is replicated across content types:
- `(blog-slug-core-utilities)/`
- `(course-slug-core-utilities)/`
- `(service-slug-core-utilities)/`

##### Consistent File Naming Convention

Each route implements a predictable file naming convention with the pattern `[content-type].[file-purpose].[file-type].ts(x)`:

**Page Components:**
- `page.tsx`: The main page component (Next.js convention)
- `[content-type]-slug.page-component.tsx`: Content-specific component for complex pages

**Data and Schema Files:**
- `[content-type]-slug.route-query.ts`: GROQ queries for fetching data
- `[content-type]-slug.route-schema.ts`: Sanity schema definitions
- `[content-type]-slug.server-actions.ts`: Server actions for data operations

**Sanity Integration Files:**
- `[content-type]-slug.desk-structure.ts`: Sanity Studio desk configuration

**Internationalization Support:**
- `[content-type]-slug.translations-and-variables.ts`: Translation strings

#### Route Implementation Pattern

The implementation of each route type follows a consistent pattern:

##### 1. Schema Definition and Registration

Each route has a schema file that defines its content model for Sanity. These schemas are collected in `all-route-document-schemas.ts`, which:
- Imports all route-specific schemas
- Organizes them in a structured object
- Exports them as an array for Sanity registration
- Provides constant type definitions for type checking

##### 2. Data Fetching via Server Actions

Each route has server actions for data fetching that follow a consistent pattern:
- Functions to fetch specific content by slug
- Functions to generate static parameters for ISR
- Structured error handling

##### 3. Page Component Structure

Page components follow a pattern that:
- Fetches data using server actions
- Handles metadata generation
- Manages static paths generation for ISR
- Provides fallbacks for missing content
- Renders content using the Blocks component

##### 4. Content-Specific Page Components

For more complex routes, separate component files handle the presentation logic.

#### Central Layout Integration

The `layout.tsx` file in `app/(main)` serves as a shared layout wrapper for all content routes:
- Fetches global settings and footer data
- Provides consistent header and footer across all routes
- Integrates Sanity's Visual Editing for content management
- Implements draft mode toggling for content preview

#### Error Handling Pattern

The architecture includes a consistent error handling pattern with the `not-found.tsx` file for standardized handling of:
- Non-existent routes
- Missing content in dynamic routes
- Invalid slugs or parameters

### 2. Page Builder Blocks Architecture

The page builder blocks system is the core of the CMS flexibility, allowing content creators to construct complex pages from predefined components:

```
📦page-builder-blocks
 ┣ 📂blocks              # Individual block implementations
 ┣ 📂shared              # Shared components and schemas
 ┣ 📂utils               # Utility functions
 ┣ 📜block-component-exporter.tsx  # Exports the Block component renderer
 ┗ 📜block-indexer.tsx   # Registers all blocks in a central registry
```

#### Block Types and Categorization

The blocks directory contains multiple categories of UI components:

1. **Hero Blocks**: Multiple hero section variants (hero-1 through hero-5)
2. **Grid Blocks**: Various grid layouts for cards, posts, pricing
3. **Content Blocks**: Text-focused blocks like section headers, FAQs
4. **Interactive Blocks**: Forms, maps, sliders, carousels
5. **Structural Blocks**: Split sections, two-column layouts, separators

#### Block Implementation Pattern

Each block follows a consistent implementation pattern:

```
📂[block-name]-block
 ┣ 📜[block-name].block-component.tsx  # React component for rendering
 ┣ 📜[block-name].block-query.ts       # GROQ queries for data
 ┣ 📜[block-name].block-schema.tsx     # Sanity schema definition
 ┣ 📜[block-name].block-translation.ts # (Optional) Translations
 ┗ 📜index.ts                         # Exports for central registration
```

Complex blocks may include additional components in a dedicated directory:
```
📂[block-name]-block
 ┣ 📂[block-name]-block-components    # Additional components used by the block
 ┃ ┗ 📜[component-name].component.tsx
 ┣ 📜[block-name].block-component.tsx
 ┗ ... (other files)
```

#### Block Registration System

The `block-indexer.tsx` file serves as a central registry that:
1. Imports all blocks from their individual directories
2. Creates a mapping between block types and their components
3. Registers block schemas with Sanity
4. Provides TypeScript type definitions for blocks

This centralized registration allows the `Blocks` component in `block-component-exporter.tsx` to:
1. Accept an array of blocks from Sanity
2. Look up the appropriate component for each block type
3. Render each block with its specific props

#### Shared Resources

The `shared` directory contains:

1. **Button Components**: Reusable button components with schemas
2. **Shared Schemas**: Common schema patterns used across multiple blocks
   - Block content (rich text) schemas
   - Color variant schemas
   - Layout variants
   - Link schemas
   - Section padding configurations

### 3. Context System Architecture

The context system provides application-wide state management using React Context:

```
📦context
 ┣ 📂screen-status         # Responsive design context
 ┣ 📂session-status        # User session context
 ┣ 📜global-context.tsx    # Global context provider
 ┣ 📜nextgen-context-panel-toggle.tsx
 ┗ 📜nextgen-context-panel.tsx
```

#### Context Organization Pattern

Each context follows a pattern of separating:
1. **State definitions**: Types and initial states
2. **Hooks**: Custom hooks for accessing context

```
📂screen-status
 ┣ 📜screen-status.hooks.ts   # Custom hooks for accessing screen state
 ┗ 📜screen-status.states.ts  # Screen state definitions and defaults
```

#### Screen Status Context

The screen status context:
1. Tracks viewport dimensions and breakpoints
2. Provides responsive design information to components
3. Updates automatically on window resize
4. Exposes hooks like `useScreenStatus()` for components to access

#### Session Status Context

The session status context:
1. Manages user authentication state
2. Tracks session information
3. Provides login/logout functionality
4. Exposes hooks like `useSessionContext()` for components

#### Global Context

The `global-context.tsx` file:
1. Combines multiple contexts into a single provider
2. Ensures proper context nesting
3. Provides a clean API for component consumption

#### Context Debug Panel

The context panel components:
1. `nextgen-context-panel.tsx`: Displays current context values for debugging
2. `nextgen-context-panel-toggle.tsx`: Toggles visibility of the debug panel

### 4. Sanity Desk Organization

The Sanity desk organization provides a structured approach to organizing content in the Sanity Studio:

```
📦desk-organized-sanity-utilities
 ┣ 📂author            # Author document type
 ┣ 📂category          # Category document type
 ┣ 📂faq               # FAQ document type
 ┣ 📂faq-category      # FAQ category document type
 ┣ 📂settings          # Settings document types
 ┣ 📂structure-utilities # Utilities for desk structure
 ┣ 📂testimonial       # Testimonial document type
 ┣ 📜desk-organized-schemas.ts
 ┗ 📜structure.ts
```

#### Document Type Pattern

Each document type follows a consistent pattern:

```
📂[document-type]
 ┣ 📜[document-type].document-queries.ts   # GROQ queries for the document
 ┣ 📜[document-type].document-schema.ts    # Sanity schema definition
 ┗ 📜[document-type].document-structure.ts # Desk structure configuration
```

#### Settings Organization

The settings directory uses a more complex structure for global configurations:

```
📂settings
 ┣ 📂footer-settings
 ┣ 📂header-settings
 ┣ 📂menu-settings
 ┣ 📂metadata-settings
 ┣ 📂site-settings
 ┣ 📜all-settings-document-schemas.ts
 ┣ 📜settings.query.ts
 ┗ 📜settings.structure.ts
```

Each settings type has:
1. Schema definitions
2. Queries for fetching settings
3. Custom components for editing (where applicable)

#### Structure Utilities

The structure utilities provide reusable configurations for:
1. **Document lists**: Configurable document listing components
2. **Parent-child relationships**: Hierarchical document structures
3. **Presentation resolvers**: Custom rendering of documents in preview

## Core Integration Patterns

These four architectural areas work together through several key integration patterns:

### 1. Schema Registration Flow

```
Document Schemas → Central Registry → Sanity Config → Studio UI
```

1. Document schemas are defined in individual files
2. They're collected in central registries (`all-route-document-schemas.ts`, `desk-organized-schemas.ts`)
3. These registries feed into `sanity/all-schemas-combined.ts`
4. The combined schema is used in `sanity.config.ts`

### 2. Page Rendering Data Flow

```
Route Component → Server Action → GROQ Query → Sanity → Blocks Renderer
```

1. Route components (`page.tsx`) call server actions
2. Server actions use route-specific queries
3. Queries fetch page data including blocks
4. The `Blocks` component renders each block using the block registry

### 3. Block Integration Pattern

```
Block Schema → Sanity Studio → Content Entry → Block Query → Block Component
```

1. Block schemas define the editable fields in Sanity Studio
2. Content creators configure blocks in the Studio
3. Block queries fetch the specific data needed by each block
4. Block components render the data using consistent patterns

### 4. Context Integration

```
Context Provider → Page Layout → Component Hooks → Responsive UI
```

1. Context providers wrap the application in `global-context.tsx`
2. The layout component sets up the page structure
3. Individual components use context hooks
4. UI adapts based on context state (screen size, session, etc.)

## Key Features and Implementation Details

### 1. Dynamic Page Rendering

Pages are constructed from blocks stored in Sanity. The `Blocks` component in `features/page-builder-blocks/block-component-exporter.tsx` maps each block to its corresponding React component.

### 2. Visual Editing

Sanity's Visual Editing feature is integrated, allowing content editors to see changes in real-time and edit content directly on the website.

### 3. Responsive Design

The site is fully responsive with:
- Mobile navigation
- Responsive grid layouts
- Screen size context providers

### 4. Form Handling

Contact forms and newsletter sign-ups use:
- react-hook-form for form state management
- zod for validation
- Server actions for processing submissions

### 5. SEO Optimization

SEO features include:
- Dynamic metadata generation
- Structured data
- Sitemap generation
- OpenGraph images

## Development Workflow

### Local Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run linting
npm run typecheck # Run TypeScript type checking
```

### Deployment

The application is designed to be deployed on platforms like Vercel, with environment variables for:
- Sanity project configuration
- API keys for third-party services
- Site URL and environment settings

## Conclusion

NextGen Theme represents a sophisticated, modular architecture that combines the flexibility of Next.js with the structured content approach of Sanity CMS. The modular page building system allows content creators to build complex pages without developer intervention while maintaining design consistency.

The feature-based route architecture provides several advantages:
- **Content Type Isolation**: Each content type has its own directory and files
- **Consistent Implementation**: Repeating patterns make the codebase predictable
- **Clean URLs**: Route groups organize code without affecting URL structure
- **Scalability**: New content types can follow the established patterns
- **Maintainability**: Components, queries, and schemas are co-located
- **Clear Separation of Concerns**: Data fetching, schema definition, and presentation are separated

The separation of concerns between content management, presentation, and business logic makes the codebase maintainable and extensible, enabling future growth and feature additions. The consistent architectural patterns across different parts of the system ensure that new developers can quickly understand and contribute to the project.