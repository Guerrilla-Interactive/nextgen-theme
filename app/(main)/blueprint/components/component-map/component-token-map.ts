export interface ComponentVariant {
    [variantName: string]: string[];
  }
  
  export interface ComponentPart {
    [partName: string]: string[] | string;
  }
  
  export interface ComponentDocumentation {
    description: string;
    variants?: ComponentVariant;
    base?: string[];
    parts?: ComponentPart;
  }
  
  export const componentTokenMap: Record<string, ComponentDocumentation> = {
    Accordion: {
      description: "Styled with `border` for separation and `ring` for focus states.",
      parts: {
        AccordionItem: ["border"],
        AccordionTrigger: ["ring", "muted-foreground"],
      },
    },
    Avatar: {
      description: "Uses the `muted` role for its fallback background.",
      parts: {
        AvatarFallback: ["muted"],
      },
    },
    Badge: {
      description: "Varies with `primary`, `secondary`, and `destructive` roles.",
      variants: {
        primary: ["primary", "primary-foreground"],
        secondary: ["secondary", "secondary-foreground"],
        destructive: ["destructive", "destructive-foreground"],
        outline: ["foreground"],
      },
      base: ["border", "ring"],
    },
    Button: {
      description: "Driven by `primary`, `secondary`, and `destructive` variants.",
      variants: {
        primary: ["primary", "primary-foreground"],
        destructive: ["destructive"],
        outline: ["background", "accent", "accent-foreground", "input"],
        secondary: ["secondary", "secondary-foreground"],
        ghost: ["accent", "accent-foreground"],
        link: ["primary"],
      },
      base: ["ring", "destructive"],
    },
    Card: {
      description: "Defined by `card` and `card-foreground` for its surface.",
      parts: {
        Card: ["card", "card-foreground", "border"],
        CardDescription: ["muted-foreground"],
      },
    },
    Breadcrumb: {
      description: "Uses `muted-foreground` for links and `foreground` for the current page.",
      parts: {
        BreadcrumbList: ["muted-foreground"],
        BreadcrumbLink: ["foreground", "primary"],
        BreadcrumbPage: ["foreground"],
      },
    },
    Carousel: {
      description: "Navigation inherits `outline` button styles.",
      parts: {
        "CarouselPrevious/Next": "Inherits from Button 'outline' variant",
        CarouselDots: ["primary"],
        CarouselCounter: ["muted-foreground"],
      },
    },
    Chart: {
      description: "Colors are configured via custom `--color-*` variables.",
      parts: {
        ChartContainer: ["muted-foreground", "border", "muted"],
        ChartTooltipContent: ["border", "background"],
        ChartLegendContent: ["muted-foreground"],
      },
    },
    Checkbox: {
      description: "Toggles between `input` and `primary` backgrounds.",
      base: ["input", "primary", "primary-foreground", "ring", "destructive", "border"],
    },
    Command: {
      description: "Styled with `popover` and `accent` for interactive elements.",
      parts: {
        Command: ["popover", "popover-foreground"],
        CommandDialog: ["muted-foreground"],
        CommandInput: ["muted-foreground"],
        CommandGroup: ["foreground", "muted-foreground"],
        CommandSeparator: ["border"],
        CommandItem: ["accent", "accent-foreground", "muted-foreground"],
        CommandShortcut: ["muted-foreground"],
      },
    },
    Dialog: {
      description: "Content surface uses `background` and `border`.",
      parts: {
        DialogContent: ["background", "border"],
        DialogClose: ["ring", "accent", "muted-foreground"],
        DialogDescription: ["muted-foreground"],
      },
    },
    DropdownMenu: {
      description: "Menu uses `popover`; items use `accent` and `destructive`.",
      parts: {
        DropdownMenuContent: ["popover", "popover-foreground", "border"],
        DropdownMenuItem: ["accent", "accent-foreground", "destructive", "muted-foreground"],
        DropdownMenuSeparator: ["border"],
      },
    },
    Form: {
      description: "Validation states are colored with the `destructive` role.",
      parts: {
        FormLabel: ["destructive"],
        FormDescription: ["muted-foreground"],
        FormMessage: ["destructive"],
      },
    },
    Input: {
      description: "Appearance is controlled by `input`, `ring`, and `destructive`.",
      base: ["muted-foreground", "primary", "primary-foreground", "input", "ring", "destructive", "border"],
    },
    Menubar: {
      description: "Styled with `background` and `accent` for interactive states.",
      parts: {
        Menubar: ["background", "border"],
        MenubarTrigger: ["accent", "accent-foreground"],
        MenubarContent: ["popover", "popover-foreground", "border"],
        MenubarItem: ["accent", "accent-foreground", "destructive", "muted-foreground"],
        MenubarSeparator: ["border"],
      },
    },
    NavigationMenu: {
      description: "Uses `background` and `accent` for trigger states.",
      parts: {
        Trigger: ["background", "accent", "accent-foreground", "ring"],
        Content: ["popover", "popover-foreground", "border"],
        Viewport: ["popover", "popover-foreground", "border"],
        Link: ["accent", "accent-foreground", "muted-foreground", "ring"],
        Indicator: ["border"],
      },
    },
    Popover: {
      description: "Content area is styled using the `popover` role.",
      parts: {
        PopoverContent: ["popover", "popover-foreground", "border"],
      },
    },
    PostCard: {
      description: "Highlighted with the `primary` role border on hover.",
      parts: {
        Wrapper: ["border", "primary"],
        Chevron: ["border", "primary"],
      },
    },
    Progress: {
      description: "Fill color is determined by the `primary` role.",
      base: ["primary"],
    },
    RadioGroup: {
      description: "Items are styled with `input` and `primary` roles.",
      base: ["input", "primary", "ring", "destructive", "border"],
    },
    Select: {
      description: "Uses `input` for the trigger and `popover` for the content.",
      parts: {
        SelectTrigger: ["input", "muted-foreground", "ring", "border", "destructive"],
        SelectContent: ["popover", "popover-foreground", "border"],
        SelectItem: ["accent", "accent-foreground", "muted-foreground"],
        SelectSeparator: ["border"],
      },
    },
    Separator: {
      description: "Color is defined by the `border` role.",
      base: ["border"],
    },
    Sheet: {
      description: "A side panel styled with `background` and `border`.",
      parts: {
        SheetContent: ["background", "border"],
        SheetClose: ["ring", "secondary"],
        SheetTitle: ["foreground"],
        SheetDescription: ["muted-foreground"],
      },
    },
    Sonner: {
      description: "Toasts are styled with `background`, `primary`, and `muted`.",
      parts: {
        Toast: ["background", "foreground", "border"],
        Description: ["muted-foreground"],
        ActionButton: ["primary", "primary-foreground"],
        CancelButton: ["muted", "muted-foreground"],
      },
    },
    Switch: {
      description: "Toggles between `input` and `primary` backgrounds.",
      parts: {
        Root: ["primary", "input", "ring"],
        Thumb: ["background", "foreground", "primary-foreground"],
      },
    },
    Table: {
      description: "A component for displaying data in a tabular format.",
      parts: {
        TableFooter: ["muted"],
        TableRow: ["muted"],
        TableHead: ["foreground"],
        TableCaption: ["muted-foreground"],
      },
    },
    Tabs: {
      description: "Uses `muted` for the list and `background` for the active tab.",
      parts: {
        TabsList: ["muted", "muted-foreground"],
        TabsTrigger: ["background", "foreground", "ring", "muted-foreground", "input"],
      },
    },
    Textarea: {
      description: "Appearance is controlled by `input`, `ring`, and `destructive`.",
      base: ["input", "muted-foreground", "ring", "destructive", "border"],
    },
    Tooltip: {
      description: "Background color is defined by the `primary` role.",
      base: ["primary"],
    },
  };
  