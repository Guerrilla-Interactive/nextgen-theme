'use client';

import { Button } from "@/features/unorganized-components/ui/button";
import { useBrand } from "./BrandContext";
import { Input } from "@/features/unorganized-components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";

export const AnimationDemo = () => {
  const { brand } = useBrand();
  
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
      
      <div className="space-y-4">
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
              <div className="flex flex-wrap gap-3">
                <Button variant="default" data-slot="button">
                  Primary
                </Button>
                <Button variant="secondary" data-slot="button">
                  Secondary
                </Button>
                <Button variant="outline" data-slot="button">
                  Outline
                </Button>
                <Button variant="ghost" data-slot="button">
                  Ghost
                </Button>
                <Button variant="destructive" data-slot="button">
                  Destructive
                </Button>
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
                <Input placeholder="I have animations too" data-slot="input" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-md font-medium">Link Examples</h4>
              <div className="space-y-1">
                <div>
                  <a href="#" className="text-primary hover:underline transition-colors" data-slot="link">
                    Regular link with animation
                  </a>
                </div>
                <div>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-slot="link">
                    Muted link that brightens on hover
                  </a>
                </div>
                <div>
                  <a href="#" className="text-destructive hover:underline transition-colors" data-slot="link">
                    Destructive link with hover effects
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card data-slot="card" className="p-4">
          <CardHeader>
            <CardTitle>Animation Details</CardTitle>
          </CardHeader>
          <CardContent>
            {brand?.animationConfig ? (
              <div className="text-sm space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Preset:</strong> {brand.animationConfig.preset.name}
                  </div>
                  <div>
                    <strong>Root Class:</strong> <code className="bg-muted px-2 py-1 rounded text-xs">{brand.animationConfig.rootClassName}</code>
                  </div>
                </div>
                <div>
                  <strong>Description:</strong> {brand.animationConfig.preset.description}
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <h5 className="font-medium mb-2">Animation Status</h5>
                  <div className="text-xs space-y-1">
                    <div>✅ Animation CSS injected into document head</div>
                    <div>✅ Root class applied to document element</div>
                    <div>✅ Interactive elements configured with data-slot attributes</div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No animations configured for this theme</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 