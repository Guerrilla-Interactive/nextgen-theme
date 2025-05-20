# WCAG Color Pair Field

A reusable Sanity field object for working with color pairs that automatically calculates WCAG accessibility compliance.

## Features

- Background and foreground color selection
- Automatic contrast ratio calculation
- WCAG compliance level determination (AAA, AA, AA Large, or Fail)
- Validation warnings for poor contrast

## Usage

Import the field into your schema:

```typescript
import {wcagColorPairField} from './fields/wcag-color-pair.field';

// Use it in your document schema
defineField({
  name: 'myColorPair',
  title: 'My Color Pair',
  type: 'object',
  fields: [
    wcagColorPairField,
  ],
}),
```

## Utilities

The field also exports utility functions for working with WCAG contrast:

```typescript
import {WCAGUtils} from './fields/wcag-color-pair.field';

// Calculate contrast ratio
const ratio = WCAGUtils.getContrastRatio('#ffffff', '#000000');
// 21.0

// Get compliance level
const level = WCAGUtils.getComplianceLevel(ratio);
// 'AAA'

// Get badge color for compliance level
const badgeColor = WCAGUtils.getBadgeColor(level);
// '#4CAF50' (green for AAA)
```

## WCAG Guidelines

This field enforces the following WCAG contrast guidelines:

- **AAA**: Contrast ratio ≥ 7:1 (Enhanced)
- **AA**: Contrast ratio ≥ 4.5:1 (Standard)
- **AA Large**: Contrast ratio ≥ 3:1 (For large text only)
- **Fail**: Contrast ratio < 3:1 (Non-compliant)

For more information, see [WCAG 2.0 Contrast Guidelines](https://www.w3.org/TR/WCAG20-TECHS/G17.html).

## Implementation

The field shows a warning when contrast is below AA standard (4.5:1), helping content authors maintain accessible color choices.

In Task 4, this will be enhanced with a custom input component to display visual badges for the compliance level. 