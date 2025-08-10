import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBrand, useUIContext } from "../BrandContext";
import { FontPicker } from "../../brand-fonts/FontPicker";
import { Button } from "@/features/unorganized-components/ui/button";
import {
  Type,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Sliders,
  Hash,
  Plus
} from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";
import type { FontToken } from "../brand-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/unorganized-components/ui/select";
import { Slider } from "@/features/unorganized-components/ui/slider";

// Tailwind font size scale - this is what users will modify
const TAILWIND_FONT_SIZES = [
  { key: 'text-xs', label: 'XS', defaultValue: 0.75 },
  { key: 'text-sm', label: 'SM', defaultValue: 0.875 },
  { key: 'text-base', label: 'Base', defaultValue: 1 },
  { key: 'text-lg', label: 'LG', defaultValue: 1.125 },
  { key: 'text-xl', label: 'XL', defaultValue: 1.25 },
  { key: 'text-2xl', label: '2XL', defaultValue: 1.5 },
  { key: 'text-3xl', label: '3XL', defaultValue: 1.875 },
  { key: 'text-4xl', label: '4XL', defaultValue: 2.25 },
  { key: 'text-5xl', label: '5XL', defaultValue: 3 },
  { key: 'text-6xl', label: '6XL', defaultValue: 3.75 }
];

// Tailwind line-height utilities
const TAILWIND_LINE_HEIGHTS = [
  { key: 'leading-none', label: 'None', value: 1 },
  { key: 'leading-tight', label: 'Tight', value: 1.25 },
  { key: 'leading-snug', label: 'Snug', value: 1.375 },
  { key: 'leading-normal', label: 'Normal', value: 1.5 },
  { key: 'leading-relaxed', label: 'Relaxed', value: 1.625 },
  { key: 'leading-loose', label: 'Loose', value: 2 },
];

// Tailwind letter-spacing utilities
const TAILWIND_TRACKING = [
  { key: 'tracking-tighter', label: 'Tighter', value: -0.05 },
  { key: 'tracking-tight', label: 'Tight', value: -0.025 },
  { key: 'tracking-normal', label: 'Normal', value: 0 },
  { key: 'tracking-wide', label: 'Wide', value: 0.025 },
  { key: 'tracking-wider', label: 'Wider', value: 0.05 },
  { key: 'tracking-widest', label: 'Widest', value: 0.1 },
];

// Computed slider ranges from utilities
const SIZE_MIN = Math.min(...TAILWIND_FONT_SIZES.map(s => s.defaultValue));
const SIZE_MAX = Math.max(...TAILWIND_FONT_SIZES.map(s => s.defaultValue));
const LH_MIN = Math.min(...TAILWIND_LINE_HEIGHTS.map(s => s.value));
const LH_MAX = Math.max(...TAILWIND_LINE_HEIGHTS.map(s => s.value));
const TRACK_MIN = Math.min(...TAILWIND_TRACKING.map(s => s.value));
const TRACK_MAX = Math.max(...TAILWIND_TRACKING.map(s => s.value));

// Define font role categories and their display order
const fontRoleCategoriesOrder: string[] = [
  "Content Text",
  "Headings",
  "UI Elements",
  "Special Purpose"
];

// Map font roles to categories
const fontRoleToCategoryMap: Record<string, string> = {
  // Content Text
  body: "Content Text",
  p: "Content Text",
  default: "Content Text",
  sans: "Content Text",
  blockquote: "Content Text",

  // Headings
  h1: "Headings",
  h2: "Headings",
  h3: "Headings",
  h4: "Headings",
  h5: "Headings",
  h6: "Headings",
  heading: "Headings",
  // display: hidden below

  // UI Elements
  button: "UI Elements",
  label: "UI Elements",
  input: "UI Elements",
  badge: "UI Elements",
  caption: "UI Elements",

  // Special Purpose
  code: "Special Purpose",
  mono: "Special Purpose",
  serif: "Special Purpose",
};
// Roles to hide from UI
const HIDDEN_ROLE_NAMES = new Set([
  'display',
  'hero-title', 'hero title', 'hero',
  'nav-title', 'nav title', 'nav',
  'title'
]);

// Font role group definitions
interface FontRoleGroupDefinition {
  name: string;
  description: string;
  priority: number;
  roles: Array<{
    role: string;
    isPrimary?: boolean;
  }>;
  category: string;
}

const fontRoleGroupDefinitions: FontRoleGroupDefinition[] = [
  {
    name: "Headings",
    description: "All heading styles from large display text to smaller subheadings used throughout your application.",
    priority: 1,
    category: "Headings",
    roles: [
      { role: 'h1', isPrimary: true },
      { role: 'h2' },
      { role: 'h3' },
      { role: 'h4' },
      { role: 'h5' },
      { role: 'h6' },
      { role: 'heading' },
      // display removed
    ]
  },
  {
    name: "Font Stacks",
    description: "Base font stacks used throughout the theme, including mono and body.",
    priority: 2,
    category: "Special Purpose",
    roles: [
      { role: 'sans', isPrimary: true },
      { role: 'serif' },
      { role: 'mono' },
      { role: 'body' }
    ]
  },
  {
    name: "Body Text",
    description: "Main content text used throughout your application for paragraphs and readable content.",
    priority: 3,
    category: "Content Text",
    roles: [
      // body moved to Font Stacks group
      { role: 'p' },
      { role: 'blockquote' },
      { role: 'default' }
    ]
  },
  {
    name: "Interactive Elements",
    description: "Typography for buttons, labels, and other interactive UI components.",
    priority: 3,
    category: "UI Elements",
    roles: [
      { role: 'button', isPrimary: true },
      { role: 'label' },
      { role: 'input' }
    ]
  },
  {
    name: "Small Text",
    description: "Typography for captions, badges, and other small text elements.",
    priority: 4,
    category: "UI Elements",
    roles: [
      { role: 'caption', isPrimary: true },
      { role: 'badge' }
    ]
  },
  {
    name: "Code & Monospace",
    description: "Monospaced fonts for code blocks, technical content, and data display.",
    priority: 5,
    category: "Special Purpose",
    roles: [
      { role: 'code', isPrimary: true },
      { role: 'mono' }
    ]
  }
];

