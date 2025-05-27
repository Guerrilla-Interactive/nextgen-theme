// Design tokens document schema for nextgen-styleguide
// Provides a singleton document with basic and advanced modes for managing design tokens
import React from 'react'
import {defineField, defineType} from 'sanity'

// Import field definitions
import {colorPairField} from './fields/color-pair-field'
import {ReadOnlySlugInput} from '../../../plugins/read-only-slug-plugin'
import {colorDisplayField} from './fields/color-display.field'

/**
 * Design Tokens Document Schema
 * Singleton document for storing all design tokens with conditional fields based on mode
 */
export const designTokensType = defineType({
  name: 'designTokens',
  title: 'Design Tokens',
  type: 'document',
  // Groups define the tabs shown in the document form
  groups: [
    {
      name: 'basic',
      title: 'Basic Settings',
      default: true,
    },
    {
      name: 'typography',
      title: 'Typography',
    },
    {
      name: 'colors',
      title: 'Color Tokens',
    },
    {
      name: 'spacing',
      title: 'Spacing & Layout',
    },
    {
      name: 'components',
      title: 'Component Overrides',
    },
  ],
  fields: [
    // --- BASIC MODE FIELDS ---
    
    // Primary Colors using WCAG color pair field (now as array)
    defineField({
      name: 'primaryColors',
      title: 'Primary Colors',
      description: 'Main brand colors and their foreground/text colors',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'colorName',
            title: 'Color Name',
            type: 'string',
            validation: Rule => Rule.required().error('Color name is required')
          }),
          colorPairField
        ],
        preview: {
          select: {
            colorName: 'colorName',
            background: 'colorPair.background.hex',
            foreground: 'colorPair.foreground.hex',
          },
          prepare({colorName, background, foreground}) {
            return {
              title: colorName || 'Primary Color',
              subtitle: background ? `Background: ${background}, Foreground: ${foreground}` : 'Not set',
              media: () => {
                // Return a colored circle emoji
                return '🔵';
              }
            };
          }
        },
      }],
      validation: Rule => Rule.min(1).error('At least one primary color is required')
    }),

    // Backward compatibility for legacy primaryColor field
    defineField({
      name: 'primaryColor',
      title: 'Legacy Primary Color',
      description: 'Main brand color (legacy format)',
      type: 'object',
      hidden: true, // Hide this field as it's for backward compatibility only
      fields: [
        colorPairField,
      ],
    }),

    // Secondary Colors using WCAG color pair field (now as array)
    defineField({
      name: 'secondaryColors',
      title: 'Secondary Colors',
      description: 'Secondary brand colors and their foreground/text colors',
      type: 'array',
      group: 'basic',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'colorName',
            title: 'Color Name',
            type: 'string',
            validation: Rule => Rule.required().error('Color name is required')
          }),
          colorPairField
        ],
        preview: {
          select: {
            colorName: 'colorName',
            background: 'colorPair.background.hex',
            foreground: 'colorPair.foreground.hex',
          },
          prepare({colorName, background, foreground}) {
            return {
              title: colorName || 'Secondary Color',
              subtitle: background ? `Background: ${background}, Foreground: ${foreground}` : 'Not set',
              media: () => {
                // Return a colored circle emoji
                return '🟠';
              }
            };
          }
        },
      }],
      validation: Rule => Rule.min(1).error('At least one secondary color is required')
    }),

    // Backward compatibility for legacy secondaryColor field
    defineField({
      name: 'secondaryColor',
      title: 'Legacy Secondary Color',
      description: 'Secondary brand color (legacy format)',
      type: 'object',
      hidden: true, // Hide this field as it's for backward compatibility only
      fields: [
        colorPairField,
      ],
    }),

    // Color Display - shows a live preview of colors
    {...colorDisplayField, group: 'basic'},

    // Border Radius
    defineField({
      name: 'radius',
      title: 'Border Radius',
      description: 'Default border radius for components',
      type: 'object',
      group: 'basic',
      fields: [
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: ['px', 'rem', '%'],
            layout: 'radio',
          },
          initialValue: 'rem',
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'number',
          initialValue: 0.5,
          validation: Rule => Rule.required().error('Border radius value is required'),
        }),
      ],
    }),

    // Font Selection
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      description: 'Primary font for the application',
      type: 'object',
      group: 'basic',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading Font',
          type: 'string',
          options: {
            list: [
              'Inter, sans-serif',
              'Roboto, sans-serif',
              'Montserrat, sans-serif',
              'Merriweather, serif',
              'system-ui, sans-serif',
            ],
          },
          initialValue: 'Inter, sans-serif',
          validation: Rule => Rule.required().error('Heading font is required'),
        }),
        defineField({
          name: 'body',
          title: 'Body Font',
          type: 'string',
          options: {
            list: [
              'Inter, sans-serif',
              'Roboto, sans-serif',
              'Montserrat, sans-serif',
              'Merriweather, serif',
              'system-ui, sans-serif',
            ],
          },
          initialValue: 'Inter, sans-serif',
          validation: Rule => Rule.required().error('Body font is required'),
        }),
      ],
    }),

    // --- ADVANCED MODE FIELDS ---

    // Color Palette (visible in advanced mode)
    defineField({
      name: 'colorPalette',
      title: 'Color Palette',
      description: 'Full color palette with shades',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required().error('Color name is required'),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Variable name in CSS (will be read-only after publish)',
              options: {
                source: 'colorPalette[].name',
                maxLength: 30,
              },
              components: {
                input: ReadOnlySlugInput
              },
              validation: Rule => Rule.required().error('Slug is required for CSS variable generation'),
            }),
            colorPairField,
            defineField({
              name: 'shades',
              title: 'Shades',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Shade Name',
                      type: 'string',
                      options: {
                        list: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
                      },
                      validation: Rule => Rule.required().error('Shade name is required'),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Color Value',
                      type: 'color',
                      validation: Rule => Rule.required().error('Color value is required'),
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      group: 'colors',
    }),

    // Typography Scale (visible in advanced mode)
    defineField({
      name: 'typographyScale',
      title: 'Typography Scale',
      description: 'Font size and line height scale',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              options: {
                list: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
              },
              validation: Rule => Rule.required().error('Typography size name is required'),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Variable name in CSS (will be read-only after publish)',
              options: {
                source: 'typographyScale[].name',
                maxLength: 30,
              },
              components: {
                input: ReadOnlySlugInput
              },
              validation: Rule => Rule.required().error('Slug is required for CSS variable generation'),
            }),
            defineField({
              name: 'fontSize',
              title: 'Font Size',
              type: 'string',
              validation: Rule => Rule.required().error('Font size is required'),
            }),
            defineField({
              name: 'lineHeight',
              title: 'Line Height',
              type: 'string',
              validation: Rule => Rule.required().error('Line height is required'),
            }),
          ],
        },
      ],
      group: 'typography',
    }),

    // Spacing Scale (visible in advanced mode)
    defineField({
      name: 'spacingScale',
      title: 'Spacing Scale',
      description: 'Spacing and sizing values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              options: {
                list: ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32'],
              },
              validation: Rule => Rule.required().error('Spacing name is required'),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Variable name in CSS (will be read-only after publish)',
              options: {
                source: 'spacingScale[].name',
                maxLength: 30,
              },
              components: {
                input: ReadOnlySlugInput
              },
              validation: Rule => Rule.required().error('Slug is required for CSS variable generation'),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required().error('Spacing value is required'),
            }),
          ],
        },
      ],
      group: 'spacing',
    }),

    // Component Overrides (visible in advanced mode)
    defineField({
      name: 'componentOverrides',
      title: 'Component Overrides',
      description: 'Token overrides for specific components',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'component',
              title: 'Component',
              type: 'string',
              options: {
                list: ['button', 'card', 'input', 'navigation', 'modal'],
                layout: 'radio',
              },
              validation: Rule => Rule.required().error('Component name is required'),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              description: 'Variable name in CSS (will be read-only after publish)',
              options: {
                source: 'componentOverrides[].component',
                maxLength: 30,
              },
              components: {
                input: ReadOnlySlugInput
              },
              validation: Rule => Rule.required().error('Slug is required for CSS variable generation'),
            }),
            defineField({
              name: 'colorOverrides',
              title: 'Color Overrides',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'designTokens'}],
                  weak: true,
                  // Will be expanded in Task 10: Implement Reference Fields for Component Overrides
                }
              ]
            }),
            defineField({
              name: 'radiusOverride',
              title: 'Border Radius Override',
              type: 'object',
              fields: [
                defineField({
                  name: 'unit',
                  title: 'Unit',
                  type: 'string',
                  options: {
                    list: ['px', 'rem', '%'],
                    layout: 'radio',
                  },
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'number',
                }),
              ],
            }),
          ],
        },
      ],
      group: 'components',
    }),
  ],
}); 