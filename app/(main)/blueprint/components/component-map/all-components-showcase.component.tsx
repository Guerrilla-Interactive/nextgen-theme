"use client";

import React from 'react';
import { componentTokenMap, type ComponentDocumentation } from './component-token-map';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/features/unorganized-components/inspect-ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/features/unorganized-components/inspect-ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/features/unorganized-components/inspect-ui/avatar';
import { Badge, type BadgeProps } from '@/features/unorganized-components/inspect-ui/badge';
import { Button } from '@/features/unorganized-components/inspect-ui/button';
import { TokenElement } from '../token-targeting';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '@/features/unorganized-components/inspect-ui/breadcrumb';
import Breadcrumbs from '@/features/unorganized-components/inspect-ui/breadcrumbs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/features/unorganized-components/inspect-ui/carousel';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/features/unorganized-components/inspect-ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Checkbox } from '@/features/unorganized-components/inspect-ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/features/unorganized-components/inspect-ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/features/unorganized-components/inspect-ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/features/unorganized-components/inspect-ui/dropdown-menu';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/features/unorganized-components/inspect-ui/form';
import { Input } from '@/features/unorganized-components/inspect-ui/input';
import { Label } from '@/features/unorganized-components/inspect-ui/label';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/features/unorganized-components/inspect-ui/menubar';
import MissingSanityPage from '@/features/unorganized-components/inspect-ui/missing-sanity-page';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/features/unorganized-components/inspect-ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/features/unorganized-components/inspect-ui/popover';
import PostCard from '@/features/unorganized-components/inspect-ui/post-card';
import { Progress } from '@/features/unorganized-components/inspect-ui/progress';
import { RadioGroup, RadioGroupItem } from '@/features/unorganized-components/inspect-ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/unorganized-components/inspect-ui/select';
import { Separator } from '@/features/unorganized-components/inspect-ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/features/unorganized-components/inspect-ui/sheet';
import { toast } from "sonner";
import { StarRating } from '@/features/unorganized-components/inspect-ui/star-rating';
import { Switch } from '@/features/unorganized-components/inspect-ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/features/unorganized-components/inspect-ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/unorganized-components/inspect-ui/tabs';
import TagLine from '@/features/unorganized-components/inspect-ui/tag-line';
import { Textarea } from '@/features/unorganized-components/inspect-ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/features/unorganized-components/inspect-ui/tooltip';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Smile, InfoIcon } from 'lucide-react';
// Import brand context and related utilities
import { useBrand } from '../../BrandContext';
import { ColorPicker } from '../../../brand-colors/ColorPicker';
import { formatHex } from 'culori';
import { Role } from '../../brand-utils';

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

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

const MyForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {
            description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"><code className="text-white">{JSON.stringify(data, null, 2)}</code></pre>
        })
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};