// Preview texts for each role
const rolePreviewTexts: Record<string, string> = {
  body: "This is body text for reading",
  p: "Paragraph text content",
  default: "Default text content",
  blockquote: "“Quoted content with emphasis”",
  h1: "Main Heading",
  h2: "Section Heading",
  h3: "Subsection Heading",
  h4: "Minor Heading",
  h5: "Small Heading",
  h6: "Smallest Heading",
  heading: "General Heading",
  display: "Display Text",
  button: "Button",
  label: "Label",
  input: "Input text",
  code: "code text",
  badge: "Badge",
  caption: "Caption text",
  sans: "Sans Serif",
  serif: "Serif",
  mono: "Monospace",
};

interface ProcessedFontToken extends FontToken {
  effectiveInfluence: number;
  importanceSummary: string;
  topRoles: string[];
}

interface FontRoleAssignment {
  role: string;
  assignedFont: ProcessedFontToken | null;
  fontFamily: string | null;
  influence: number;
  category: string;
  assignedSize: string;
}

interface FontRoleGroup {
  type: 'group';
  subCategoryName: string;
  description: string;
  roles: FontRoleAssignment[];
}

interface TypographyTabProps {
  activeThemeKey: string;
}

export function TypographyTab({ activeThemeKey }: TypographyTabProps) {
  const {
    brand,
    processedBrand,
    undo,
    canUndo,
    updateFontRoleAssignment,
    handleFontRoleSwatchSelection,
    handleFontRoleDirectChange,
    addNewFont,
    updateFontWeightAssignment,
    getFontWeightForRole,
    updateFontSizeAssignment,
    getFontSizeForRole,
    updateLineHeightForRole,
    updateLetterSpacingForRole
  } = useBrand();

  const { selectedTypographyRole, setSelectedTypographyRole } = useUIContext();

  const [selectedRole, setSelectedRole] = useState<string>('h1');

  // Listen for selected typography role from UI context
  useEffect(() => {
    if (selectedTypographyRole) {
      setSelectedRole(selectedTypographyRole);
    }
  }, [selectedTypographyRole]);
  const [selectedFont, setSelectedFont] = useState<{ name: string; displayName?: string; family: string } | null>(null);
  const [fontName, setFontName] = useState('');

  // State for Tailwind font size scale
  const [fontSizeScale, setFontSizeScale] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TAILWIND_FONT_SIZES.forEach(size => {
      initial[size.key] = size.defaultValue;
    });
    return initial;
  });

  // State for role to size assignments
  const [roleSizeAssignments, setRoleSizeAssignments] = useState<Record<string, string>>({
    body: 'text-base',
    p: 'text-base',
    default: 'text-base',
    blockquote: 'text-base',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    display: 'text-5xl',
    code: 'text-sm',
    button: 'text-sm',
    caption: 'text-xs',
    badge: 'text-xs',
  });

  // Generate processed fonts
  const processedFonts = useMemo(() => {
    if (!processedBrand?.fonts && !brand?.fonts) return [];

    const fonts = processedBrand?.fonts || brand?.fonts || [];

    return fonts.map((font): ProcessedFontToken => {
      const roleInfluences = (font.roles || []).map(role => {
        if (role.includes('heading') || role.includes('display')) return 100;
        if (role.includes('body') || role.includes('text')) return 80;
        if (role.includes('button') || role.includes('label')) return 60;
        return 40;
      });

      const maxInfluence = Math.max(...roleInfluences, 0);
      const topRoles = (font.roles || []).filter((role, index) => roleInfluences[index] === maxInfluence);

      let importanceSummary = "General";
      if (topRoles.some(role => role.includes('heading'))) importanceSummary = "Heading";
      else if (topRoles.some(role => role.includes('body'))) importanceSummary = "Body";

      return {
        ...font,
        effectiveInfluence: maxInfluence,
        importanceSummary,
        topRoles
      };
    }).sort((a, b) => b.effectiveInfluence - a.effectiveInfluence);
  }, [processedBrand, brand]);

  // Create role-based view data with proper categorization and grouping
  const fontRoleGroups = useMemo(() => {
    // Build role-to-font mapping
    const roleToFontMap = new Map<string, ProcessedFontToken | null>();

    processedFonts.forEach(font => {
      font.roles?.forEach(role => {
        if (!roleToFontMap.has(role)) {
          roleToFontMap.set(role, font);
        }
      });
    });

    // Inject the currently selected role (from UI targeting) if it doesn't exist yet
    if (selectedTypographyRole && !roleToFontMap.has(selectedTypographyRole)) {
      roleToFontMap.set(selectedTypographyRole, null);
    }
    // Ensure blockquote appears even if no font claims it yet
    if (!roleToFontMap.has('blockquote')) {
      roleToFontMap.set('blockquote', null);
    }
    // Ensure stacks appear
    ['sans','serif','mono','body'].forEach(r => { if (!roleToFontMap.has(r)) roleToFontMap.set(r, null); });

    // Remove hidden roles from the map
    Array.from(roleToFontMap.keys()).forEach(r => {
      const norm = r.replace(/\s+/g, '-').toLowerCase();
      if (HIDDEN_ROLE_NAMES.has(norm)) {
        roleToFontMap.delete(r);
      }
    });

    const createRoleAssignment = (role: string): FontRoleAssignment => {
      const assignedFont = roleToFontMap.get(role) || null;
      const category = fontRoleToCategoryMap[role] || "Special Purpose";
      const influence = assignedFont?.effectiveInfluence || 0;
      const assignedSize = roleSizeAssignments[role] || 'text-base';

      return {
        role,
        assignedFont,
        fontFamily: assignedFont?.family || null,
        influence,
        category,
        assignedSize
      };
    };

    const allRoles = Array.from(roleToFontMap.keys());
    const processedRoles = new Set<string>();
    const groups: FontRoleGroup[] = [];

    // Process role groups in priority order
    fontRoleGroupDefinitions
      .sort((a, b) => a.priority - b.priority)
      .forEach(groupDef => {
        const availableRoles = groupDef.roles.filter(roleInfo =>
          allRoles.includes(roleInfo.role) && !processedRoles.has(roleInfo.role) && !HIDDEN_ROLE_NAMES.has(roleInfo.role)
        );

        if (availableRoles.length === 0) {
          return;
        }

        const roleAssignments = availableRoles.map(roleInfo => createRoleAssignment(roleInfo.role));

        groups.push({
          type: 'group',
          subCategoryName: groupDef.name,
          description: groupDef.description,
          roles: roleAssignments,
        });

        availableRoles.forEach(roleInfo => processedRoles.add(roleInfo.role));
      });

    // Handle any remaining ungrouped roles (including injected selected role)
    const ungroupedRoles = allRoles.filter(role => !processedRoles.has(role));
    ungroupedRoles.forEach(role => {
      if (HIDDEN_ROLE_NAMES.has(role)) return;
      groups.push({
        type: 'group',
        subCategoryName: role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' '),
        description: `Individual role: ${role.replace(/-/g, ' ')}`,
        roles: [createRoleAssignment(role)],
      });
    });

    return groups;
  }, [processedFonts, roleSizeAssignments, selectedTypographyRole]);

  // Generate font swatches
  const fontSwatches = useMemo(() =>
    brand?.fonts?.map(f => ({
      name: f.name.toLowerCase().replace(/\s+/g, '-'),
      displayName: f.name,
      family: f.family,
      distributor: f.distributor,
      weights: f.weights
    })) || [],
    [brand]
  );

  // Initialize font weight assignments when brand loads
  useEffect(() => {
    if (!brand?.fonts) return;

    console.log('[TypographyTab] Initializing font weight assignments...');

    // For each font, ensure all its roles have weight assignments
    brand.fonts.forEach(font => {
      if (!font.roles || !font.weights) return;

      font.roles.forEach(role => {
        const currentWeight = getFontWeightForRole(font.name, role);
        console.log(`[TypographyTab] Role "${role}" in font "${font.name}": currentWeight = ${currentWeight}`);

        // If no weight is assigned to this role, assign a default
        if (!currentWeight) {
          let defaultWeight = 'regular';

          // Choose appropriate default weight based on role
          if (role.includes('h') || role === 'heading' || role === 'display') {
            // For headings, prefer semibold > bold > medium > regular
            if (font.weights['semibold']) defaultWeight = 'semibold';
            else if (font.weights['bold']) defaultWeight = 'bold';
            else if (font.weights['medium']) defaultWeight = 'medium';
            else if (font.weights['regular']) defaultWeight = 'regular';
            else defaultWeight = Object.keys(font.weights)[0]; // First available
          } else {
            // For body text, prefer regular > medium
            if (font.weights['regular']) defaultWeight = 'regular';
            else if (font.weights['medium']) defaultWeight = 'medium';
            else defaultWeight = Object.keys(font.weights)[0]; // First available
          }

          console.log(`[TypographyTab] Assigning default weight "${defaultWeight}" to role "${role}" for font "${font.name}"`);
          updateFontWeightAssignment(font.name, role, defaultWeight);
        }
      });
    });
  }, [brand, getFontWeightForRole, updateFontWeightAssignment]);

  // Initialize state from brand context when available
  useEffect(() => {
    if (brand?.fonts) {
      // Initialize font size scale from brand font sizes
      const newFontSizeScale: Record<string, number> = {};
      TAILWIND_FONT_SIZES.forEach(size => {
        newFontSizeScale[size.key] = size.defaultValue;
      });

      // Override with actual values from brand fonts if they exist
      brand.fonts.forEach(font => {
        if (font.fontSizes) {
          Object.entries(font.fontSizes).forEach(([role, sizeValue]) => {
            // Try to find which Tailwind size this rem value corresponds to
            const matchingSize = TAILWIND_FONT_SIZES.find(s => Math.abs(s.defaultValue - sizeValue) < 0.01);
            if (matchingSize) {
              newFontSizeScale[matchingSize.key] = sizeValue;
            }
          });
        }
      });

      setFontSizeScale(newFontSizeScale);

      // Initialize role size assignments from brand context
      const newRoleAssignments: Record<string, string> = {
        body: 'text-base',
        p: 'text-base',
        default: 'text-base',
        blockquote: 'text-base',
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        h4: 'text-xl',
        h5: 'text-lg',
        h6: 'text-base',
        display: 'text-5xl',
        code: 'text-sm',
        button: 'text-sm',
        caption: 'text-xs',
        badge: 'text-xs',
      };

      // Override with actual role assignments from brand if they exist
      brand.fonts.forEach(font => {
        if (font.fontSizes) {
          Object.entries(font.fontSizes).forEach(([role, sizeValue]) => {
            // Find the best matching Tailwind size key
            const matchingSize = TAILWIND_FONT_SIZES.find(s => Math.abs(s.defaultValue - sizeValue) < 0.01);
            if (matchingSize) {
              newRoleAssignments[role] = matchingSize.key;
            }
          });
        }
      });

      setRoleSizeAssignments(newRoleAssignments);
    }
  }, [brand]);

  // Get the currently selected role's font information
  const selectedRoleInfo = useMemo(() => {
    const roleAssignment = fontRoleGroups
      .flatMap(group => group.roles)
      .find(assignment => assignment.role === selectedRole);

    return roleAssignment;
  }, [fontRoleGroups, selectedRole]);

  // Derive weight name from CSS variable if brand has none
  const cssWeightForSelectedRole = useMemo(() => {
    if (typeof window === 'undefined') return null as number | null;
    const w = getComputedStyle(document.documentElement).getPropertyValue(`--font-weight-${selectedRole}`).trim();
    const parsed = w ? parseInt(w, 10) : NaN;
    return Number.isNaN(parsed) ? null : parsed;
  }, [selectedRole]);

  // Initialize selectedFont when selectedRole changes
  useEffect(() => {
    if (selectedRoleInfo?.assignedFont) {
      const matchingFont = fontSwatches.find(font => font.displayName === selectedRoleInfo.assignedFont?.name);

      if (matchingFont) {
        setSelectedFont(matchingFont);
        setFontName(matchingFont.displayName || matchingFont.name);
      } else {
        setSelectedFont(null);
        setFontName('');
      }
    } else {
      setSelectedFont(null);
      setFontName('');
    }
  }, [selectedRole, selectedRoleInfo, fontSwatches]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedTypographyRole(role);
  };

  // Handle font selection
  const handleFontSelect = (font: { name: string; displayName?: string; family: string }) => {
    setSelectedFont(font);
    setFontName(font.displayName || font.name);

    // Apply the font to the selected role
    handleFontRoleSwatchSelection(selectedRole, font.displayName || font.name);
  };

  // Handle creating new font
  const handleCreateNewFont = () => {
    const newFontName = `Custom Font ${(brand?.fonts?.length || 0) + 1}`;
    const newFontFamily = 'Inter, system-ui, sans-serif';

    handleFontAdd(newFontName, newFontFamily, 'Custom');
  };

  // Handle font name changes
  const handleFontNameChange = (newName: string) => {
    setFontName(newName);
    // Note: Font renaming would need to be implemented in the brand context
  };

  // Handle adding new font
  const handleFontAdd = (name: string, fontFamily: string, distributor: string, onFontCreated?: (fontName: string) => void) => {
    addNewFont(name, fontFamily, distributor, [], onFontCreated);
  };

  // Handle weight changes
  const handleWeightChange = (weightName: string) => {
    if (selectedRoleInfo?.assignedFont) {
      updateFontWeightAssignment(selectedRoleInfo.assignedFont.name, selectedRole, weightName);
      return;
    }

    // Auto-assign a sensible default font if none is assigned to this role
    const fallbackFont = processedFonts.find(f => f.roles?.includes('body')) || processedFonts[0];
    if (fallbackFont) {
      updateFontRoleAssignment(selectedRole, fallbackFont.name);
      updateFontWeightAssignment(fallbackFont.name, selectedRole, weightName);
      // Also update local UI selection
      const matching = fontSwatches.find(s => s.displayName === fallbackFont.name);
      if (matching) setSelectedFont(matching);
      // Set role-level CSS var immediately for live preview
      if (typeof window !== 'undefined') {
        const w = fallbackFont.weights?.[weightName];
        if (w) document.documentElement.style.setProperty(`--font-weight-${selectedRole}`, String(w));
      }
    }
  };

  // Handle size changes
  const handleSizeChange = (sizeKey: string) => {
    setRoleSizeAssignments(prev => ({
      ...prev,
      [selectedRole]: sizeKey
    }));

    const sizeValue = fontSizeScale[sizeKey];
    if (!sizeValue) return;

    if (selectedRoleInfo?.assignedFont) {
      updateFontSizeAssignment(selectedRoleInfo.assignedFont.name, selectedRole, sizeValue);
      return;
    }

    // Auto-assign default font when none is assigned
    const fallbackFont = processedFonts.find(f => f.roles?.includes('body')) || processedFonts[0];
    if (fallbackFont) {
      updateFontRoleAssignment(selectedRole, fallbackFont.name);
      updateFontSizeAssignment(fallbackFont.name, selectedRole, sizeValue);
      const matching = fontSwatches.find(s => s.displayName === fallbackFont.name);
      if (matching) setSelectedFont(matching);
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty(`--font-size-${selectedRole}`, `${sizeValue}rem`);
      }
    }
  };

  // Handle line-height change (per role)
  const [lineHeight, setLineHeight] = useState<number>(1.2);
  const snapLineHeight = (value: number) => TAILWIND_LINE_HEIGHTS.reduce((a,b)=>Math.abs(b.value-value)<Math.abs(a.value-value)?b:a, TAILWIND_LINE_HEIGHTS[0]);
  const handleLineHeightChange = (value: number) => {
    const snapped = snapLineHeight(value);
    setLineHeight(snapped.value);
    setLineHeightKey(snapped.key);
    updateLineHeightForRole(selectedRole, snapped.value);
  };

  // Handle letter-spacing change (per role, in em)
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const snapTracking = (value: number) => TAILWIND_TRACKING.reduce((a,b)=>Math.abs(b.value-value)<Math.abs(a.value-value)?b:a, TAILWIND_TRACKING[2]);
  const handleLetterSpacingChange = (value: number) => {
    const snapped = snapTracking(value);
    setLetterSpacing(snapped.value);
    setTrackingKey(snapped.key);
    updateLetterSpacingForRole(selectedRole, snapped.value);
  };

  // Tailwind-based line-height and letter-spacing selections
  const [lineHeightKey, setLineHeightKey] = useState<string>('leading-normal');
  const [trackingKey, setTrackingKey] = useState<string>('tracking-normal');

  // Font size (rem) slider with Tailwind snapping
  const [sizeRem, setSizeRem] = useState<number>(1);
  useEffect(() => {
    const getDefaultRemForRole = (role: string) => {
      const sizeKey = roleSizeAssignments[role] || 'text-base';
      return fontSizeScale[sizeKey] || 1;
    };
    if (typeof window === 'undefined') {
      setSizeRem(getDefaultRemForRole(selectedRole));
      return;
    }
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(`--font-size-${selectedRole}`)
      .trim();
    const parsed = raw.endsWith('rem') ? parseFloat(raw) : parseFloat(raw || '');
    if (!Number.isNaN(parsed)) setSizeRem(parsed);
    else setSizeRem(getDefaultRemForRole(selectedRole));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  const snapSize = (val: number) => [...TAILWIND_FONT_SIZES].reduce((a,b)=>Math.abs(b.defaultValue-val)<Math.abs(a.defaultValue-val)?b:a);
  const handleSizeRemChange = (val: number) => {
    const snapped = snapSize(val).defaultValue;
    setSizeRem(snapped);
    setRoleSizeAssignments(prev => ({ ...prev, [selectedRole]: snapSize(val).key }));
    if (selectedRoleInfo?.assignedFont) {
      updateFontSizeAssignment(selectedRoleInfo.assignedFont.name, selectedRole, snapped);
      return;
    }
    const fallbackFont = processedFonts.find(f => f.roles?.includes('body')) || processedFonts[0];
    if (fallbackFont) {
      updateFontRoleAssignment(selectedRole, fallbackFont.name);
      updateFontSizeAssignment(fallbackFont.name, selectedRole, snapped);
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty(`--font-size-${selectedRole}`, `${snapped}rem`);
      }
    }
  };
  const handleSizeRemCommit = (val: number) => {
    // Snap to nearest Tailwind size step and update roleSizeAssignments mapping
    const closest = [...TAILWIND_FONT_SIZES].reduce((a, b) => Math.abs(b.defaultValue - val) < Math.abs(a.defaultValue - val) ? b : a);
    setRoleSizeAssignments(prev => ({ ...prev, [selectedRole]: closest.key }));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cs = getComputedStyle(document.documentElement);
    const lhRaw = cs.getPropertyValue(`--line-height-${selectedRole}`).trim();
    const lsRaw = cs.getPropertyValue(`--letter-spacing-${selectedRole}`).trim();
    const parsedLh = lhRaw ? parseFloat(lhRaw) : NaN;
    const parsedLs = lsRaw ? parseFloat(lsRaw) : NaN;
    if (!Number.isNaN(parsedLh)) {
      const closest = TAILWIND_LINE_HEIGHTS.reduce((a, b) => Math.abs(b.value - parsedLh) < Math.abs(a.value - parsedLh) ? b : a, TAILWIND_LINE_HEIGHTS[0]);
      setLineHeightKey(closest.key);
    } else setLineHeightKey('leading-normal');
    if (!Number.isNaN(parsedLs)) {
      const closestT = TAILWIND_TRACKING.reduce((a, b) => Math.abs(b.value - parsedLs) < Math.abs(a.value - parsedLs) ? b : a, TAILWIND_TRACKING[2]);
      setTrackingKey(closestT.key);
    } else setTrackingKey('tracking-normal');
  }, [selectedRole]);

  // Re-sync when theme is applied/updated so values match instantly without entering the tab
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cs = getComputedStyle(document.documentElement);
    // size
    const sizeRaw = cs.getPropertyValue(`--font-size-${selectedRole}`).trim();
    const parsedSize = sizeRaw.endsWith('rem') ? parseFloat(sizeRaw) : parseFloat(sizeRaw || '');
    if (!Number.isNaN(parsedSize)) {
      const closest = snapSize(parsedSize);
      setSizeRem(closest.defaultValue);
      setRoleSizeAssignments(prev => ({ ...prev, [selectedRole]: closest.key }));
    }
    // line-height
    const lhRaw = cs.getPropertyValue(`--line-height-${selectedRole}`).trim();
    const parsedLh = lhRaw ? parseFloat(lhRaw) : NaN;
    if (!Number.isNaN(parsedLh)) {
      const lhStep = snapLineHeight(parsedLh);
      setLineHeight(lhStep.value);
      setLineHeightKey(lhStep.key);
    }
    // letter-spacing
    const lsRaw = cs.getPropertyValue(`--letter-spacing-${selectedRole}`).trim();
    const parsedLs = lsRaw ? parseFloat(lsRaw) : NaN;
    if (!Number.isNaN(parsedLs)) {
      const trStep = snapTracking(parsedLs);
      setLetterSpacing(trStep.value);
      setTrackingKey(trStep.key);
    }
  }, [processedBrand, selectedRole]);

  const handleLineHeightKeyChange = (key: string) => {
    setLineHeightKey(key);
    const found = TAILWIND_LINE_HEIGHTS.find(x => x.key === key);
    if (found) handleLineHeightChange(found.value);
  };
  const handleTrackingKeyChange = (key: string) => {
    setTrackingKey(key);
    const found = TAILWIND_TRACKING.find(x => x.key === key);
    if (found) handleLetterSpacingChange(found.value);
  };

  // Initialize line-height and letter-spacing from CSS variables when role changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cs = getComputedStyle(document.documentElement);
    const lhRaw = cs.getPropertyValue(`--line-height-${selectedRole}`).trim();
    const lsRaw = cs.getPropertyValue(`--letter-spacing-${selectedRole}`).trim();
    const parsedLh = lhRaw ? parseFloat(lhRaw) : NaN;
    const parsedLs = lsRaw ? parseFloat(lsRaw) : NaN;
    if (!Number.isNaN(parsedLh)) setLineHeight(parsedLh);
    else setLineHeight(1.2);
    if (!Number.isNaN(parsedLs)) setLetterSpacing(parsedLs);
    else setLetterSpacing(0);
  }, [selectedRole]);

  const updateFontSizeScale = (sizeKey: string, value: number) => {
    setFontSizeScale(prev => ({
      ...prev,
      [sizeKey]: value
    }));

    // Update all roles that use this size key
    Object.entries(roleSizeAssignments).forEach(([role, assignedSizeKey]) => {
      if (assignedSizeKey === sizeKey) {
        const assignedFont = processedFonts.find(font => font.roles?.includes(role));
        if (assignedFont) {
          updateFontSizeAssignment(assignedFont.name, role, value);
        }
      }
    });
  };

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No theme selected</p>
      </div>
    );
  }

  const currentWeight = selectedRoleInfo?.assignedFont ? getFontWeightForRole(selectedRoleInfo.assignedFont.name, selectedRole) : null;
  const currentSize = selectedRoleInfo?.assignedSize || 'text-base';

  // Ensure we have a valid current weight - fallback to 'regular' if the font has it, or first available weight
  const effectiveCurrentWeight = useMemo(() => {
    if (!selectedRoleInfo?.assignedFont?.weights) {
      // Try to map from CSS var using fallback font weights
      const fallbackFont = processedFonts.find(f => f.roles?.includes('body')) || processedFonts[0];
      const map = fallbackFont?.weights;
      if (map && cssWeightForSelectedRole) {
        const entry = Object.entries(map).find(([_, val]) => val === cssWeightForSelectedRole);
        if (entry) return entry[0];
      }
      return null;
    }

    const weights = selectedRoleInfo.assignedFont.weights;
    const brandWeight = getFontWeightForRole(selectedRoleInfo.assignedFont.name, selectedRole);

    console.log(`[effectiveCurrentWeight] Role: ${selectedRole}, Font: ${selectedRoleInfo.assignedFont.name}`);
    console.log(`[effectiveCurrentWeight] Brand weight from context: ${brandWeight}`);
    console.log(`[effectiveCurrentWeight] Available weights: ${Object.keys(weights).join(', ')}`);

    // If we have a weight from brand context and it exists in the font, use it
    if (brandWeight && weights[brandWeight]) {
      console.log(`[effectiveCurrentWeight] Using brand weight: ${brandWeight}`);
      return brandWeight;
    }

    // Otherwise, try CSS var mapping
    if (cssWeightForSelectedRole) {
      const cssMapped = Object.entries(weights).find(([name, value]) => value === cssWeightForSelectedRole);
      if (cssMapped) return cssMapped[0];
    }

    // Otherwise, prefer 'regular' if it exists
    if (weights['regular']) {
      console.log(`[effectiveCurrentWeight] Using fallback: regular`);
      return 'regular';
    }

    // Fall back to the first available weight
    const firstWeight = Object.keys(weights)[0];
    console.log(`[effectiveCurrentWeight] Using first available weight: ${firstWeight}`);
    return firstWeight || null;
  }, [selectedRoleInfo, selectedRole, getFontWeightForRole, cssWeightForSelectedRole, processedFonts]);

  return (
    <div className="space-y-6 h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Type className="w-5 h-5" />
            Typography
            <span className="text-sm font-normal text-muted-foreground">({fontRoleGroups.length} role groups)</span>
          </h3>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="text-foreground/80">Active:</span>
            <span className="font-medium text-foreground">{selectedRole}</span>
            {selectedFont?.family && (
              <span className="truncate max-w-[200px]" title={selectedFont.family}>
                • {selectedFont.family.split(',')[0].replace(/['"]/g, '').trim()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            className="h-8 w-8 p-0"
            title="Undo last change"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Integrated Font Editor */}
        <div className="space-y-4">
          {/* Font Preview */}
          <div className="p-3 rounded-md bg-muted/30 border">
            <p className="text-xs text-muted-foreground mb-2">Preview</p>
            <div
              className="text-foreground"
              style={{
                fontFamily: selectedFont?.family || 'inherit',
                fontSize: `${fontSizeScale[currentSize]}rem`,
                fontWeight: selectedRoleInfo?.assignedFont?.weights?.[effectiveCurrentWeight || 'regular'] || 'normal',
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}em`
              }}
            >
              {rolePreviewTexts[selectedRole] || `Sample ${selectedRole} text`}
            </div>
          </div>

          {/* Removed preview-adjacent line height and letter spacing controls to enforce Tailwind-only selection below */}

          {/* Font Family Selection */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Font Family</p>
            <FontPicker
              value={selectedFont?.family || ''}
              className="w-full h-9"
              role={selectedRole}
              swatches={fontSwatches}
              onSwatchSelect={handleFontSelect}
              onChange={(newFamily) => handleFontRoleDirectChange(selectedRole, newFamily)}
              onDirectFontChange={(newFamily) => handleFontRoleDirectChange(selectedRole, newFamily)}
              onSwatchAdd={handleFontAdd}
              onSwatchUpdate={() => { }}
              onSwatchDelete={() => { }}
            />
          </div>

          {/* Font Swatches */}
          {fontSwatches && fontSwatches.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Theme Fonts</p>
              <div className="grid grid-cols-2 gap-2">
                {fontSwatches.map((font) => (
                  <button
                    key={font.name}
                    type="button"
                    title={`Assign ${font.displayName} to ${selectedRole}`}
                    className={cn(
                      "h-8 px-3 text-left text-sm rounded-md border transition-all hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                      selectedFont?.name === font.name
                        ? "border-ring ring-1 ring-ring bg-muted"
                        : "border-border/50"
                    )}
                    style={{ fontFamily: font.family }}
                    onClick={() => handleFontSelect(font)}
                  >
                    {font.displayName}
                  </button>
                ))}

                {/* Add new font button */}
                <button
                  type="button"
                  title="Add new font"
                  className="h-8 px-3 text-left text-sm rounded-md border border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
                  onClick={handleCreateNewFont}
                >
                  <Plus className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Add Font</span>
                </button>
              </div>
            </div>
          )}

          {/* Font Size Selection */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Font Size</p>
            <div className="space-y-2">
              <Slider
                value={[sizeRem]}
                onValueChange={(vals) => handleSizeRemChange(vals[0])}
                onValueCommit={(vals) => handleSizeRemCommit(vals[0])}
                min={SIZE_MIN}
                max={SIZE_MAX}
                step={0.01}
              />
              <div className="text-[10px] text-muted-foreground px-1 text-right">
                {(() => {
                  const activeKey = roleSizeAssignments[selectedRole] || 'text-base';
                  const active = TAILWIND_FONT_SIZES.find(s => s.key === activeKey);
                  return <span>{active?.label} ({sizeRem.toFixed(2)}rem)</span>;
                })()}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Line Height</p>
                <div className="space-y-2">
                  <Slider
                    value={[lineHeight]}
                    onValueChange={(vals) => handleLineHeightChange(vals[0])}
                    onValueCommit={(vals) => {
                      // Snap to nearest Tailwind step on commit
                      const v = vals[0];
                      const closest = TAILWIND_LINE_HEIGHTS.reduce((a,b)=>Math.abs(b.value-v)<Math.abs(a.value-v)?b:a, TAILWIND_LINE_HEIGHTS[0]);
                      handleLineHeightKeyChange(closest.key);
                    }}
                    min={LH_MIN}
                    max={LH_MAX}
                    step={0.005}
                  />
                  <div className="text-[10px] text-muted-foreground px-1 text-right">
                    {(() => {
                      const active = TAILWIND_LINE_HEIGHTS.find(s => s.key === lineHeightKey);
                      return <span>{active?.label} ({lineHeight.toFixed(2)})</span>;
                    })()}
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Letter Spacing</p>
                <div className="space-y-2">
                  <Slider
                    value={[letterSpacing]}
                    onValueChange={(vals) => handleLetterSpacingChange(vals[0])}
                    onValueCommit={(vals) => {
                      // Snap to nearest Tailwind tracking step on commit
                      const v = vals[0];
                      const closest = TAILWIND_TRACKING.reduce((a,b)=>Math.abs(b.value-v)<Math.abs(a.value-v)?b:a, TAILWIND_TRACKING[2]);
                      handleTrackingKeyChange(closest.key);
                    }}
                    min={TRACK_MIN}
                    max={TRACK_MAX}
                    step={0.001}
                  />
                  <div className="text-[10px] text-muted-foreground px-1 text-right">
                    {(() => {
                      const active = TAILWIND_TRACKING.find(s => s.key === trackingKey);
                      return <span>{active?.label} ({letterSpacing.toFixed(3)}em)</span>;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Font Weight Selection (with fallback if no font assigned) */}
          {(() => {
            const assignedWeights = selectedRoleInfo?.assignedFont?.weights;
            const fallbackFont = !assignedWeights || Object.keys(assignedWeights).length === 0
              ? (processedFonts.find(f => f.roles?.includes('body')) || processedFonts[0])
              : null;
            const weightSource = assignedWeights && Object.keys(assignedWeights).length > 0
              ? assignedWeights
              : (fallbackFont?.weights || undefined);
            if (!weightSource || Object.keys(weightSource).length <= 0) return null;
            const activeWeight = effectiveCurrentWeight;

            // Build ordered weight steps from available weights
            const weightSteps = Object.entries(weightSource)
              .map(([name, val]) => ({ name, value: Number(val) }))
              .filter(s => !Number.isNaN(s.value))
              .sort((a, b) => a.value - b.value);
            const WEIGHT_MIN = weightSteps[0]?.value ?? 100;
            const WEIGHT_MAX = weightSteps[weightSteps.length - 1]?.value ?? 900;

            const getActiveValue = () => {
              const found = weightSteps.find(s => s.name === activeWeight);
              if (found) return found.value;
              // Fallback to closest by CSS var if present
              if (typeof window !== 'undefined') {
                const w = getComputedStyle(document.documentElement)
                  .getPropertyValue(`--font-weight-${selectedRole}`)
                  .trim();
                const parsed = parseInt(w || '', 10);
                if (!Number.isNaN(parsed)) {
                  const closest = weightSteps.reduce((a, b) => Math.abs(b.value - parsed) < Math.abs(a.value - parsed) ? b : a, weightSteps[0]);
                  return closest.value;
                }
              }
              return weightSteps[Math.max(0, Math.floor(weightSteps.length / 2))].value;
            };

            const [weightVal, setWeightVal] = React.useState<number>(getActiveValue());
            React.useEffect(() => {
              setWeightVal(getActiveValue());
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [selectedRole, effectiveCurrentWeight, selectedRoleInfo?.assignedFont]);

            const snapWeight = (val: number) => weightSteps.reduce((a, b) => Math.abs(b.value - val) < Math.abs(a.value - val) ? b : a, weightSteps[0]);

            const handleWeightSliderChange = (val: number) => {
              const snapped = snapWeight(val);
              setWeightVal(snapped.value);
              // Apply using weight name
              handleWeightChange(snapped.name);
            };

            return (
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Font Weight</p>
                <div className="space-y-2">
                  <Slider
                    value={[weightVal]}
                    onValueChange={(vals) => handleWeightSliderChange(vals[0])}
                    onValueCommit={(vals) => handleWeightSliderChange(vals[0])}
                    min={WEIGHT_MIN}
                    max={WEIGHT_MAX}
                    step={1}
                  />
                  <div className="text-[10px] text-muted-foreground px-1 text-right">
                    {(() => {
                      const active = weightSteps.find(s => s.value === weightVal);
                      const label = active?.value ?? 400;
                      return <span>{label}</span>;
                    })()}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Removed duplicate bottom line-height and letter-spacing controls */}
        </div>
      </div>

      {/* Content - Typography Roles */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-5 gap-y-4">
          {fontRoleGroups.map((roleGroup, groupIndex) => (
            <div key={`${roleGroup.subCategoryName}-${groupIndex}`} className="p-2 rounded-lg transition-all duration-200 hover:bg-card/50">
              <div className="space-y-2">
                {/* Group Title */}
                <h4 className="text-sm font-medium text-foreground opacity-60">{roleGroup.subCategoryName}</h4>

                {/* Overlapping Role Circles */}
                <div className="flex -space-x-4">
                  {roleGroup.roles.map((roleAssignment, index) => {
                    const isSelected = selectedRole === roleAssignment.role;
                    const roleTitle = roleAssignment.role.replace(/-/g, ' ');

                    // Get the current weight for this role
                    const currentRoleWeight = roleAssignment.assignedFont ?
                      getFontWeightForRole(roleAssignment.assignedFont.name, roleAssignment.role) : null;

                    // Get effective weight with fallbacks
                    const getEffectiveWeight = () => {
                      if (!roleAssignment.assignedFont?.weights) return 'normal';

                      const weights = roleAssignment.assignedFont.weights;

                      // If we have a weight from brand context and it exists in the font, use it
                      if (currentRoleWeight && weights[currentRoleWeight]) {
                        return weights[currentRoleWeight];
                      }

                      // Otherwise, prefer 'regular' if it exists
                      if (weights['regular']) {
                        return weights['regular'];
                      }

                      // Fall back to the first available weight
                      const firstWeight = Object.keys(weights)[0];
                      return weights[firstWeight] || 'normal';
                    };

                    const weightValue = getEffectiveWeight();

                    return (
                      <div key={roleAssignment.role} className="relative">
                        {roleAssignment.assignedFont ? (
                          <Button
                            className={cn(
                              "w-14 h-14 rounded-full border border-border shadow-sm hover:shadow-md transition-all duration-200 p-0 relative text-xs leading-tight",
                              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl z-20 scale-110 border-primary/50"
                            )}
                            style={{
                              fontFamily: roleAssignment.fontFamily || 'inherit',
                              fontWeight: weightValue,
                              zIndex: isSelected ? 20 : 10 - index
                            }}
                            title={`${roleTitle} - ${roleAssignment.assignedFont.name} (${currentRoleWeight || 'default'}) - Click to edit`}
                            onClick={() => handleRoleSelect(roleAssignment.role)}
                            variant="outline"
                          >
                            <div className="flex flex-col items-center justify-center h-full w-full px-1">
                              <span className={cn(
                                "text-[10px] font-medium truncate w-full text-center",
                                isSelected && "text-primary font-bold"
                              )}
                                style={{ fontWeight: weightValue }}
                              >
                                {roleAssignment.role === 'h1' ? 'H1' :
                                  roleAssignment.role === 'h2' ? 'H2' :
                                  roleAssignment.role === 'h3' ? 'H3' :
                                  roleAssignment.role === 'h4' ? 'H4' :
                                  roleAssignment.role === 'h5' ? 'H5' :
                                  roleAssignment.role === 'h6' ? 'H6' :
                                  roleAssignment.role === 'body' ? 'Abc' :
                                  roleAssignment.role === 'code' ? '</>' :
                                    roleAssignment.role === 'blockquote' ? 'BQ' :
                                      roleAssignment.role.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
                            )}
                          </Button>
                        ) : (
                          <Button
                            className={cn(
                              "w-14 h-14 rounded-full border border-border bg-muted/60 shadow-sm hover:shadow-md transition-all duration-200 p-0 relative",
                              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl z-20 scale-110 border-primary/50 bg-primary/10"
                            )}
                            style={{ zIndex: isSelected ? 20 : 10 - index }}
                            title={`${roleTitle} - No font assigned, click to edit`}
                            onClick={() => handleRoleSelect(roleAssignment.role)}
                            variant="outline"
                          >
                            <Hash className={cn(
                              "w-4 h-4 text-muted-foreground",
                              isSelected && "text-primary"
                            )} />
                            {isSelected && (
                              <div className="absolute inset-0 rounded-full border-2 border-primary/60" />
                            )}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 