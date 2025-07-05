'use client';

import { Button } from "@/features/unorganized-components/ui/button";
import { useBrand } from "./BrandContext";

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
            <Button variant="link" data-slot="button">
              Link Style
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
          <h4 className="text-md font-medium">Link Examples</h4>
          <div className="space-y-1">
            <a href="#" className="text-primary hover:underline" data-slot="link">
              Regular link with animation
            </a>
            <br />
            <a href="#" className="text-muted-foreground hover:text-foreground" data-slot="link">
              Muted link that brightens on hover
            </a>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-md font-medium">Animation Details</h4>
          {brand?.animationConfig ? (
            <div className="text-sm space-y-1">
              <p><strong>Preset:</strong> {brand.animationConfig.preset.name}</p>
              <p><strong>Description:</strong> {brand.animationConfig.preset.description}</p>
              <p><strong>Root Class:</strong> <code className="bg-muted px-1 rounded">{brand.animationConfig.rootClassName}</code></p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No animations configured for this theme</p>
          )}
        </div>
      </div>
    </div>
  );
}; 