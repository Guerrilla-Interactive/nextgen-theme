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

### App Directory (Next.js Routes)

The app directory follows Next.js App Router conventions with route groups:

```
app/
├── (main)/              # Main website routes (client-facing)
│   ├── (root)/          # Root pages
│   ├── blog/            # Blog pages
│   ├── course/          # Course pages 
│   └── service/         # Service pages
├── api/                 # API routes
│   ├── contact/         # Contact form API
│   └── draft-mode/      # Sanity draft mode toggle API
└── studio/             # Sanity Studio embedded in the website
```

Each route group typically includes:
- `page.tsx` - The page component
- `***.route-query.ts` - Sanity queries for fetching data
- `***.route-schema.ts` - Schema definitions for the route
- `***.server-actions.ts` - Server actions for data fetching/mutation

### Features Directory

The features directory organizes code by feature domains:

```
features/
├── context/            # React context providers and hooks
├── page-builder-blocks/ # Page building block components for Sanity
│   ├── blocks/         # Individual block types
│   ├── shared/         # Shared block components and schemas
│   └── utils/          # Block-related utilities
├── theme/              # Theme components (header, footer, etc.)
└── unorganized-components/ # Utility and shared components
```

The page-builder-blocks directory is particularly important as it contains the modular building blocks used by Sanity to construct pages. Each block typically follows this pattern:
- `block-component.tsx` - React component for rendering
- `block-query.ts` - Sanity queries for the block
- `block-schema.tsx` - Sanity schema definition
- `block-translation.ts` (optional) - Translations for the block

### Sanity Directory

The Sanity directory contains all CMS-related configuration:

```
sanity/
├── desk-organized-sanity-utilities/ # Sanity desk structure configuration
├── lib/                            # Sanity client configuration
├── sanity-studio-components/       # Custom Sanity Studio components
└── type-organized-schemas/         # Sanity schema definitions
```

## Core Architectural Patterns

### 1. Content Management with Sanity CMS

Sanity is used as a headless CMS with a structured approach to content:

- **Document Types**: Core content types (pages, blog posts, courses, services)
- **Page Building Blocks**: Modular components that can be composed in Sanity Studio
- **Settings**: Global site configuration stored as singleton documents

The Sanity Studio is embedded directly in the Next.js application, providing an integrated authoring experience.

### 2. Routing and Data Fetching

Next.js App Router handles routing with a combination of:

- **Static Generation**: Most pages are statically generated at build time with ISR (Incremental Static Regeneration)
- **Server Components**: React Server Components are used for data fetching
- **Server Actions**: For form submissions and other mutations

GROQ queries (Sanity's query language) are used to fetch data from Sanity, with specialized query files for each route and block.

### 3. Page Building System

The page building system is a core feature enabling content creators to construct pages using pre-defined blocks:

1. **Block Definition**: Each block has a schema, component, and query
2. **Block Registry**: All blocks are registered in a central registry
3. **Block Renderer**: A component that renders blocks based on their type

This pattern allows for a composable page structure while maintaining control over the design system.

### 4. Design System

The project implements a design system with:

- **TailwindCSS**: For utility-based styling
- **Custom UI Components**: Based on Radix UI primitives
- **Theming**: Light/dark mode support via next-themes
- **Typography**: Custom font configuration

### 5. Internationalization

The project includes support for multilingual content with:

- **URL Rewrites**: For language-specific URLs (e.g., /kurs → /course)
- **Translation Files**: Block-specific translation files
- **Translation Utilities**: Helpers for managing translations

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

The separation of concerns between content, presentation, and business logic makes the codebase maintainable and extensible, enabling future growth and feature additions.