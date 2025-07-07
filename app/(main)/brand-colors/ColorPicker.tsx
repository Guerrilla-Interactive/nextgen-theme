'use client';

import { forwardRef, useMemo, useState, useRef, useEffect } from 'react';
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
  onSwatchAdd?: (name: string, color: string, onColorCreated?: (variableName: string) => void) => void;
  onSwatchUpdate?: (oldName: string, newName: string, color: string) => void;
  onSwatchDelete?: (name: string) => void;
  onSwatchSelect?: (swatch: ColorSwatch) => void;
  onDirectColorChange?: (color: string) => void;
  role?: string; // Add role prop to show which role is being edited
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
      role,
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
    
    // Add ref for the color name input to manage focus
    const colorNameInputRef = useRef<HTMLInputElement>(null);
    
    // Add refs for swatch buttons to manage focus on newly created swatches
    const swatchRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [focusNewSwatch, setFocusNewSwatch] = useState<string | null>(null);
    
    // Add useEffect to manage focus when creating new colors
    useEffect(() => {
      // Focus the newly created swatch button when it becomes available
      if (focusNewSwatch && swatches) {
        // Check if the new swatch exists in the swatches array
        const newSwatchExists = swatches.find(swatch => swatch.name === focusNewSwatch);
        
        if (newSwatchExists && swatchRefs.current[focusNewSwatch]) {
          // Small delay to ensure the button is rendered and DOM is updated
          setTimeout(() => {
            const buttonRef = swatchRefs.current[focusNewSwatch];
            if (buttonRef) {
              buttonRef.focus();
              setFocusNewSwatch(null); // Clear the focus target
            }
          }, 150);
        } else if (newSwatchExists) {
          // Swatch exists but ref not set yet, try again after a short delay
          const retryFocus = () => {
            setTimeout(() => {
              if (swatchRefs.current[focusNewSwatch]) {
                swatchRefs.current[focusNewSwatch]?.focus();
                setFocusNewSwatch(null);
              }
            }, 200);
          };
          retryFocus();
        }
      }
    }, [focusNewSwatch, swatches]);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    // Handle swatch selection - this is for role reassignment
    const handleSwatchSelect = (swatch: ColorSwatch) => {
      // Set flag to indicate swatch selection is in progress
      setIsSwatchSelectionInProgress(true);
      
      // Set internal state
      setSelectedSwatch(swatch);
      setColorName(swatch.displayName || swatch.name);
      setIsCreatingNew(false);
      
      // If we have a swatch selection callback (for role reassignment), use it
      if (onSwatchSelect) {
        console.log(`[ColorPicker] Role reassignment: selecting swatch "${swatch.name}" with color ${swatch.color}`);
        onSwatchSelect(swatch);
        
        // For role reassignment, update the UI value but DO NOT trigger onChange 
        // which would cause unwanted color modifications
        // Instead, just update the visual state without triggering color changes
        // The role reassignment will handle all the color updates correctly
        console.log(`[ColorPicker] Role reassignment completed, not triggering onChange to avoid color conflicts`);
      } else {
        // Fallback to color change if no swatch selection handler
        onChange(swatch.color);
      }
      
      // Clear the flag after a short delay to allow the hex input to update
      setTimeout(() => {
        setIsSwatchSelectionInProgress(false);
      }, 100);
    };

    // Handle creating new color
    const handleCreateNew = () => {
      if (onSwatchAdd) {
        // Generate a more user-friendly name based on the color
        const generateColorName = (hexColor: string): string => {
          const colorCount = swatches ? swatches.length : 0;
          
          // Parse the hex color to get hue information
          const r = parseInt(hexColor.slice(1, 3), 16);
          const g = parseInt(hexColor.slice(3, 5), 16);
          const b = parseInt(hexColor.slice(5, 7), 16);
          
          // Convert to HSL to get hue
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          let hue = 0;
          if (diff !== 0) {
            switch (max) {
              case r: hue = ((g - b) / diff) % 6; break;
              case g: hue = (b - r) / diff + 2; break;
              case b: hue = (r - g) / diff + 4; break;
            }
          }
          hue = Math.round(hue * 60);
          if (hue < 0) hue += 360;
          
          // Map hue to color names
          let colorName = 'Gray';
          if (diff > 20) { // Only assign color names if there's enough saturation
            if (hue >= 0 && hue < 15) colorName = 'Red';
            else if (hue >= 15 && hue < 45) colorName = 'Orange';
            else if (hue >= 45 && hue < 75) colorName = 'Yellow';
            else if (hue >= 75 && hue < 150) colorName = 'Green';
            else if (hue >= 150 && hue < 210) colorName = 'Cyan';
            else if (hue >= 210 && hue < 270) colorName = 'Blue';
            else if (hue >= 270 && hue < 330) colorName = 'Purple';
            else colorName = 'Pink';
          }
          
          return `${colorName} Color ${colorCount + 1}`;
        };
        
        const newColorName = generateColorName(parsedValue);
        
        // Create the new color with callback to handle the actual variable name
        onSwatchAdd(newColorName, parsedValue, (actualVariableName) => {
          // Create a swatch object with the actual variable name from the brand context
          const newSwatch = { 
            name: actualVariableName, 
            color: parsedValue, 
            displayName: newColorName 
          };
          
          // Set the new color as selected for future updates
          setSelectedSwatch(newSwatch);
          setColorName(newColorName); // Keep the display name for the UI
          setIsCreatingNew(false); // Not creating new anymore, now editing the created one
          
          // Set focus target using the actual variable name (which matches the swatch.name key)
          setFocusNewSwatch(actualVariableName);
          
          // If we have a swatch selection callback (for role assignment), automatically select the new color
          if (onSwatchSelect) {
            // Immediately assign the new color to the current role
            // No need to wait for the swatches array since we have all the data we need
            onSwatchSelect(newSwatch);
          }
        });
      } else {
        // Fallback to old behavior if no onSwatchAdd handler
        setSelectedSwatch(null);
        setColorName('');
        setIsCreatingNew(true);
      }
    };

    // Handle color name change
    const handleColorNameChange = (newName: string) => {
      setColorName(newName);
      
      if (selectedSwatch && onSwatchUpdate && newName.trim()) {
        // Update existing swatch name
        onSwatchUpdate(selectedSwatch.name, newName.trim(), parsedValue);
        setSelectedSwatch({ ...selectedSwatch, name: newName.trim() });
      }
    };

    // Handle saving new swatch
    const handleSaveNewSwatch = () => {
      if (isCreatingNew && onSwatchAdd && colorName.trim()) {
        onSwatchAdd(colorName.trim(), parsedValue, (actualVariableName) => {
          // Create a swatch object with the actual variable name
          const newSwatch = { 
            name: actualVariableName, 
            color: parsedValue, 
            displayName: colorName.trim() 
          };
          
          setSelectedSwatch(newSwatch);
          setColorName(colorName.trim()); // Keep the display name for the UI
          setIsCreatingNew(false);
          setFocusNewSwatch(actualVariableName);
          
          // If we have a swatch selection callback (for role assignment), automatically select the new color
          if (onSwatchSelect) {
            // Immediately assign the new color to the current role
            // No need to wait for the swatches array since we have all the data we need
            onSwatchSelect(newSwatch);
          }
        });
      }
    };

    // Handle color change from picker (live preview)
    const handleColorChange = (newColor: string) => {
      // Check if this is happening during a swatch selection
      if (isSwatchSelectionInProgress) {
        return;
      }
      
      // Always call onChange for live preview
      onChange(newColor);
      
      // If we have an existing swatch selected, update it
      if (selectedSwatch && onSwatchUpdate) {
        onSwatchUpdate(selectedSwatch.name, selectedSwatch.name, newColor);
        // Update local selectedSwatch state to reflect the new color
        setSelectedSwatch({ ...selectedSwatch, color: newColor });
      }
    };

    // Handle direct color input changes (hex input field)
    const handleHexInputChange = (hexValue: string) => {
      // Check if this is happening during a swatch selection
      if (isSwatchSelectionInProgress) {
        console.log(`[ColorPicker] Hex input change ignored during swatch selection: ${hexValue}`);
        return;
      }
      
      // Check if this is just reflecting a swatch selection (user didn't manually type)
      const isReflectingSwatchSelection = selectedSwatch && hexValue.toLowerCase() === selectedSwatch.color.toLowerCase();
      
      if (isReflectingSwatchSelection) {
        console.log(`[ColorPicker] Hex input reflecting swatch selection, updating UI only: ${hexValue}`);
        // Just update the live preview, don't trigger direct color change
        onChange(hexValue);
        return;
      }
      
      // For manual hex input, distinguish between role reassignment mode and regular color editing
      if (onSwatchSelect && onDirectColorChange) {
        // In role reassignment mode, manual hex input should trigger direct color change
        console.log(`[ColorPicker] Manual hex input in role reassignment mode: ${hexValue}`);
        onDirectColorChange(hexValue);
      } else {
        // Regular color picker mode
        console.log(`[ColorPicker] Regular hex input change: ${hexValue}`);
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
          {/* Role Header - shown when in role assignment mode */}
          {role && onSwatchSelect && (
            <div className="mb-4 pb-3 border-b border-[var(--border)]">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                Editing{' '}
                <span className="capitalize">
                  {role
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())
                    .replace(/Foreground/g, 'Text')
                  }
                </span>{' '}
                Role
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Select a color or create a new one to assign to this role
              </p>
            </div>
          )}
          
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
                    ref={(el) => {
                      if (el) {
                        swatchRefs.current[swatch.name] = el;
                      } else {
                        // Cleanup when element is unmounted
                        if (swatchRefs.current[swatch.name]) {
                          delete swatchRefs.current[swatch.name];
                        }
                      }
                    }}
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
                {isCreatingNew ? 'New Color Name' : selectedSwatch?.name.includes('Color ') ? 'Rename Color' : 'Color Name'}
              </p>
              <div className="flex gap-2">
                <Input
                  className="h-8 px-3 py-1 bg-[var(--input-bg,var(--surface-input))] text-[var(--input-fg,var(--foreground))] text-sm rounded-md border border-[var(--input-border,var(--border-color-default))] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--input-bg,var(--surface-input))] transition-colors"
                  placeholder="Enter color name..."
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  onBlur={() => !isCreatingNew && handleColorNameChange(colorName)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (isCreatingNew) {
                        handleSaveNewSwatch();
                      } else {
                        handleColorNameChange(colorName);
                      }
                      e.currentTarget.blur();
                    }
                  }}
                  ref={colorNameInputRef}
                />
                {isCreatingNew && (
                  <Button
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={handleSaveNewSwatch}
                    disabled={!colorName.trim()}
                  >
                    Save
                  </Button>
                )}
              </div>
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