const generateTokenTooltipContent = (doc: ComponentDocumentation, brand: any, processedBrand: any, handleRoleSwatchSelection: any, handleRoleDirectColorChange: any, previewRoleDirectColorChange: any, swatches: any[]) => {
    const sections: React.ReactNode[] = [];

    // Helper function to get color for a role
    const getColorForRole = (role: string) => {
        if (!processedBrand?.colors) return null;
        
        const color = processedBrand.colors.find((c: any) => 
            c.roles && c.roles.includes(role)
        );
        
        if (color && color.oklchLight) {
            return formatHex(color.oklchLight);
        }
        return null;
    };

    // Helper function to render role badge with color swatch
    const renderRoleBadge = (role: string) => {
        const colorHex = getColorForRole(role);
        
        if (colorHex) {
            return (
                <div key={role} className="inline-flex items-center gap-1.5 bg-muted/50 text-foreground px-2 py-0.5 rounded-md">
                    <ColorPicker
                        value={colorHex}
                        className="w-3 h-3 rounded-full border border-border/60 cursor-pointer hover:scale-110 transition-transform"
                        role={role as Role}
                        swatches={swatches}
                        onSwatchSelect={(swatch) => handleRoleSwatchSelection(role as Role, swatch.name)}
                        onChange={(newHex) => previewRoleDirectColorChange(role as Role, newHex)}
                        onDirectColorChange={(newHex) => handleRoleDirectColorChange(role as Role, newHex)}
                    />
                    <span className="text-xs">{role}</span>
                </div>
            );
        } else {
            return (
                <span key={role} className="text-xs bg-muted/50 text-foreground px-2 py-0.5 rounded-md">
                    {role}
                </span>
            );
        }
    };

    // Base roles
    if (doc.base && doc.base.length > 0) {
        sections.push(
            <div key="base">
                <h5 className="font-semibold text-xs mt-2 mb-1 uppercase tracking-wider text-muted-foreground">Base</h5>
                <div className="flex flex-wrap gap-1">
                    {doc.base.map(role => renderRoleBadge(role))}
                </div>
            </div>
        );
    }

    // Variants
    if (doc.variants) {
        sections.push(
            <div key="variants">
                <h5 className="font-semibold text-xs mt-2 mb-1 uppercase tracking-wider text-muted-foreground">Variants</h5>
                {Object.entries(doc.variants).map(([variantName, roles]) => (
                    <div key={variantName} className="mt-1.5">
                        <p className="text-xs font-medium capitalize">{variantName}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {roles.map(role => renderRoleBadge(role))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Parts
    if (doc.parts) {
        sections.push(
            <div key="parts">
                <h5 className="font-semibold text-xs mt-2 mb-1 uppercase tracking-wider text-muted-foreground">Parts</h5>
                {Object.entries(doc.parts).map(([partName, value]) => (
                    <div key={partName} className="mt-1.5">
                        <p className="text-xs font-medium">{partName}</p>
                        {Array.isArray(value) ? (
                            <div className="flex flex-wrap gap-1 mt-1">
                                {value.map(role => renderRoleBadge(role))}
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground mt-1">{value}</p>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    if (sections.length === 0) {
        return <p className="text-xs text-muted-foreground">No specific roles documented for this component.</p>;
    }

    return (
        <div>
            <h4 className="font-semibold text-sm mb-1">Influenced by</h4>
            {sections}
        </div>
    );
};

const renderComponent = (name: string, doc: ComponentDocumentation) => {
    switch (name) {
        case 'Accordion':
            return (
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        case 'Avatar':
            return (
                <div className="flex gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="/invalid-path.png" alt="fallback" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            );
        case 'Badge':
            return (
                <div className="flex flex-wrap gap-2">
                    {doc.variants && Object.keys(doc.variants).map(variant => (
                        <Badge key={variant} variant={variant === 'primary' ? 'default' : variant as BadgeProps['variant']}>{variant}</Badge>
                    ))}
                </div>
            );
        case 'Button':
            return (
                <div className="flex flex-wrap gap-2">
                    {doc.variants && Object.keys(doc.variants).map(variant => (
                        <Button key={variant} variant={variant === 'primary' ? 'default' : variant as any}>{variant}</Button>
                    ))}
                </div>
            );
        case 'Breadcrumb':
            return (
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            );
        case 'Carousel':
            return (
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            );
        case 'Chart':
            return (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis />
                            <RechartsTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
                            <Bar dataKey="tv" fill="var(--color-tv)" radius={4} />
                            <Bar dataKey="console" fill="var(--color-console)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            );
        case 'Checkbox':
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Accept terms and conditions
                    </label>
                </div>
            );
        case 'Command':
            return (
                <Command className="rounded-lg border border-border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>Calendar</CommandItem>
                            <CommandItem>Search Emoji</CommandItem>
                            <CommandItem>Calculator</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>Profile</CommandItem>
                            <CommandItem>Billing</CommandItem>
                            <CommandItem>Settings</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            );
        case 'Dialog':
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">Username</Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            );
        case 'DropdownMenu':
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        case 'Form':
            return <MyForm />;
        case 'Input':
            return <Input placeholder="Email" />;
        case 'Label':
            return <Label htmlFor="email">Your email address</Label>;
        case 'Menubar':
            return (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New Tab</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            );
        case 'NavigationMenu':
            return (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/">
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    shadcn/ui
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Beautifully designed components built with Radix UI and Tailwind CSS.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            );
        case 'Popover':
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Open popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            );
        case 'Progress':
            return <Progress value={33} />;
        case 'RadioGroup':
            return (
                <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                </RadioGroup>
            );
        case 'Select':
            return (
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            );
        case 'Separator':
            return (
                <div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                        <p className="text-sm text-muted-foreground">
                            An open-source UI component library.
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div>Blog</div>
                        <Separator orientation="vertical" />
                        <div>Docs</div>
                        <Separator orientation="vertical" />
                        <div>Source</div>
                    </div>
                </div>
            );
        case 'Sheet':
            return (
                <Sheet>
                    <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            );
        case 'Switch':
            return (
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
            );
        case 'Table':
            return (
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        case 'Tabs':
            return (
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            );
        case 'Textarea':
            return <Textarea placeholder="Type your message here." />;
        case 'Tooltip':
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        case 'Sonner':
            return (
                <Button
                    variant="outline"
                    onClick={() =>
                        toast("Event has been created.", {
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                    }
                >
                    Show Toast
                </Button>
            )
        case 'Card':
            return (
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            );
        case 'StarRating':
            return (
                <div className="flex flex-col gap-2">
                    <StarRating rating={3.5} />
                    <StarRating rating={4} size="lg" />
                </div>
            )
        case 'TagLine':
            return <TagLine title="This is a tagline" />
        case 'PostCard':
            return <PostCard title="Example Post" excerpt="This is an example post card." />
        default:
            return <p className="text-sm text-muted-foreground">Showcase for {name} not implemented yet.</p>;
    }
};

export const AllComponentsShowcase = () => {
    // Use brand context
    const { 
        brand, 
        processedBrand,
        handleRoleSwatchSelection,
        handleRoleDirectColorChange,
        previewRoleDirectColorChange,
        addNewColor
    } = useBrand();

    // Generate swatches for color picker (similar to colors-tab)
    const swatches = React.useMemo(() => 
        brand?.colors?.filter(c => {
            // Exclude colors that are primarily chart colors
            const chartRoles = c.roles?.filter(role => role.startsWith('chart-')) || [];
            const nonChartRoles = c.roles?.filter(role => !role.startsWith('chart-')) || [];
            
            if (chartRoles.length > 0 && nonChartRoles.length === 0) {
                return false;
            }
            
            return true;
        }).map(c => ({
            name: c.variableName,
            displayName: c.name,
            color: formatHex(c.oklch as string) || '#000000'
        })).filter(s => s.color !== '#000000') || [], 
        [brand]
    );

    // Handle adding new color swatch
    const handleSwatchAdd = (name: string, color: string, onColorCreated?: (variableName: string) => void) => {
        addNewColor(name, color, [], (newColorName) => {
            const generateExpectedVariableName = (displayName: string): string => {
                let baseVariableName = displayName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                let finalVariableName = baseVariableName;
                
                let variableCounter = 1;
                if (brand?.colors) {
                    while (brand.colors.find(color => color.variableName === finalVariableName)) {
                        finalVariableName = `${baseVariableName}-${variableCounter}`;
                        variableCounter++;
                    }
                }
                
                return finalVariableName;
            };
            
            const expectedVariableName = generateExpectedVariableName(newColorName);
            
            if (onColorCreated) {
                onColorCreated(expectedVariableName);
            }
        });
    };

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {Object.entries(componentTokenMap).map(([name, doc]) => (
                <Card key={name} className="overflow-hidden break-inside-avoid">
                    <CardHeader className="relative">
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button className="absolute -top-3.5 right-4 h-6 w-6 flex items-center justify-center rounded-full  hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                                    <InfoIcon className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-3">
                                {generateTokenTooltipContent(
                                    doc, 
                                    brand, 
                                    processedBrand, 
                                    handleRoleSwatchSelection, 
                                    handleRoleDirectColorChange, 
                                    previewRoleDirectColorChange, 
                                    swatches
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-start gap-4 flex-grow">
                        {renderComponent(name, doc)}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}; 