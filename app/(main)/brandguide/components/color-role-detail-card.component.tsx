import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { GridCol } from "@/features/unorganized-components/nextgen-core-ui";
import { ColorPicker } from "../../brand-colors/ColorPicker";
import { formatHex, converter } from "culori";
import { Role, type OklchString, type Shade, influenceHierarchy } from "../brand-utils";
import { ProcessedColorToken } from "../page";
import { type EnrichedShade } from "../BrandContext";
import { buttonVariantConfig } from "@/features/unorganized-components/ui/button";

interface ColorSwatch {
    name: string;
    color: string;
}

// Role descriptions for better UX
const ROLE_DESCRIPTIONS: Record<Role, string> = {
    background: "The primary background color for the entire application",
    foreground: "The primary text color with highest contrast against background",
    primary: "Main brand color for primary actions and CTAs",
    "primary-foreground": "Text color that appears on primary colored surfaces",
    secondary: "Secondary brand color for less prominent actions",
    "secondary-foreground": "Text color that appears on secondary colored surfaces",
    accent: "Accent color for highlights and tertiary actions",
    "accent-foreground": "Text color that appears on accent colored surfaces",
    card: "Background color for card components and elevated surfaces",
    "card-foreground": "Text color that appears on card surfaces",
    popover: "Background color for popover and dropdown components",
    "popover-foreground": "Text color that appears on popover surfaces",
    input: "Background color for form inputs and controls",
    "input-foreground": "Text color that appears in form inputs",
    "tooltip-background": "Background color for tooltip components",
    destructive: "Color for error states and destructive actions",
    "destructive-foreground": "Text color that appears on destructive colored surfaces",
    success: "Color for success states and positive feedback",
    "success-foreground": "Text color that appears on success colored surfaces",
    info: "Color for informational messages and neutral feedback",
    "info-foreground": "Text color that appears on info colored surfaces",

    ring: "Color for focus rings and keyboard navigation indicators",
    "chart-1": "Primary color for data visualization and charts",
    "chart-2": "Secondary color for data visualization and charts",
    "chart-3": "Tertiary color for data visualization and charts",
    "chart-4": "Quaternary color for data visualization and charts",
    "chart-5": "Fifth color for data visualization and charts",
    muted: "Subdued background color for less prominent surfaces",
    "muted-foreground": "Subdued text color for secondary content",
    border: "Standard border color for component boundaries",
    "surface-muted": "Alternative muted surface color",
    "chart-outline": "Outline color for chart elements"
};

interface ColorDetailProps {
    type: "color";
    data: ProcessedColorToken;
    swatches: ColorSwatch[];
    onColorChange: (newHex: string) => void;
    pickerValue: string;
}

interface RoleDetailProps {
    type: "role";
    data: {
        role: Role;
        assignedColor: ProcessedColorToken | null;
        assignedColorHex: string | null;
    };
    swatches: ColorSwatch[];
    onRoleColorChange: (role: Role, newHex: string) => void;
}

type ColorRoleDetailCardProps = ColorDetailProps | RoleDetailProps;

