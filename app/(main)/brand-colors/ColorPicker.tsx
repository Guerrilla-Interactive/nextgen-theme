'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/features/unorganized-utils/utils';

import { Button } from '@/features/unorganized-components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/unorganized-components/ui/popover';
import { Input } from '@/features/unorganized-components/ui/input';
import { useForwardedRef } from '@/features/unorganized-utils/use-forwarded-ref';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}




const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithRef<typeof Button>, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn(
              'block h-10 w-10 md:h-12 md:w-12 rounded-md border-2 border-[var(--border)] hover:border-[var(--border)] focus:border-[var(--border)] focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2 focus:ring-offset-[var(--surface-muted)] cursor-pointer transition-all',
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
            onChange={onChange} 
          />
          <Input
            className="mt-4 h-10 px-3 py-2 bg-[var(--input-bg,var(--surface-input))] text-[var(--input-fg,var(--foreground))] text-sm rounded-md border border-[var(--input-border,var(--border-color-default))] font-mono placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--input-bg,var(--surface-input))] transition-colors"
            maxLength={7}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
            placeholder="#RRGGBB"
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker }; 