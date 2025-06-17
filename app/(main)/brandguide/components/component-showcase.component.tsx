import React, { CSSProperties } from 'react';
import { Brand, ComponentShowcaseItem, ComponentStateStyles } from '../brand-utils';

import { Badge } from "@/features/unorganized-components/ui/badge";
import { Button } from "@/features/unorganized-components/ui/button";
import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Input as ShadcnInput } from "@/features/unorganized-components/ui/input";


interface ComponentShowcaseProps {
  brand: Brand;
  className?: string;
}

// Simplified showcase items, focusing on core components.
// The showcase itself is made of cards, so a card-in-card demo is redundant.
const STATIC_SHOWCASE_ITEMS: Array<ComponentShowcaseItem & { componentType: 'button' | 'input' | 'badge' }> = [
  // Buttons
  { id: 'button-primary', name: 'Primary Button', description: 'Main call to action.', displayComponent: 'Primary Action', componentType: 'button', variant: 'primary', state: 'default' },
  { id: 'button-secondary', name: 'Secondary Button', description: 'Alternative action.', displayComponent: 'Secondary Action', componentType: 'button', variant: 'secondary', state: 'default' },
  { id: 'button-destructive', name: 'Destructive Button', description: 'For dangerous actions.', displayComponent: 'Delete Action', componentType: 'button', variant: 'destructive', state: 'default' },
  { id: 'button-outline', name: 'Outline Button', description: 'Less emphasized action.', displayComponent: 'Outline Action', componentType: 'button', variant: 'outline', state: 'default' },
  { id: 'button-ghost', name: 'Ghost Button', description: 'Subtle, often for links.', displayComponent: 'Ghost Action', componentType: 'button', variant: 'ghost', state: 'default' },
  { id: 'button-link', name: 'Link Button', description: 'Styled as a link.', displayComponent: 'Learn More', componentType: 'button', variant: 'link', state: 'default' },

  // Inputs
  { id: 'input-default', name: 'Default Input', description: 'Standard text input.', displayComponent: 'Enter text...', componentType: 'input', variant: 'default' },
  { id: 'input-focus', name: 'Focused Input', description: 'Input in focus state.', displayComponent: 'Focused input...', componentType: 'input', variant: 'focus' },
  { id: 'input-error', name: 'Error Input', description: 'Input with error state.', displayComponent: 'Error input', componentType: 'input', variant: 'error' },

  // Badges
  { id: 'badge-default', name: 'Default Badge', description: 'Standard badge.', displayComponent: 'Default', componentType: 'badge', variant: 'default' },
  { id: 'badge-success', name: 'Success Badge', description: 'Success state badge.', displayComponent: 'Success', componentType: 'badge', variant: 'success' },
  { id: 'badge-destructive', name: 'Destructive Badge', description: 'Error/Destructive badge.', displayComponent: 'Error', componentType: 'badge', variant: 'destructive' },
];

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ brand, className }) => {
  const showcaseTitle = brand.componentShowcase?.title || "Featured Components";
  const showcaseDescription = brand.componentShowcase?.description || "A collection of styled UI elements.";

  const titleStyle: React.CSSProperties = {
    color: 'var(--foreground)',
  };

  const cardOverlayStyle: React.CSSProperties = {
    backgroundImage: brand.componentShowcase?.styleOverrides?.cardOverlayImage || 'none',
  };

  // This function renders the components inside the showcase cards.
  // It uses shadcn components directly, which are styled by the theme's CSS variables.
  // For components with special variants not in shadcn (like 'success' badge), it uses theme-aware classNames.
  const renderDisplayComponent = (
    item: ComponentShowcaseItem & { componentType: 'button' | 'input' | 'badge' }
  ) => {
    switch (item.componentType) {
      case 'button':
        const buttonVariant = item.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
        return (
          <Button
            variant={buttonVariant === 'primary' ? 'default' : buttonVariant}
            disabled={item.state === 'disabled'}
          >
            {item.displayComponent}
          </Button>
        );
      case 'input':
        const inputStyles = brand.componentStyles?.input || {};
        const state = item.variant as 'focus' | 'error';
        const stateStyle = inputStyles[state] || {};

        return (
          <ShadcnInput
            placeholder={item.displayComponent}
            className="w-full"
            disabled={item.variant === 'disabled'}
            forceState={state}
            style={{ ...inputStyles, ...stateStyle } as any as React.CSSProperties}
          />
        );
      case 'badge':
        const badgeVariant = item.variant as 'default' | 'destructive' | 'success';
        if (badgeVariant === 'success') {
          // 'success' is not a default shadcn variant, so we style it manually using theme variables
          return <Badge className="bg-[var(--success)] text-[var(--success-foreground)] hover:bg-[var(--success)]/80">{item.displayComponent}</Badge>
        }
        return (
          <Badge variant={badgeVariant}>
            {item.displayComponent}
          </Badge>
        );
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STATIC_SHOWCASE_ITEMS.map((item) => (
            <ShadcnCard key={item.id} className="overflow-hidden flex flex-col group">
              {brand.componentShowcase?.styleOverrides?.cardOverlayImage &&
                <div className="absolute inset-0 pointer-events-none opacity-70 mix-blend-color-dodge group-hover:opacity-100 transition-opacity duration-300" style={cardOverlayStyle}></div>
              }
              <CardHeader className="pb-3">
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center justify-center p-6 pt-3 min-h-[160px]">
                <div className="w-full flex items-center justify-center relative p-4 rounded-md min-h-[80px]">
                  {renderDisplayComponent(item)}
                </div>
              </CardContent>
            </ShadcnCard>
          ))}
        </div>
      </div>
    </section>
  );
};