export const ColorRoleDetailCard: React.FC<ColorRoleDetailCardProps> = (props) => {
    const { swatches } = props;

    if (props.type === "color") {
        const { data: actualSelectedColorData, onColorChange, pickerValue } = props;

        return (
            <Card className="col-span-2" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
                <CardContent className="space-y-4 p-4 pb-10">
                    <GridCol className="">
                        <div className="flex items-start gap-4">
                            <ColorPicker
                                value={pickerValue}
                                onChange={onColorChange}
                                className="w-20 h-20 rounded-md flex-shrink-0"
                                swatches={swatches}
                            />
                            <div className="flex-grow">
                                <CardTitle className="text-2xl font-heading flex items-center" style={{ color: 'var(--card-foreground)' }}>
                                    {actualSelectedColorData.name}
                                    <span className="text-xs font-normal text-[var(--muted-foreground)] ml-2">
                                        ({actualSelectedColorData.importanceSummary})
                                    </span>
                                </CardTitle>
                                <CardDescription className="text-sm pt-1 font-inter" style={{ color: 'var(--card-foreground)' }}>
                                    {actualSelectedColorData.description}
                                </CardDescription>
                            </div>
                        </div>

                        <p className="text-sm font-mono" style={{ color: 'var(--card-foreground)' }}>
                            OKLCH: {actualSelectedColorData.oklchLight} <br />
                            HEX: {formatHex(actualSelectedColorData.oklchLight as string) || 'N/A'} / CSS: var(--{actualSelectedColorData.variableName})
                        </p>

                        {actualSelectedColorData.roles && actualSelectedColorData.roles.length > 0 && (
                            <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                                <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Assigned Roles (This Color):</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {actualSelectedColorData.roles.map((role, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center rounded-md border border-[var(--primary)]/50 bg-[var(--primary)]/10 px-2 py-0.5 text-[9px] font-medium text-[var(--primary)] shadow-xs"
                                            title={`This color token is assigned the role: ${role}`}
                                        >
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-3">
                            {(actualSelectedColorData.sortedDisplayShades || []).map((shade: EnrichedShade, index: number) => {
                                const levelEntry = Object.entries(actualSelectedColorData.shades).find(([_, s]) => s === shade);
                                const level = levelEntry ? levelEntry[0] : "unknown";
                                if (!shade || !shade.variableName || level === 'on') return null;
                                const shadeBgVarName = `--${shade.variableName}`;
                                const styleProps: React.CSSProperties = { backgroundColor: `var(${shadeBgVarName})` };
                                if (actualSelectedColorData.shades.on && actualSelectedColorData.shades.on.variableName) {
                                    styleProps.color = `var(--${actualSelectedColorData.shades.on.variableName})`;
                                } else {
                                    let useLightText = false;
                                    try {
                                        const oklchConverter = converter('oklch');
                                        const shadeOklchParts = oklchConverter(shade.value as string);
                                        if (shadeOklchParts && typeof shadeOklchParts.l === 'number') {
                                            useLightText = shadeOklchParts.l < 0.55;
                                        } else {
                                            if (level === 'dark' || level === 'darker') {
                                                useLightText = true;
                                            } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                                                useLightText = false;
                                            } else if (level === 'base') {
                                                const baseTokenOklchParts = oklchConverter(actualSelectedColorData.oklchLight as string);
                                                useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                                            } else {
                                                useLightText = false;
                                            }
                                        }
                                    } catch (e) {
                                        if (level === 'dark' || level === 'darker') {
                                            useLightText = true;
                                        } else if (level === 'light' || level === 'lighter' || level === 'bright' || level === 'brighter') {
                                            useLightText = false;
                                        } else if (level === 'base') {
                                            const baseTokenOklchParts = converter('oklch')(actualSelectedColorData.oklchLight as string);
                                            useLightText = baseTokenOklchParts ? baseTokenOklchParts.l < 0.55 : true;
                                        } else {
                                            useLightText = false;
                                        }
                                    }
                                    styleProps.color = useLightText ? 'var(--general-text-light-on-dark)' : 'var(--general-text-dark-on-light)';
                                }
                                return (
                                    <div
                                        key={level}
                                        className="w-20 h-12 flex flex-col items-center justify-center rounded text-xs font-mono shadow-xs p-1 text-center"
                                        style={styleProps}
                                        title={shade.isAlias
                                            ? `Alias: ${shade.aliasTarget}${shade.sourceTokenName ? ` (Source: ${shade.sourceTokenName} ${shade.sourceShadeKey})` : ''}`
                                            : `Actual: ${shade.resolvedValue}`}
                                    >
                                        <span>{level}</span>
                                        {shade.isAlias && (
                                            <span
                                                className="text-[8px] leading-tight mt-0.5 block truncate w-full"
                                                title={shade.sourceTokenName ? `${shade.sourceTokenName} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6, -1).split('-').slice(-2).join('-') || 'var'}
                                            >
                                                (uses {shade.sourceTokenName ? `${shade.sourceTokenName.split(' ').pop()} ${shade.sourceShadeKey}` : shade.aliasTarget?.slice(6, -1).split('-').slice(-2).join('-') || 'var'})
                                            </span>
                                        )}
                                        {shade.mappedThemeVars && shade.mappedThemeVars.length > 0 && (
                                            <div className="mt-1 pt-0.5 border-t border-[var(--border)]/20 w-full text-center">
                                                {shade.mappedThemeVars.map((themeVar, tvIdx) => (
                                                    <span
                                                        key={tvIdx}
                                                        className="block text-[7px] leading-tight truncate"
                                                        title={`Provides value for theme variable: ${themeVar}`}
                                                    >
                                                        {themeVar.replace('--', '')}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {actualSelectedColorData.tokenLevelMappedThemeVars && actualSelectedColorData.tokenLevelMappedThemeVars.length > 0 && (
                            <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                                <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Fulfills Theme Variables:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {actualSelectedColorData.tokenLevelMappedThemeVars.map((themeVar, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs transition-colors hover:bg-muted/50"
                                            title={`This color token (via one of its shades) provides the value for ${themeVar}`}
                                        >
                                            {themeVar.replace('--', '')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {actualSelectedColorData.referrers && actualSelectedColorData.referrers.length > 0 && (
                            <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                                <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Used by (Aliases):</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {actualSelectedColorData.referrers.map((ref, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs transition-colors hover:bg-muted/50"
                                            title={`${ref.tokenName} ${ref.shadeKey} (refers to our ${ref.referringToWhat})`}
                                        >
                                            <span className="text-foreground/80">{ref.tokenName.split(' ').pop()}</span>
                                            <span className="text-muted-foreground/80 font-semibold mx-0.5">{ref.shadeKey}</span>
                                            <span className="text-accent/70">&rarr;</span>
                                            <span className="text-foreground/80 ml-0.5 font-semibold">our {ref.referringToWhat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </GridCol>
                </CardContent>
            </Card>
        );
    }

    // Role view
    const { data: roleData, onRoleColorChange } = props;
    const { role, assignedColor, assignedColorHex } = roleData;

    // A neutral placeholder color for the picker when no color is assigned.
    const pickerDisplayValue = assignedColorHex || "#f0f0f0";

    const roleToComponentUsage = React.useMemo(() => {
        const usageMap: Record<string, string[]> = {};
        const allRoles = Object.keys(influenceHierarchy).sort((a, b) => b.length - a.length);

        const variants = Object.keys(buttonVariantConfig.variants.variant);
        const sizes = Object.keys(buttonVariantConfig.variants.size);

        for (const variant of variants) {
            for (const size of sizes) {
                const classStrings = [
                    buttonVariantConfig.base,
                    buttonVariantConfig.variants.variant[variant as keyof typeof buttonVariantConfig.variants.variant],
                    buttonVariantConfig.variants.size[size as keyof typeof buttonVariantConfig.variants.size]
                ].filter(Boolean).join(' ');

                const foundRoles = new Set<string>();
                const individualClasses = classStrings.split(/\s+/);

                individualClasses.forEach(cls => {
                    const matchingRole = allRoles.find(role => cls.includes(role));
                    if (matchingRole) {
                        foundRoles.add(matchingRole);
                    }
                });

                Array.from(foundRoles).forEach(role => {
                    if (!usageMap[role]) {
                        usageMap[role] = [];
                    }
                    usageMap[role].push(`Button: ${variant}/${size}`);
                });
            }
        }
        return usageMap;
    }, []);

    const componentUsages = roleToComponentUsage[role];

    return (
        <Card className="col-span-2" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
            <CardContent className="space-y-4 p-4 pb-10">
                <GridCol className="col-span-2">
                    <div className="flex items-start gap-4">
                        <ColorPicker
                            value={pickerDisplayValue}
                            onChange={(newHex) => onRoleColorChange(role, newHex)}
                            className="w-20 h-20 rounded-md flex-shrink-0"
                            swatches={swatches}
                        />
                        <div className="flex-grow">
                            <CardTitle className="text-2xl font-heading flex items-center" style={{ color: 'var(--card-foreground)' }}>
                                {role.replace(/-/g, ' ')}
                                <span className="text-xs font-normal text-[var(--muted-foreground)] ml-2">
                                    (Role)
                                </span>
                            </CardTitle>
                            <CardDescription className="text-sm pt-1 font-inter" style={{ color: 'var(--card-foreground)' }}>
                                {ROLE_DESCRIPTIONS[role] || "Semantic color role for consistent theming"}
                            </CardDescription>
                        </div>
                    </div>

                    {assignedColor ? (
                        <>
                            <p className="text-sm font-mono" style={{ color: 'var(--card-foreground)' }}>
                                Assigned Color: <span className="font-semibold">{assignedColor.name}</span><br />
                                OKLCH: {assignedColor.oklchLight} <br />
                                HEX: {formatHex(assignedColor.oklchLight as string) || 'N/A'} / CSS: var(--{role})
                            </p>

                            <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                                <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Color Details:</p>
                                <div className="flex flex-wrap gap-1.5">
                                    <div className="inline-flex items-center rounded-md border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2 py-0.5 text-[9px] font-medium text-[var(--accent)] shadow-xs">
                                        {assignedColor.name}
                                    </div>
                                    <div className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs">
                                        var(--{assignedColor.variableName})
                                    </div>
                                </div>
                            </div>

                            {assignedColor.description && (
                                <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                                    <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Color Description:</p>
                                    <p className="text-[10px] leading-relaxed text-[var(--muted-foreground)]">{assignedColor.description}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-[var(--muted-foreground)] font-mono">
                                This role is currently unassigned.
                            </p>
                            <p className="text-xs text-[var(--muted-foreground)] mt-1">
                                Use the color picker above to assign a color from your palette.
                            </p>
                        </div>
                    )}

                    <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                        <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">CSS Variable:</p>
                        <div className="inline-flex items-center rounded-md border border-[var(--border)]/70 px-2 py-0.5 text-[9px] font-medium bg-[var(--background)] shadow-xs font-mono">
                            var(--{role})
                        </div>
                    </div>

                    {componentUsages && componentUsages.length > 0 && (
                        <div className="text-xs font-mono mt-2 pt-2 border-t border-dashed border-[var(--muted)]/30">
                            <p className="font-semibold text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Component Usage:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {componentUsages.map((usage, idx) => (
                                    <div key={idx} className="inline-flex items-center rounded-md border border-border/70 px-2 py-0.5 text-[9px] font-medium bg-background shadow-xs">
                                        {usage}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </GridCol>
            </CardContent>
        </Card>
    );
}; 