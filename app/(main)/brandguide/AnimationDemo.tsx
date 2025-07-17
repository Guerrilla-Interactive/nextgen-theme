'use client';

import { Button } from "@/features/unorganized-components/ui/button";
import { useBrand } from "../blueprint/BrandContext";
import { Input } from "@/features/unorganized-components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { ColorPicker } from "../brand-colors/ColorPicker";
import { useState } from "react";
import { formatHex } from "culori";

export const AnimationDemo = () => {
  const { brand, processedBrand, addNewColor } = useBrand();
  const [testColor, setTestColor] = useState('#3B82F6');
  
  // Generate swatches for testing - use original brand colors order to preserve insertion order
  const swatches = brand?.colors?.map(c => ({
    name: c.variableName,
    displayName: c.name,
    color: formatHex(c.oklchLight as string) || '#000000'
  })).filter(s => s.color !== '#000000') || [];
  
  const handleSwatchAdd = (name: string, color: string) => {
    console.log('AnimationDemo: Adding new swatch:', name, color);
    // Immediately update the color picker to the new color
    setTestColor(color);
    console.log('AnimationDemo: Set active color to:', color);
    
    addNewColor(name, color, [], (newColorName) => {
      console.log('AnimationDemo: New color created and confirmed active:', newColorName);
    });
  };
  
  // Check if this theme has variant-specific animations
  const hasVariantAnimations = brand?.animationConfig && 
    typeof brand.animationConfig.preset.button === 'object' && 
    'default' in (brand.animationConfig.preset.button as any);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Animation System Demo</h3>
        <p className="text-sm text-muted-foreground">
          Current theme: <span className="font-medium">{brand?.name || 'None'}</span>
          {brand?.animationConfig && (
            <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">
              Using {brand.animationConfig.preset.name} animations
            </span>
          )}
        </p>
      </div>
      
      {/* Color Creation Test */}
      <Card>
        <CardHeader>
          <CardTitle>Test Color Creation</CardTitle>
          <CardDescription>
            Click the color picker and then click the "+" button to create a new color instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <ColorPicker
              value={testColor}
              onChange={setTestColor}
              swatches={swatches}
              onSwatchAdd={handleSwatchAdd}
              className="w-12 h-12"
            />
            <div className="text-sm">
              <p>Current color: {testColor}</p>
              <p className="text-muted-foreground">
                Total colors in theme: {brand?.colors?.length || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card data-slot="card" className="p-4">
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
          <CardDescription>
            Hover, click, and interact with these elements to see the animations in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-md font-medium">Button Variants</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Interact with each button to experience the {brand?.name} theme's animation style.
              {hasVariantAnimations 
                ? " Each variant has unique animation behavior."
                : " All buttons share consistent animation behavior."
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Button variant="default" data-slot="button" className="w-full">
                  Default Primary
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Primary action button
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="destructive" data-slot="button" className="w-full">
                  Destructive Action
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Destructive action button
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" data-slot="button" className="w-full">
                  Outline Style
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Outlined button variant
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="secondary" data-slot="button" className="w-full">
                  Secondary Action
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Secondary action button
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="ghost" data-slot="button" className="w-full">
                  Ghost Button
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Minimal ghost variant
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="link" data-slot="button" className="w-full">
                  Link Style
                </Button>
                <p className="text-xs text-muted-foreground px-1">
                  Link-styled button
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-md font-medium">Interaction States</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Try hovering, clicking, and focusing these elements to see the animation effects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Hover to see effects:</h5>
                <div className="space-y-2">
                  <Button variant="default" data-slot="button" size="sm">Default Button</Button>
                  <Button variant="destructive" data-slot="button" size="sm">Destructive Button</Button>
                  <Button variant="ghost" data-slot="button" size="sm">Ghost Button</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-medium">Click to see press effects:</h5>
                <div className="space-y-2">
                  <Button variant="default" data-slot="button" size="sm">Primary Action</Button>
                  <Button variant="outline" data-slot="button" size="sm">Outline Action</Button>
                  <Button variant="secondary" data-slot="button" size="sm">Secondary Action</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-md font-medium">Button Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" data-slot="button">
                Small
              </Button>
              <Button size="default" data-slot="button">
                Default
              </Button>
              <Button size="lg" data-slot="button">
                Large
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-md font-medium">Input Fields</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Hover and focus me" data-slot="input" />
              <Input placeholder="Interactive input field" data-slot="input" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-md font-medium">Link Examples</h4>
            <div className="space-y-1">
              <div>
                <a href="#" className="text-primary hover:underline transition-colors" data-slot="link">
                  Primary link with hover effects
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-slot="link">
                  Muted link with color transition
                </a>
              </div>
              <div>
                <a href="#" className="text-destructive hover:underline transition-colors" data-slot="link">
                  Destructive link with underline
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 