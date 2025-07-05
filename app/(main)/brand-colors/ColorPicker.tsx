'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/features/unorganized-utils/utils';
import { Plus } from 'lucide-react';

import { Button } from '@/features/unorganized-components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/unorganized-components/ui/popover';
import { Input } from '@/features/unorganized-components/ui/input';
import { useForwardedRef } from '@/features/unorganized-utils/use-forwarded-ref';

interface ColorSwatch {
  color: string;
  name: string; // This will be the variableName for matching
  displayName?: string; // This will be the display name for UI
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  swatches?: ColorSwatch[];
  onSwatchAdd?: (name: string, color: string) => void;
  onSwatchUpdate?: (oldName: string, newName: string, color: string) => void;
  onSwatchDelete?: (name: string) => void;
  onSwatchSelect?: (swatch: ColorSwatch) => void;
  onDirectColorChange?: (color: string) => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithRef<typeof Button>, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { 
      disabled, 
      value, 
      onChange, 
      onBlur, 
      name, 
      className, 
      swatches, 
      onSwatchAdd,
      onSwatchUpdate,
      onSwatchDelete,
      onSwatchSelect,
      onDirectColorChange,
      ...props 
    },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);
    const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch | null>(null);
    const [colorName, setColorName] = useState('');
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [isSwatchSelectionInProgress, setIsSwatchSelectionInProgress] = useState(false);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    // Handle swatch selection - this is for role reassignment
    const handleSwatchSelect = (swatch: ColorSwatch) => {
      console.log(`[ColorPicker] Swatch selected: "${swatch.name}" (${swatch.displayName || swatch.name}) with color: ${swatch.color}`);
      
      // Set flag to indicate swatch selection is in progress
      setIsSwatchSelectionInProgress(true);
      
      // Set internal state
      setSelectedSwatch(swatch);
      setColorName(swatch.displayName || swatch.name);
      setIsCreatingNew(false);
      
      // If we have a swatch selection callback (for role reassignment), use it
      if (onSwatchSelect) {
        console.log(`[ColorPicker] Calling onSwatchSelect for role reassignment with variableName: "${swatch.name}"`);
        console.log(`[ColorPicker] 🎨 ROLE REASSIGNMENT: This will change the theme color to "${swatch.displayName || swatch.name}" (${swatch.color})`);
        onSwatchSelect(swatch);
        // Don't close the popover - let users continue making adjustments
        // setOpen(false); // Removed automatic closing
      } else {
        // Fallback to color change if no swatch selection handler
        console.log(`[ColorPicker] No onSwatchSelect handler, falling back to onChange`);
        onChange(swatch.color);
      }
      
      // Clear the flag after a short delay to allow the hex input to update
      setTimeout(() => {
        setIsSwatchSelectionInProgress(false);
      }, 100);
    };

    // Handle creating new color
    const handleCreateNew = () => {
      setSelectedSwatch(null);
      setColorName('');
      setIsCreatingNew(true);
    };

    // Handle color name change
    const handleColorNameChange = (newName: string) => {
      setColorName(newName);
      
      if (selectedSwatch && onSwatchUpdate) {
        // Update existing swatch
        onSwatchUpdate(selectedSwatch.name, newName, parsedValue);
        setSelectedSwatch({ ...selectedSwatch, name: newName });
      } else if (isCreatingNew && onSwatchAdd && newName.trim()) {
        // Create new swatch
        onSwatchAdd(newName, parsedValue);
        setSelectedSwatch({ name: newName, color: parsedValue });
        setIsCreatingNew(false);
      }
    };

    // Handle color change from picker (live preview)
    const handleColorChange = (newColor: string) => {
      console.log(`[ColorPicker] Color changed to: ${newColor}`);
      
      // Check if this is happening during a swatch selection
      if (isSwatchSelectionInProgress) {
        console.log(`[ColorPicker] Color change ignored - swatch selection in progress`);
        return;
      }
      
      // Always call onChange for live preview
      onChange(newColor);
      
      // If we have an existing swatch selected, update it
      if (selectedSwatch && onSwatchUpdate) {
        onSwatchUpdate(selectedSwatch.name, selectedSwatch.name, newColor);
        setSelectedSwatch({ ...selectedSwatch, color: newColor });
      }
    };

    // Handle direct color input changes (hex input field)
    const handleHexInputChange = (hexValue: string) => {
      console.log(`[ColorPicker] Hex input changed to: ${hexValue}`);
      
      // Check if this is happening during a swatch selection
      if (isSwatchSelectionInProgress) {
        console.log(`[ColorPicker] Hex input change ignored - swatch selection in progress`);
        return;
      }
      
      // Check if this is just reflecting a swatch selection (user didn't manually type)
      const isReflectingSwatchSelection = selectedSwatch && hexValue.toLowerCase() === selectedSwatch.color.toLowerCase();
      
      if (isReflectingSwatchSelection) {
        console.log(`[ColorPicker] Hex input is just reflecting swatch selection, not triggering direct color change`);
        // Just update the live preview, don't trigger direct color change
        onChange(hexValue);
        return;
      }
      
      // For hex input, treat as direct color change only if user manually typed
      if (onDirectColorChange) {
        console.log(`[ColorPicker] 🎨 DIRECT COLOR CHANGE: This may create a new color token if the current color is assigned to multiple roles`);
        onDirectColorChange(hexValue);
      } else {
        onChange(hexValue);
      }
    };

    // Reset state when popover closes
    const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setSelectedSwatch(null);
        setColorName('');
        setIsCreatingNew(false);
      } else {
        // When opening, check if current value matches any swatch
        if (swatches && swatches.length > 0) {
          const matchingSwatch = swatches.find(swatch => 
            swatch.color.toLowerCase() === parsedValue.toLowerCase()
          );
          if (matchingSwatch) {
            setSelectedSwatch(matchingSwatch);
            setColorName(matchingSwatch.displayName || matchingSwatch.name);
            setIsCreatingNew(false);
          }
        }
      }
    };

    return (
      <Popover onOpenChange={handleOpenChange} open={open}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            {...props}
            className={cn(
              'block rounded-md border-2 border-[var(--border)] hover:border-[var(--border)] focus:border-[var(--border)] focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2 focus:ring-offset-[var(--surface-muted)] cursor-pointer transition-all',
              !className?.includes('w-') && !className?.includes('h-') && 'h-10 w-10 md:h-12 md:w-12',
              className
            )}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size='icon'
            style={{
              backgroundColor: parsedValue,
            }}
            variant='outline'
          >
            <div className="h-full w-full pointer-events-none" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-4 bg-[var(--popover)] border-[var(--border)] rounded-md shadow-lg'>
          <HexColorPicker
            className="!w-[280px] !h-auto aspect-[16/10]"
            color={parsedValue}
            onChange={handleColorChange}
          />
          
          {swatches && swatches.length > 0 && (
            <div className='mt-4'>
              <p className="mb-2 text-xs font-medium text-[var(--muted-foreground)]">
                {onSwatchSelect ? 'Assign to Theme Color' : 'Theme Colors'}
              </p>
              <div className="grid grid-cols-8 gap-2">
                {swatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    title={onSwatchSelect ? `Assign to ${swatch.displayName || swatch.name}` : (swatch.displayName || swatch.name)}
                    className={cn(
                      "h-6 w-6 cursor-pointer rounded-md border transition-all hover:ring-1 hover:ring-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--popover)]",
                      selectedSwatch?.name === swatch.name 
                        ? "border-[var(--ring)] ring-2 ring-[var(--ring)]" 
                        : "border-[var(--border)]/50"
                    )}
                    style={{ backgroundColor: swatch.color }}
                    onClick={() => handleSwatchSelect(swatch)}
                  />
                ))}
                
                {/* Add new color button */}
                {onSwatchAdd && (
                  <button
                    type="button"
                    title="Add new color"
                    className={cn(
                      "h-6 w-6 cursor-pointer rounded-md border border-dashed border-[var(--border)] bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50 transition-all hover:ring-1 hover:ring-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--popover)] flex items-center justify-center",
                      isCreatingNew && "border-[var(--ring)] ring-2 ring-[var(--ring)] bg-[var(--muted)]"
                    )}
                    onClick={handleCreateNew}
                  >
                    <Plus className="w-3 h-3 text-[var(--muted-foreground)]" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Color Name Input */}
          {(selectedSwatch || isCreatingNew) && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-[var(--muted-foreground)]">
                {isCreatingNew ? 'New Color Name' : 'Color Name'}
              </p>
              <Input
                className="h-8 px-3 py-1 bg-[var(--input-bg,var(--surface-input))] text-[var(--input-fg,var(--foreground))] text-sm rounded-md border border-[var(--input-border,var(--border-color-default))] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--input-bg,var(--surface-input))] transition-colors"
                placeholder="Enter color name..."
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                onBlur={() => handleColorNameChange(colorName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleColorNameChange(colorName);
                    e.currentTarget.blur();
                  }
                }}
              />
            </div>
          )}

          {/* Hex Input */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-[var(--muted-foreground)]">Hex Value</p>
            <Input
              className="h-8 px-3 py-1 bg-[var(--input-bg,var(--surface-input))] text-[var(--input-fg,var(--foreground))] text-sm rounded-md border border-[var(--input-border,var(--border-color-default))] font-mono placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus:ring-offset-[var(--input-bg,var(--surface-input))] transition-colors"
              maxLength={7}
              onChange={(e) => {
                handleHexInputChange(e?.currentTarget?.value);
              }}
              ref={ref}
              value={parsedValue}
              placeholder="#RRGGBB"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };