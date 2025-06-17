import React, { useEffect, useRef } from "react";
import { GridCol } from "@/features/unorganized-components/nextgen-core-ui";
import { Role, type OklchString } from "../brand-utils";
import { ProcessedColorToken } from "../page";
import { ColorPicker } from "../../brand-colors/ColorPicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/features/unorganized-components/ui/tooltip';

// Import components for previews - only using components from all-components-showcase.component.tsx
import { Button } from '@/features/unorganized-components/ui/button';
import { Badge } from '@/features/unorganized-components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/unorganized-components/ui/card';
import { Input } from '@/features/unorganized-components/ui/input';
import { Label } from '@/features/unorganized-components/ui/label';
import { Progress } from '@/features/unorganized-components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/features/unorganized-components/ui/radio-group';
import { Separator } from '@/features/unorganized-components/ui/separator';
import { Textarea } from '@/features/unorganized-components/ui/textarea';
import {
  Info as InfoIcon,

  CheckCircle,

  Search
} from 'lucide-react';
import { ChartContainer } from "@/features/unorganized-components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Checkbox } from "@/features/unorganized-components/ui/checkbox";
import { Switch } from "@/features/unorganized-components/ui/switch";

/*───────────────────────────────────────────────────────────────────────────*
  Types
 *──────────────────────────────────────────────────────────────────────────*/

interface ColorSwatch {
  name: string;
  color: string;
}

type RoleUIItem = {
  role: Role;
  statusLabel: string;
  baseClasses: string;
  buttonTitle: string;
  isAssignedGlobally: boolean;
  statusIndicatorBgClass: string;
  assignedColorHex: string | null;
  assignedByColorName: string | null;
  accessibleTextColor: OklchString;
  statusIndicatorAccessibleTextColor: OklchString;
};

type RoleGroupItem = {
  type: 'group';
  subCategoryName: string;
  description: string | null;
  roles: RoleUIItem[];
};

type FlattenedRoleItem = RoleGroupItem & {
  categoryName: string;
  icon: React.ElementType;
  categoryDescription: string;
};

interface ThemeRoleAssignmentGridProps {
  categorizedRoleUiData: Array<{
    categoryName: string;
    icon: React.ElementType;
    description: string;
    subCategories: Array<{
      subCategoryName: string;
      roles: RoleGroupItem[];
    }>;
  }> | null;
  actualSelectedColorData: ProcessedColorToken | null;
  handleRoleInteraction: (role: Role) => void;
  setSelectedColorName: (name: string | null) => void;
  swatches: ColorSwatch[];
  handleRoleColorChange: (role: Role, newColorHex: string) => void;
  onRoleClick?: (role: Role) => void;
  selectedRole?: Role | null;
}

/*───────────────────────────────────────────────────────────────────────────*
  Enhanced Component Preview Logic
 *──────────────────────────────────────────────────────────────────────────*/

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart1)" },
  mobile: { label: "Mobile", color: "var(--chart2)" },
  tablet: { label: "Tablet", color: "var(--chart3)" },
  tv: { label: "TV", color: "var(--chart4)" },
  console: { label: "Console", color: "var(--chart5)" },
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 100, tv: 100, console: 100 },
  { month: "February", desktop: 305, mobile: 200, tablet: 150, tv: 150, console: 150 },
  { month: "March", desktop: 237, mobile: 120, tablet: 120, tv: 120, console: 120 },
  { month: "April", desktop: 73, mobile: 190, tablet: 130, tv: 130, console: 130 },
  { month: "May", desktop: 209, mobile: 130, tablet: 140, tv: 140, console: 140 },
  { month: "June", desktop: 214, mobile: 140, tablet: 150, tv: 150, console: 150 },
];

// Helper function to get role color or fallback
const getRoleColor = (roleName: Role, roles: RoleUIItem[], fallback: string = 'transparent'): string => {
  const role = roles.find(r => r.role === roleName);
  return role?.assignedColorHex || fallback;
};

// Helper function to get accessible text color
const getAccessibleText = (roleName: Role, roles: RoleUIItem[], fallback: string = 'currentColor'): string => {
  const role = roles.find(r => r.role === roleName);
  return role?.accessibleTextColor || fallback;
};

const renderSophisticatedPreview = (subCategoryName: string, categoryName: string, roles: RoleUIItem[]) => {
  // Enhanced carousel examples
  const renderCarouselExamples = (examples: React.ReactNode[]) => {
    if (examples.length <= 1) return { content: <div className="p-6">{examples[0]}</div>, navigation: null };

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const content = (
      <div className="flex-1 flex items-center justify-center p-6">
        {examples[currentIndex]}
      </div>
    );

    const navigation = (
      <>
        <button
          onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : examples.length - 1)}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white text-sm transition-colors z-10"
          aria-label="Previous example"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrentIndex(prev => prev < examples.length - 1 ? prev + 1 : 0)}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white text-sm transition-colors z-10"
          aria-label="Next example"
        >
          ›
        </button>
        {/* Pagination at bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-2">
          {examples.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-current opacity-100' : 'bg-current opacity-30'
                }`}
              aria-label={`Go to example ${index + 1}`}
            />
          ))}
        </div>
      </>
    );

    return { content, navigation };
  };

  switch (subCategoryName.toLowerCase()) {
    case 'primary':
      const primaryExamples = [
        // Primary button focused
        <Button variant="default" className="px-8 py-3">Primary Action</Button>,

        // Primary badge focused
        <Badge variant="default" className="px-4 py-1 text-sm">Primary Badge</Badge>,

        // Primary progress bar
        <div className="space-y-2 w-[200px]">
          <Progress value={75} />
          <span className="text-xs text-[var(--primary)]">75% Complete</span>
        </div>
      ];

      return renderCarouselExamples(primaryExamples);

    case 'secondary':
      const secondaryExamples = [
        // Secondary button focused
        <Button variant="secondary" className="px-8 py-3">Secondary Action</Button>,

        // Secondary badge focused
        <Badge variant="secondary" className="px-4 py-1 text-sm">Secondary</Badge>,

        // Secondary surface
        <div className="bg-[var(--secondary)] text-[var(--secondary-foreground)] p-4 rounded-md w-[200px] text-center">
          <span className="text-sm font-medium">Secondary Surface</span>
        </div>
      ];

      return renderCarouselExamples(secondaryExamples);

    case 'accent':
      const accentExamples = [
        // Accent button focused
        <Button variant="ghost" className="px-8 py-3">Accent Action</Button>,

        // Accent surface
        <div className="bg-[var(--accent)] text-[var(--accent-foreground)] p-4 rounded-md w-[200px] text-center">
          <span className="text-sm font-medium">Accent Surface</span>
        </div>,

        // Accent highlight
        <div className="p-3 border-l-4 border-[var(--accent)] bg-[var(--accent)]/10">
          <span className="text-[var(--accent-foreground)] font-medium">Accent Highlight</span>
        </div>
      ];

      return renderCarouselExamples(accentExamples);

    case 'destructive':
      const destructiveExamples = [
        // Destructive button focused
        <Button variant="destructive" className="px-8 py-3">Delete</Button>,

        // Destructive badge focused
        <Badge variant="destructive" className="px-4 py-1 text-sm">Error</Badge>,

        // Destructive alert focused
        <div className="bg-[var(--destructive)] text-[var(--destructive-foreground)] p-4 rounded-md w-[200px] text-center">
          <span className="text-sm font-medium">Destructive Alert</span>
        </div>
      ];

      return renderCarouselExamples(destructiveExamples);

    case 'card':
      const cardExamples = [
        // Card surface focused
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Card Surface</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--card-foreground)]">Card content area</p>
          </CardContent>
        </Card>,

        // Simple card focused on surface
        <Card className="w-[200px] p-6 text-center">
          <span className="text-[var(--card-foreground)] font-medium">Card Background</span>
        </Card>
      ];

      return renderCarouselExamples(cardExamples);

    case 'popover':
      const popoverExamples = [
        // Popover surface focused
        <div className="bg-[var(--popover)] text-[var(--popover-foreground)] p-4 rounded-md border border-border shadow-lg w-[200px] text-center">
          <span className="text-sm font-medium">Popover Surface</span>
        </div>,

        // Simple popover content
        <div className="bg-[var(--popover)] text-[var(--popover-foreground)] p-3 rounded border border-border w-[180px]">
          <p className="text-xs">Popover content area</p>
        </div>
      ];

      return renderCarouselExamples(popoverExamples);

    case 'input':
      const inputExamples = [
        // Input field focused
        <Input placeholder="Input field" className="w-[200px]" />,

        // Textarea focused
        <Textarea placeholder="Text area" className="w-[200px] h-16" />,

        // Input background surface
        <div className="bg-[var(--input)] border border-[var(--border)] rounded-md p-3 w-[200px] text-center">
          <span className="text-xs">Input Background</span>
        </div>
      ];

      return renderCarouselExamples(inputExamples);

    case 'base':
      const baseExamples = [
        // Static navigation bar
        <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-md">
          <div className="flex items-center h-9 px-4 space-x-4 text-sm">
            <span className="font-medium text-[var(--foreground)]">Dashboard</span>
            <span className="text-[var(--muted-foreground)]">Projects</span>
            <span className="text-[var(--muted-foreground)]">Settings</span>
          </div>
        </div>,

        // Menu bar appearance
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-md p-1 flex items-center gap-1">
          <div className="px-3 py-1 rounded-sm bg-[var(--accent)] text-[var(--accent-foreground)] text-sm">File</div>
          <div className="px-3 py-1 rounded-sm text-sm text-[var(--foreground)] hover:bg-[var(--accent)]/50">Edit</div>
          <div className="px-3 py-1 rounded-sm text-sm text-[var(--foreground)] hover:bg-[var(--accent)]/50">View</div>
        </div>,

        // Command interface look
        <div className="w-full bg-[var(--popover)] border border-[var(--border)] rounded-lg">
          <div className="flex items-center border-b border-[var(--border)] px-3 py-2">
            <Search className="h-4 w-4 text-[var(--muted-foreground)] mr-2" />
            <span className="text-sm text-[var(--muted-foreground)]">Search commands...</span>
          </div>
          <div className="p-2 space-y-1">
            <div className="px-2 py-1 text-sm bg-[var(--accent)] text-[var(--accent-foreground)] rounded">Create New File</div>
            <div className="px-2 py-1 text-sm text-[var(--foreground)]">Open Recent</div>
            <div className="px-2 py-1 text-sm text-[var(--foreground)]">Settings</div>
          </div>
        </div>
      ];

      return renderCarouselExamples(baseExamples);

    case 'chart palette':
      return {
        content: (
          <div className="p-6">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData.slice(0, 4)}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ),
        navigation: null
      };

    case 'muted content':
      const mutedExamples = [
        // Muted surface focused
        <div className="bg-[var(--muted)] p-4 rounded-md w-[200px] text-center">
          <span className="text-sm">Muted Surface</span>
        </div>,

        // Muted text focused
        <div className="p-4 w-[180px] text-center">
          <p className="text-[var(--muted-foreground)] text-sm">Muted Text</p>
        </div>,

        // Combined muted surface and text
        <div className="bg-[var(--muted)] text-[var(--muted-foreground)] p-4 rounded-md w-[200px] text-center">
          <span className="text-sm">Muted Background + Text</span>
        </div>
      ];

      return renderCarouselExamples(mutedExamples);

    case 'structural':
      const structuralExamples = [
        // Separator in context
        <div className="w-full">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Main Content</h4>
            <p className="text-sm text-[var(--muted-foreground)]">Primary information section</p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Navigation</div>
            <Separator orientation="vertical" />
            <div>Content</div>
            <Separator orientation="vertical" />
            <div>Sidebar</div>
          </div>
        </div>,

        // Tab-like structure (static)
        <div className="w-full">
          <div className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--muted)] p-1">
            <div className="inline-flex h-7 items-center justify-center rounded-md bg-[var(--background)] px-3 py-1 text-sm font-medium text-[var(--foreground)] shadow-sm">
              Account
            </div>
            <div className="inline-flex h-7 items-center justify-center rounded-md px-3 py-1 text-sm font-medium text-[var(--muted-foreground)]">
              Security
            </div>
          </div>
          <div className="mt-2 p-4 border border-[var(--border)] rounded-md">
            <p className="text-sm text-[var(--foreground)]">Account settings content</p>
          </div>
        </div>,

        // Expanded accordion look
        <div className="w-full border border-[var(--border)] rounded-md">
          <div className="border-b border-[var(--border)] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Is it accessible?</span>
              <span className="text-xs">▼</span>
            </div>
            <div className="mt-2 text-sm text-[var(--muted-foreground)]">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Is it styled?</span>
              <span className="text-xs">▶</span>
            </div>
          </div>
        </div>
      ];

      return renderCarouselExamples(structuralExamples);

    case 'interaction state':
      return {
        content: (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="focus-example" className="ring-2 ring-[var(--ring)] ring-offset-2" />
              <Label htmlFor="focus-example">Focused state</Label>
            </div>
            <Button className="ring-2 ring-[var(--ring)] ring-offset-2">Focused Button</Button>
          </div>
        ),
        navigation: null
      };

    case 'success':
      const successExamples = [
        // Success alert with icon
        <div className="bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] p-3 rounded-md w-[220px]">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-[var(--success)]" />
            <span className="text-sm font-medium">Success!</span>
          </div>
        </div>,

        // Success badge
        <Badge className="bg-[var(--success)] text-[var(--success-foreground)] px-3 py-1">
          Completed
        </Badge>,

        // Success surface
        <div className="bg-[var(--success)] text-[var(--success-foreground)] p-4 rounded-md w-[180px] text-center">
          <span className="text-sm font-medium">Success State</span>
        </div>
      ];

      return renderCarouselExamples(successExamples);

    case 'tooltip':
      const tooltipExamples = [
        // Static tooltip-like content
        <div className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs px-2 py-1 rounded shadow-lg">
          Add to library
        </div>,

        // Menu-like content (static)
        <Card className="w-[200px] shadow-lg bg-[var(--popover)] text-[var(--popover-foreground)]">
          <CardContent className="p-2">
            <div className="space-y-1 text-sm">
              <div className="px-2 py-1 font-medium border-b border-[var(--border)]">My Account</div>
              <div className="px-2 py-1 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] rounded">Profile</div>
              <div className="px-2 py-1 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] rounded">Settings</div>
              <div className="px-2 py-1 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] rounded">Sign Out</div>
            </div>
          </CardContent>
        </Card>,

        // Alert-style content
        <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] p-3 rounded text-sm">
          <div className="flex items-center space-x-2">
            <InfoIcon className="h-4 w-4" />
            <span>This is an informational message</span>
          </div>
        </div>
      ];

      return renderCarouselExamples(tooltipExamples);

    case 'general':
      const generalExamples = [
        // Form controls
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications" className="text-sm">Notifications</Label>
          </div>
          <Progress value={65} className="w-[200px]" />
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[var(--muted-foreground)]">65% complete</span>
          </div>
        </div>,

        // Radio selection
        <RadioGroup defaultValue="option2" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="g1" />
            <Label htmlFor="g1" className="text-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="g2" />
            <Label htmlFor="g2" className="text-sm">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option3" id="g3" />
            <Label htmlFor="g3" className="text-sm">Large</Label>
          </div>
        </RadioGroup>
      ];

      return renderCarouselExamples(generalExamples);

    default:
      // Enhanced fallback based on category
      if (categoryName === 'Charts & Data Visualization') {
        return {
          content: (
            <div className="p-6">
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData.slice(0, 4)}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ),
          navigation: null
        };
      } else if (categoryName === 'Primary Interaction') {
        return {
          content: (
            <div className="p-6">
              <div className="flex gap-2">
                <Button>Primary</Button>
                <Button variant="outline">Secondary</Button>
              </div>
            </div>
          ),
          navigation: null
        };
      } else if (categoryName === 'Component Surfaces') {
        return {
          content: (
            <div className="p-6">
              <Card className="w-[250px]">
                <CardHeader>
                  <CardTitle>Surface</CardTitle>
                  <CardDescription>Card surface with proper background and foreground</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Content area</p>
                </CardContent>
              </Card>
            </div>
          ),
          navigation: null
        };
      }

      return { content: null, navigation: null };
  }
};

/*───────────────────────────────────────────────────────────────────────────*
  Main component
 *──────────────────────────────────────────────────────────────────────────*/
export const ThemeRoleAssignmentGrid: React.FC<ThemeRoleAssignmentGridProps> = ({
  categorizedRoleUiData,
  actualSelectedColorData,
  setSelectedColorName,
  swatches,
  handleRoleColorChange,
  onRoleClick,
  selectedRole,
}) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  /* Restore CSS vars on unmount */
  useEffect(() => () => cleanupRef.current?.(), []);

  const allRoleItems = React.useMemo(() => {
    if (!categorizedRoleUiData) {
      return [];
    }
    return categorizedRoleUiData.flatMap(({ categoryName, icon, description: categoryDescription, subCategories }) =>
      subCategories.flatMap(({ roles }) =>
        roles.map(roleGroup => ({
          ...roleGroup,
          categoryName,
          icon,
          categoryDescription,
        }))
      )
    );
  }, [categorizedRoleUiData]);

  /*───────────────────────────────────────────────────────────────────────*/
  return (
    <GridCol className="col-span-5 border-dashed border-[var(--border)]/50 text-xs overflow-hidden" style={{ fontFamily: "var(--font-code, var(--font-mono, monospace))" }}>
      <div className="columns-3 gap-4 space-y-4 w-full max-w-full overflow-hidden">
        {allRoleItems.map((item: FlattenedRoleItem, index: number) => {
          const { categoryName, icon: Icon, categoryDescription, subCategoryName, description, roles } = item;

          const primaryRole = roles[0];
          const secondaryRole = roles.length > 1 ? roles[1] : null;

          const previewBg = { backgroundColor: primaryRole.assignedColorHex ?? 'transparent' } as React.CSSProperties;
          const previewFg = { color: secondaryRole ? (secondaryRole.assignedColorHex ?? primaryRole.accessibleTextColor) : primaryRole.accessibleTextColor } as React.CSSProperties;
          const isChartCategory = categoryName === 'Charts & Data Visualization';
          const isUnassigned = !primaryRole.assignedColorHex && !isChartCategory;

          const isInRoleViewMode = selectedRole !== null && selectedRole !== undefined;
          const shouldDisable = !actualSelectedColorData && !isInRoleViewMode;

          const { content, navigation } = renderSophisticatedPreview(subCategoryName, categoryName, roles);

          return (
            <div
              key={`${primaryRole.role}-${index}`}
              className={`flex flex-col rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-xs)] break-inside-avoid transition-all duration-200 hover:shadow-[var(--shadow-sm)] w-full max-w-full overflow-hidden ${isUnassigned ? 'opacity-70 hover:opacity-100' : 'opacity-100'}`}
              style={previewBg}
            >
              {/* Enhanced Component Preview Section */}
              {content && (
                <div className="relative p-3 bg-[var(--background)] backdrop-blur-sm border-b border-[var(--border)]/30 rounded-t-[var(--radius-md)] w-full max-w-full">
                  <div className="flex items-center justify-center h-60 w-full max-w-full overflow-hidden">
                    {content}
                  </div>
                  {navigation}
                </div>
              )}

              <div
                className="flex items-center flex-grow p-2 h-10 max-h-10"
                style={isChartCategory ? { color: 'var(--foreground)' } : previewFg}
              >
                {description ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-bold text-sm cursor-help">Aa</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="p-1 max-w-xs text-xs">{description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="font-bold text-sm">Aa</span>
                )}
                <span className="ml-2 text-xs truncate">{subCategoryName}</span>
                <div className="ml-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Icon className="h-3 w-3 cursor-pointer transition-opacity hover:opacity-80" style={{ color: 'currentColor', opacity: 0.6 }} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex items-center p-2 max-w-xs">
                          <Icon className="h-12 w-12 mr-3 text-[var(--muted-foreground)]" />
                          <div>
                            <h6 className="font-semibold text-xs mb-1">{categoryName}</h6>
                            <p className="text-xs text-[var(--muted-foreground)]">{categoryDescription}</p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="bg-[var(--background)]/60 backdrop-blur-sm p-1.5 border-t border-[var(--border)]/50 space-y-1">
                {roles.map((roleItem) => (
                  <div
                    key={roleItem.role}
                    role="button"
                    tabIndex={shouldDisable ? -1 : 0}
                    aria-disabled={shouldDisable}
                    onClick={() => onRoleClick?.(roleItem.role)}
                    className="flex items-center justify-between text-[10px] cursor-pointer rounded-sm p-1 -m-1 transition-all duration-150 hover:bg-white/10 hover:scale-[1.02]"
                  >
                    <span className="font-medium">{roleItem.role.replace(/-/g, " ")}</span>
                    <ColorPicker
                      value={roleItem.assignedColorHex ?? '#ffffff'}
                      onChange={(newHex) => handleRoleColorChange(roleItem.role, newHex)}
                      swatches={swatches}
                      className="!h-4 !w-4 rounded-[var(--radius-sm)] border border-[var(--border)]/50 transition-transform hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </GridCol>
  );
};