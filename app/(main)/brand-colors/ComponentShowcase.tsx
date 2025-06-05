import React, { CSSProperties } from 'react';
import {
  BrandDefinition,
  ComponentShowcaseItem,
  ComponentStateStyles,
  ButtonStyles,
  InputStyles,
  CardComponentStyles,
  ButtonVariantStyles
} from './brands-types';

import { Badge } from "@/features/unorganized-components/ui/badge";
import { Button, Button as ShadcnButton } from "@/features/unorganized-components/ui/button";
import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Input as ShadcnInput } from "@/features/unorganized-components/ui/input";
import { Progress } from "@/features/unorganized-components/ui/progress";

import { CheckSquare, Palette, Shapes, Sparkles, Type, Settings, Component, Info, Search, ShieldAlert, ThumbsUp, TrendingUp, AlertCircle, MessageSquare, Users, DollarSign, CalendarDays, BarChartBig, PieChart, SlidersHorizontal, GripVertical, Maximize, Minimize, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ExternalLink, Copy, Check, Loader2, Play, Pause, Zap, Filter, LayoutGrid, List, Trello, Columns, Rows } from 'lucide-react';

interface ComponentShowcaseProps {
  brand: BrandDefinition;
  className?: string;
}

// Static definition of components to showcase
const STATIC_SHOWCASE_ITEMS: Array<ComponentShowcaseItem & { componentType: 'button' | 'input' | 'card' | 'badge' | 'loading' }> = [
  // Buttons
  { id: 'button-primary', name: 'Primary Button', description: 'Main call to action.', displayComponent: 'Primary Action', componentType: 'button', variant: 'primary', state: 'default' },
  { id: 'button-secondary', name: 'Secondary Button', description: 'Alternative action.', displayComponent: 'Secondary Action', componentType: 'button', variant: 'secondary', state: 'default' },
  { id: 'button-outline', name: 'Outline Button', description: 'Less emphasized action.', displayComponent: 'Outline Action', componentType: 'button', variant: 'outline', state: 'default' },
  { id: 'button-ghost', name: 'Ghost Button', description: 'Subtle, often for links.', displayComponent: 'Ghost Action', componentType: 'button', variant: 'ghost', state: 'default' },
  { id: 'button-destructive', name: 'Destructive Button', description: 'For dangerous actions.', displayComponent: 'Delete Action', componentType: 'button', variant: 'destructive', state: 'default' },
  { id: 'button-link', name: 'Link Button', description: 'Styled as a link.', displayComponent: 'Learn More', componentType: 'button', variant: 'link', state: 'default' },
  { id: 'button-outline-secondary', name: 'Outline Secondary Button', description: 'Neutral outline action.', displayComponent: 'More Options', componentType: 'button', variant: 'outline-secondary', state: 'default' },
  // Inputs
  { id: 'input-default', name: 'Default Input', description: 'Standard text input.', displayComponent: 'Enter text...', componentType: 'input', variant: 'default' },
  { id: 'input-focus', name: 'Focused Input', description: 'Input in focus state.', displayComponent: 'Focused input...', componentType: 'input', variant: 'focus' },
  { id: 'input-error', name: 'Error Input', description: 'Input with error state.', displayComponent: 'Error input', componentType: 'input', variant: 'error' },
  { id: 'input-disabled', name: 'Disabled Input', description: 'Disabled text input.', displayComponent: 'Disabled input', componentType: 'input', variant: 'disabled' },
  // Cards
  { id: 'card-default', name: 'Default Card', description: 'Standard card display.', displayComponent: 'Card Content', componentType: 'card', variant: 'default' },
  { id: 'card-elevated', name: 'Elevated Card', description: 'Card with more emphasis.', displayComponent: 'Elevated Card Content', componentType: 'card', variant: 'elevated' },
  { id: 'card-subtle', name: 'Subtle Card', description: 'Card with less emphasis.', displayComponent: 'Subtle Card Content', componentType: 'card', variant: 'subtle' },
  // Badges (Example)
  { id: 'badge-default', name: 'Default Badge', description: 'Standard badge.', displayComponent: 'Default', componentType: 'badge', variant: 'default' },
  { id: 'badge-success', name: 'Success Badge', description: 'Success state badge.', displayComponent: 'Success', componentType: 'badge', variant: 'success' },
  { id: 'badge-destructive', name: 'Destructive Badge', description: 'Error/Destructive badge.', displayComponent: 'Error', componentType: 'badge', variant: 'destructive' },
  // Loading Indicator (Example)
  { id: 'loading-default', name: 'Loading Indicator', description: 'Standard loading progress.', displayComponent: 'Loading...', componentType: 'loading', variant: 'default' },
];

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ brand, className }) => {
  // Removed reliance on brand.componentShowcase for structure
  const showcaseTitle = brand.componentShowcase?.title || "Featured Components";
  const showcaseDescription = brand.componentShowcase?.description || "A collection of styled UI elements.";

  const cardStyle: React.CSSProperties = {
    background: 'var(--component-showcase-card-bg, var(--surface-card))', // Fallback added
    borderColor: 'var(--component-showcase-card-border-color, var(--border-color-default))', // Fallback added
    boxShadow: 'var(--component-showcase-card-box-shadow, var(--shadow-md))', // Fallback added
  };

  const titleStyle: React.CSSProperties = {
    color: 'var(--component-showcase-title-color, var(--foreground))', // Fallback added
    fontWeight: 'var(--component-showcase-title-font-weight, 600)' as React.CSSProperties['fontWeight'],
    letterSpacing: 'var(--component-showcase-title-letter-spacing, -0.02em)', // Fallback added
    textTransform: 'var(--component-showcase-title-text-transform, none)' as React.CSSProperties['textTransform'],
    fontSize: 'var(--component-showcase-title-font-size, 1.5rem)', // Fallback added
  };
  
  const cardOverlayStyle: React.CSSProperties = {
    backgroundImage: 'var(--component-showcase-card-overlay-image)',
  };

  // Simplified renderDisplayComponent to use Styled* components
  const renderDisplayComponent = (
    item: ComponentShowcaseItem & { componentType: 'button' | 'input' | 'card' | 'badge' | 'loading' },
    currentBrand: BrandDefinition
  ) => {
    switch (item.componentType) {
      case 'button':
        // Map showcase item variant to ShadcnButton CVA variant
        let cvaButtonVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "outline-secondary" = "default";
        const itemButtonVariant = item.variant as string;
        const itemButtonState = item.state || 'default';

        if (["destructive", "outline", "secondary", "ghost", "link", "outline-secondary"].includes(itemButtonVariant)) {
          cvaButtonVariant = itemButtonVariant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "outline-secondary";
        } else if (itemButtonVariant === "primary") {
          cvaButtonVariant = "default"; // Showcase "primary" uses CVA "default"
        }
        // else it remains "default"

        return (
          <div className="relative w-full flex justify-center"> {/* Wrapper for positioning the tag */}
            <Button
              variant={cvaButtonVariant}
              disabled={itemButtonState === 'disabled'} // Assuming 'disabled' state implies disabled prop
            >
              {item.displayComponent}
            </Button>
            <div className="absolute inset-0 pointer-events-none">
              <span className="text-xs absolute top-0 right-0 bg-muted px-1 rounded-bl opacity-60">
                {`${itemButtonVariant} / ${itemButtonState}`}
              </span>
            </div>
          </div>
        );
      case 'input':
        let forceStateValue: 'focus' | 'error' | undefined = undefined;
        if (item.variant === 'focus') {
          forceStateValue = 'focus';
        } else if (item.variant === 'error') {
          forceStateValue = 'error';
        }

        return (
          <div className="w-full relative">
            <ShadcnInput 
              placeholder={item.displayComponent} 
              className="w-full"
              disabled={item.variant === 'disabled'}
              forceState={forceStateValue}
            />
            <div className="absolute inset-0 pointer-events-none">
              <span className="text-xs absolute top-0 right-0 bg-muted px-1 rounded-bl opacity-60">
                {item.variant || 'default'}
              </span>
            </div>
          </div>
        );
      case 'card':
        return (
          <StyledCard 
            variant={item.variant as 'default' | 'elevated' | 'subtle' || 'default'}
            brand={currentBrand} 
            className="w-full max-w-sm"
          >
            <div className="p-4">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs mt-2">(Content: {item.displayComponent})</p>
            </div>
          </StyledCard>
        );
      case 'badge':
        return (
          <StyledBadge 
            variant={item.variant as 'default' | 'destructive' | 'warning' | 'success' | 'info' || 'default'} 
            brand={currentBrand}
          >
            {item.displayComponent}
          </StyledBadge>
        );
      case 'loading':
        return <StyledLoadingIndicator brand={currentBrand} />;
      default:
        return <p className="text-sm text-foreground">Show <code>{item.displayComponent}</code> ({item.componentType})</p>;
    }
  };

  return (
    <section id="components" className={`w-full scroll-mt-20 ${className || ''}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={titleStyle}>
            {showcaseTitle}
          </h2>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
            {showcaseDescription}
          </p>
        </div>

        <div className="space-y-12">
          {STATIC_SHOWCASE_ITEMS.length > 0 && (
            <div>
              {/* Removed category grouping, directly map items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {STATIC_SHOWCASE_ITEMS.map((item) => (
                  <ShadcnCard key={item.id} style={cardStyle} className=" overflow-hidden flex flex-col group">
                    {(brand.stylingPreferences?.applySpecialLayout && cardOverlayStyle.backgroundImage && cardOverlayStyle.backgroundImage !== 'none') && 
                      <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-color-dodge group-hover:opacity-100 transition-opacity duration-300" style={cardOverlayStyle}></div>
                    }
                    <CardHeader className="pb-3">
                      <CardTitle style={{ color: 'var(--foreground)', fontSize: '1.1rem', fontWeight: '600' }}>{item.name}</CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col items-center justify-center p-6 pt-3 min-h-[120px]">
                      <div className="w-full flex items-center justify-center bg-muted/20 relative dark:bg-muted/10 p-4 rounded-md border border-dashed min-h-[80px]" style={{borderColor: 'var(--border-color-subtle, var(--border))'}}>
                        {renderDisplayComponent(item, brand)}
                      </div>
                    </CardContent>
                  </ShadcnCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Styled Components (ensure these correctly use brand.componentStyles) ---

const StyledCard: React.FC<{
  variant: 'default' | 'elevated' | 'subtle';
  brand: BrandDefinition;
  className?: string;
  children?: React.ReactNode;
}> = ({ variant = "default", brand, className = "", children }) => {
  const cardStyles = brand.componentStyles?.card;
  const defaultComponentStyle: ComponentStateStyles = { // Sensible defaults for a card
    background: 'var(--card-background, var(--surface-card))',
    color: 'var(--card-foreground, var(--foreground))',
    borderColor: 'var(--card-bordercolor, var(--border-color-default))',
    borderRadius: 'var(--card-borderradius, var(--radius-md))',
    boxShadow: 'var(--card-boxshadow, var(--shadow-sm))',
    padding: 'var(--card-padding, 1rem)',
  };

  const cardBaseStyles: ComponentStateStyles = cardStyles || {};
  const cardVariantKey = variant as keyof CardComponentStyles;
  const cardVariantStyles: ComponentStateStyles = (cardStyles && cardStyles[cardVariantKey] as ComponentStateStyles) || {};

  const actualStyleToApply: ComponentStateStyles = { ...defaultComponentStyle, ...cardBaseStyles, ...cardVariantStyles };

  return (
    <ShadcnCard
      className={`${className} `}
      style={{
        background: actualStyleToApply.background,
        color: actualStyleToApply.color,
        borderColor: actualStyleToApply.borderColor,
        borderRadius: actualStyleToApply.borderRadius,
        boxShadow: actualStyleToApply.boxShadow,
        padding: actualStyleToApply.padding,
      }}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none">
        <span className="text-xs absolute top-0 right-0 bg-muted px-1 rounded-bl opacity-60">
          {variant}
        </span>
      </div>
    </ShadcnCard>
  );
};

const StyledBadge: React.FC<{
  variant: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  brand: BrandDefinition;
  className?: string;
  children?: React.ReactNode;
}> = ({ variant, brand, className = "", children }) => {
  const badgeStyles = brand.componentStyles?.badge as (ComponentStateStyles & { [key in typeof variant]?: ComponentStateStyles }) | undefined;
  
  const defaultComponentStyle: ComponentStateStyles = { // Sensible defaults for a badge
    padding: "0.25rem 0.6rem",
    borderRadius: "9999px",
    borderWidth: "0px",
    borderColor: "transparent",
    borderStyle: "solid",
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1.2',
    opacity: 1,
  };
  
  const baseStyle = badgeStyles || {};
  const variantStyle = badgeStyles?.[variant] || {};
  let actualStyleToApply: ComponentStateStyles = { ...defaultComponentStyle, ...baseStyle, ...variantStyle };

  // Fallbacks for background/color if not defined in theme
  if (!actualStyleToApply.background) {
    switch(variant) {
      case "destructive": actualStyleToApply.background = 'var(--semantic-destructive)'; actualStyleToApply.color = 'var(--destructive-foreground, #fff)'; break;
      case "success": actualStyleToApply.background = 'var(--semantic-success)'; actualStyleToApply.color = 'var(--success-foreground, #fff)'; break;
      case "warning": actualStyleToApply.background = 'var(--semantic-warning)'; actualStyleToApply.color = 'var(--warning-foreground, var(--foreground))'; break;
      case "info": actualStyleToApply.background = 'var(--semantic-info)'; actualStyleToApply.color = 'var(--info-foreground, #fff)'; break;
      default: actualStyleToApply.background = 'var(--surface-muted)'; actualStyleToApply.color = 'var(--muted-foreground)'; break;
    }
  }
  
  return (
    <Badge
      variant={null}
      className={`${className} `}
      style={{
        backgroundColor: actualStyleToApply.background,
        color: actualStyleToApply.color,
        padding: actualStyleToApply.padding,
        borderRadius: actualStyleToApply.borderRadius,
        borderWidth: actualStyleToApply.borderWidth,
        borderColor: actualStyleToApply.borderColor,
        borderStyle: actualStyleToApply.borderStyle as React.CSSProperties['borderStyle'],
        fontWeight: actualStyleToApply.fontWeight as React.CSSProperties['fontWeight'],
        fontSize: actualStyleToApply.fontSize,
        lineHeight: actualStyleToApply.lineHeight,
        opacity: actualStyleToApply.opacity,
      }}
    >
      {children || variant.charAt(0).toUpperCase() + variant.slice(1)}
      <div className="absolute inset-0 pointer-events-none">
        <span className="text-[10px] absolute top-0 right-0 bg-background text-foreground px-1 rounded-bl opacity-60">
          {variant}
        </span>
      </div>
    </Badge>
  );
};

const StyledLoadingIndicator: React.FC<{
  brand: BrandDefinition;
  className?: string;
}> = ({ brand, className = "" }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const indicatorStyles = brand.componentStyles?.loadingIndicator || {};
  const defaultComponentStyle: ComponentStateStyles = { // Sensible defaults
    background: "var(--surface-muted)",
    color: "var(--brand-main)", 
    fontFamily: "var(--font-family-sans)",
    opacity: 1,
  };
  const actualStyleToApply = {...defaultComponentStyle, ...indicatorStyles};
  const actualTextColor = indicatorStyles?.color || "var(--muted-foreground)";

  return (
    <div className={`${className} space-y-2 relative w-full max-w-xs mx-auto`}>
      <Progress 
        value={progress} 
        className="h-2"
        style={{
          backgroundColor: actualStyleToApply.background,
          '--progress-color': actualStyleToApply.color,
        } as React.CSSProperties}
      />
      <p className="text-xs text-center text-muted-foreground" style={{ color: actualTextColor }}>Loading...</p>
      <div className="absolute inset-0 pointer-events-none">
        <span className="text-xs absolute top-0 right-0 bg-muted px-1 rounded-bl opacity-60">
          loading
        </span>
      </div>
    </div>
  );
};