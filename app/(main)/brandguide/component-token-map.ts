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
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    parts: {
      AccordionItem: ["border"],
      AccordionTrigger: ["ring", "muted-foreground"],
    },
  },
  Avatar: {
    description: "An image element with a fallback for representing a user.",
    parts: {
      AvatarFallback: ["muted"],
    },
  },
  Badge: {
    description: "Badges are used for displaying status, counts, or labels.",
    variants: {
      default: ["primary", "primary-foreground"],
      secondary: ["secondary", "secondary-foreground"],
      destructive: ["destructive", "destructive-foreground"],
      outline: ["foreground"],
    },
    base: ["border", "ring"],
  },
  Button: {
    description: "Buttons are interactive elements used for actions.",
    variants: {
      default: ["primary", "primary-foreground"],
      destructive: ["destructive"],
      outline: ["background", "accent", "accent-foreground", "input"],
      secondary: ["secondary", "secondary-foreground"],
      ghost: ["accent", "accent-foreground"],
      link: ["primary"],
    },
    base: ["ring", "destructive"],
  },
  Card: {
    description: "Cards are surfaces that display content and actions on a single topic.",
    parts: {
      Card: ["card", "card-foreground", "border"],
      CardDescription: ["muted-foreground"],
    },
  },
  Breadcrumb: {
    description: "Breadcrumbs show the user's location in a hierarchy of pages.",
    parts: {
      BreadcrumbList: ["muted-foreground"],
      BreadcrumbLink: ["foreground", "primary"],
      BreadcrumbPage: ["foreground"],
    },
  },
  Carousel: {
    description: "A carousel for cycling through elements.",
    parts: {
      "CarouselPrevious/Next": "Inherits from Button 'outline' variant",
      CarouselDots: ["primary"],
      CarouselCounter: ["muted-foreground"],
    },
  },
  Chart: {
    description: "A component for displaying charts and graphs.",
    parts: {
      ChartContainer: ["muted-foreground", "border", "muted"],
      ChartTooltipContent: ["border", "background"],
      ChartLegendContent: ["muted-foreground"],
    },
  },
  Checkbox: {
    description: "A control that allows the user to select one or more options.",
    base: ["input", "primary", "primary-foreground", "ring", "destructive", "border"],
  },
  Command: {
    description: "A command palette for users to run commands.",
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
    description: "A window overlaid on either the primary window or another dialog window.",
    parts: {
      DialogContent: ["background", "border"],
      DialogClose: ["ring", "accent", "muted-foreground"],
      DialogDescription: ["muted-foreground"],
    },
  },
  DropdownMenu: {
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    parts: {
      DropdownMenuContent: ["popover", "popover-foreground", "border"],
      DropdownMenuItem: ["accent", "accent-foreground", "destructive", "muted-foreground"],
      DropdownMenuSeparator: ["border"],
    },
  },
  Form: {
    description: "Provides form validation and structure.",
    parts: {
      FormLabel: ["destructive"],
      FormDescription: ["muted-foreground"],
      FormMessage: ["destructive"],
    },
  },
  Input: {
    description: "A control that allows the user to input text.",
    base: ["muted-foreground", "primary", "primary-foreground", "input", "ring", "destructive", "border"],
  },
  Menubar: {
    description: "A visually persistent menu bar.",
    parts: {
      Menubar: ["background", "border"],
      MenubarTrigger: ["accent", "accent-foreground"],
      MenubarContent: ["popover", "popover-foreground", "border"],
      MenubarItem: ["accent", "accent-foreground", "destructive", "muted-foreground"],
      MenubarSeparator: ["border"],
    },
  },
  NavigationMenu: {
    description: "A collection of links for navigating a website.",
    parts: {
      Trigger: ["background", "accent", "accent-foreground", "ring"],
      Content: ["popover", "popover-foreground", "border"],
      Viewport: ["popover", "popover-foreground", "border"],
      Link: ["accent", "accent-foreground", "muted-foreground", "ring"],
      Indicator: ["border"],
    },
  },
  Popover: {
    description: "A pop-up that displays information related to an element.",
    parts: {
      PopoverContent: ["popover", "popover-foreground", "border"],
    },
  },
  PostCard: {
    description: "A card for displaying a blog post or article.",
    parts: {
      Wrapper: ["border", "primary"],
      Chevron: ["border", "primary"],
    },
  },
  Progress: {
    description: "Displays an indicator showing the completion progress of a task.",
    base: ["primary"],
  },
  RadioGroup: {
    description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    base: ["input", "primary", "ring", "destructive", "border"],
  },
  Select: {
    description: "A control that allows the user to select an option from a list.",
    parts: {
      SelectTrigger: ["input", "muted-foreground", "ring", "border", "destructive"],
      SelectContent: ["popover", "popover-foreground", "border"],
      SelectItem: ["accent", "accent-foreground", "muted-foreground"],
      SelectSeparator: ["border"],
    },
  },
  Separator: {
    description: "A component for separating content.",
    base: ["border"],
  },
  Sheet: {
    description: "A sheet that slides in from the side of the screen.",
    parts: {
      SheetContent: ["background", "border"],
      SheetClose: ["ring", "secondary"],
      SheetTitle: ["foreground"],
      SheetDescription: ["muted-foreground"],
    },
  },
  Sonner: {
    description: "A toast component for displaying notifications.",
    parts: {
      Toast: ["background", "foreground", "border"],
      Description: ["muted-foreground"],
      ActionButton: ["primary", "primary-foreground"],
      CancelButton: ["muted", "muted-foreground"],
    },
  },
  Switch: {
    description: "A control that allows the user to toggle between two states.",
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
    description: "A set of layered sections of content, known as tab panels, that are displayed one at a time.",
    parts: {
      TabsList: ["muted", "muted-foreground"],
      TabsTrigger: ["background", "foreground", "ring", "muted-foreground", "input"],
    },
  },
  Textarea: {
    description: "A control that allows the user to input multi-line text.",
    base: ["input", "muted-foreground", "ring", "destructive", "border"],
  },
  Tooltip: {
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    base: ["primary"],
  },
}; 