"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { Separator } from "@/features/unorganized-components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/unorganized-components/ui/select";
import { useBrand } from "../BrandContext";
import { animationPresets, type AnimationPresetName } from "../animation-presets";
import { Play, Zap, Sparkles, Palette, Settings, Monitor, Eye, Code, ChevronDown } from "lucide-react";
import { AnimationPreset } from "../brand-utils";

interface InteractionTabProps {
    activeThemeKey: string;
}

export function InteractionTab({ activeThemeKey }: InteractionTabProps) {
    const { brand, updateAnimationConfig } = useBrand();
    const [selectedPreset, setSelectedPreset] = useState<AnimationPresetName | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewPreset, setPreviewPreset] = useState<AnimationPreset | null>(null);
    const [hasEntered, setHasEntered] = useState(false);

    // Get current animation preset
    const currentPreset = brand?.animationConfig?.preset;

    // Load available presets
    const [availablePresets, setAvailablePresets] = useState<Record<string, AnimationPreset>>({});

    // Get the current preset for display
    const currentPresetForDisplay = previewPreset || (currentPreset && availablePresets[currentPreset.name as AnimationPresetName]);

    useEffect(() => {
        const loadPresets = async () => {
            const presets: Record<string, AnimationPreset> = {};

            for (const [name, loader] of Object.entries(animationPresets)) {
                try {
                    const preset = await loader();
                    presets[name] = preset;
                } catch (error) {
                    console.error(`Failed to load preset ${name}:`, error);
                }
            }

            setAvailablePresets(presets);
        };

        loadPresets();
    }, []);

    // Set initial selected preset and mark as entered
    useEffect(() => {
        if (currentPreset && !selectedPreset) {
            setSelectedPreset(currentPreset.name as AnimationPresetName);
        }
        // Mark that we've entered the tab
        if (!hasEntered) {
            setHasEntered(true);
        }
    }, [currentPreset, selectedPreset, hasEntered]);

    const handlePresetChange = async (presetName: AnimationPresetName) => {
        setIsLoading(true);
        setSelectedPreset(presetName);

        try {
            const preset = await animationPresets[presetName]();
            setPreviewPreset(preset);

            // Update the animation config using the context function
            await updateAnimationConfig(presetName);
            console.log('Updated theme with new animation preset:', presetName);
        } catch (error) {
            console.error('Failed to load preset:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPresetIcon = (presetName: string) => {
        switch (presetName) {
            case 'modern':
                return <Monitor className="w-4 h-4" />;
            case 'playful':
                return <Sparkles className="w-4 h-4" />;
            case 'neo-brutalism':
                return <Zap className="w-4 h-4" />;
            case 'minimal':
                return <Settings className="w-4 h-4" />;
            case 'glowing-border':
                return <Palette className="w-4 h-4" />;
            default:
                return <Play className="w-4 h-4" />;
        }
    };

    const getPresetColor = (presetName: string) => {
        switch (presetName) {
            case 'modern':
                return 'bg-blue-500';
            case 'playful':
                return 'bg-pink-500';
            case 'neo-brutalism':
                return 'bg-orange-500';
            case 'minimal':
                return 'bg-gray-500';
            case 'glowing-border':
                return 'bg-purple-500';
            default:
                return 'bg-green-500';
        }
    };

    const generateCompleteCSS = (preset: any) => {
        let css = '';

        // Button CSS
        if (preset.button) {
            // Global Button Styles
            if ('global' in preset.button && preset.button.global) {
                css += `.btn {\n`;
                css += `  transition: ${preset.button.global.transition};\n`;
                css += `  transform-origin: ${preset.button.global.transformOrigin};\n`;
                css += `  will-change: ${preset.button.global.willChange};\n`;
                css += `}\n\n`;
            }

            // Button States
            if ('default' in preset.button && preset.button.default) {
                css += `.btn {\n`;
                if (preset.button.default.duration) css += `  transition-duration: ${preset.button.default.duration};\n`;
                if (preset.button.default.easing) css += `  transition-timing-function: ${preset.button.default.easing};\n`;
                if (preset.button.default.opacity) css += `  opacity: ${preset.button.default.opacity};\n`;
                css += `}\n\n`;
            }

            if ('hover' in preset.button && preset.button.hover) {
                css += `.btn:hover {\n`;
                if (preset.button.hover.duration) css += `  transition-duration: ${preset.button.hover.duration};\n`;
                if (preset.button.hover.easing) css += `  transition-timing-function: ${preset.button.hover.easing};\n`;
                if (preset.button.hover.opacity) css += `  opacity: ${preset.button.hover.opacity};\n`;
                if (preset.button.hover.transform?.scale) css += `  transform: scale(${preset.button.hover.transform.scale});\n`;
                if (preset.button.hover.transform?.translate) css += `  transform: translate(${preset.button.hover.transform.translate});\n`;
                css += `}\n\n`;
            }

            if ('focus' in preset.button && preset.button.focus) {
                css += `.btn:focus {\n`;
                if (preset.button.focus.duration) css += `  transition-duration: ${preset.button.focus.duration};\n`;
                if (preset.button.focus.easing) css += `  transition-timing-function: ${preset.button.focus.easing};\n`;
                if (preset.button.focus.opacity) css += `  opacity: ${preset.button.focus.opacity};\n`;
                if (preset.button.focus.boxShadow) css += `  box-shadow: ${preset.button.focus.boxShadow};\n`;
                css += `}\n\n`;
            }

            if ('active' in preset.button && preset.button.active) {
                css += `.btn:active {\n`;
                if (preset.button.active.duration) css += `  transition-duration: ${preset.button.active.duration};\n`;
                if (preset.button.active.easing) css += `  transition-timing-function: ${preset.button.active.easing};\n`;
                if (preset.button.active.opacity) css += `  opacity: ${preset.button.active.opacity};\n`;
                if (preset.button.active.transform?.scale) css += `  transform: scale(${preset.button.active.transform.scale});\n`;
                css += `}\n\n`;
            }
        }

        // Link CSS
        if (preset.link) {
            // Global Link Styles
            if (preset.link.global) {
                css += `a {\n`;
                css += `  transition: ${preset.link.global.transition};\n`;
                css += `  transform-origin: ${preset.link.global.transformOrigin};\n`;
                css += `  will-change: ${preset.link.global.willChange};\n`;
                css += `}\n\n`;
            }

            // Link States
            if (preset.link.default) {
                css += `a {\n`;
                if (preset.link.default.duration) css += `  transition-duration: ${preset.link.default.duration};\n`;
                if (preset.link.default.easing) css += `  transition-timing-function: ${preset.link.default.easing};\n`;
                css += `}\n\n`;
            }

            if (preset.link.hover) {
                css += `a:hover {\n`;
                if (preset.link.hover.duration) css += `  transition-duration: ${preset.link.hover.duration};\n`;
                if (preset.link.hover.easing) css += `  transition-timing-function: ${preset.link.hover.easing};\n`;
                if (preset.link.hover.opacity) css += `  opacity: ${preset.link.hover.opacity};\n`;
                css += `}\n\n`;
            }

            if (preset.link.focus) {
                css += `a:focus {\n`;
                if (preset.link.focus.duration) css += `  transition-duration: ${preset.link.focus.duration};\n`;
                if (preset.link.focus.easing) css += `  transition-timing-function: ${preset.link.focus.easing};\n`;
                if (preset.link.focus.boxShadow) css += `  box-shadow: ${preset.link.focus.boxShadow};\n`;
                css += `}\n\n`;
            }

            if (preset.link.active) {
                css += `a:active {\n`;
                if (preset.link.active.duration) css += `  transition-duration: ${preset.link.active.duration};\n`;
                if (preset.link.active.easing) css += `  transition-timing-function: ${preset.link.active.easing};\n`;
                if (preset.link.active.opacity) css += `  opacity: ${preset.link.active.opacity};\n`;
                css += `}\n\n`;
            }
        }

        // Input CSS
        if (preset.input) {
            // Global Input Styles
            if (preset.input.global) {
                css += `input, textarea, select {\n`;
                css += `  transition: ${preset.input.global.transition};\n`;
                css += `  transform-origin: ${preset.input.global.transformOrigin};\n`;
                css += `  will-change: ${preset.input.global.willChange};\n`;
                css += `}\n\n`;
            }

            // Input States
            if (preset.input.default) {
                css += `input, textarea, select {\n`;
                if (preset.input.default.duration) css += `  transition-duration: ${preset.input.default.duration};\n`;
                if (preset.input.default.easing) css += `  transition-timing-function: ${preset.input.default.easing};\n`;
                css += `}\n\n`;
            }

            if (preset.input.hover) {
                css += `input:hover, textarea:hover, select:hover {\n`;
                if (preset.input.hover.duration) css += `  transition-duration: ${preset.input.hover.duration};\n`;
                if (preset.input.hover.easing) css += `  transition-timing-function: ${preset.input.hover.easing};\n`;
                css += `}\n\n`;
            }

            if (preset.input.focus) {
                css += `input:focus, textarea:focus, select:focus {\n`;
                if (preset.input.focus.duration) css += `  transition-duration: ${preset.input.focus.duration};\n`;
                if (preset.input.focus.easing) css += `  transition-timing-function: ${preset.input.focus.easing};\n`;
                if (preset.input.focus.boxShadow) css += `  box-shadow: ${preset.input.focus.boxShadow};\n`;
                css += `}\n\n`;
            }

            if (preset.input.active) {
                css += `input:active, textarea:active, select:active {\n`;
                if (preset.input.active.duration) css += `  transition-duration: ${preset.input.active.duration};\n`;
                if (preset.input.active.easing) css += `  transition-timing-function: ${preset.input.active.easing};\n`;
                css += `}\n\n`;
            }
        }

        // Card CSS
        if (preset.card) {
            // Global Card Styles
            if (preset.card.global) {
                css += `.card {\n`;
                css += `  transition: ${preset.card.global.transition};\n`;
                css += `  transform-origin: ${preset.card.global.transformOrigin};\n`;
                css += `  will-change: ${preset.card.global.willChange};\n`;
                css += `}\n\n`;
            }

            // Card States
            if (preset.card.default) {
                css += `.card {\n`;
                if (preset.card.default.duration) css += `  transition-duration: ${preset.card.default.duration};\n`;
                if (preset.card.default.easing) css += `  transition-timing-function: ${preset.card.default.easing};\n`;
                css += `}\n\n`;
            }

            if (preset.card.hover) {
                css += `.card:hover {\n`;
                if (preset.card.hover.duration) css += `  transition-duration: ${preset.card.hover.duration};\n`;
                if (preset.card.hover.easing) css += `  transition-timing-function: ${preset.card.hover.easing};\n`;
                if (preset.card.hover.transform?.scale) css += `  transform: scale(${preset.card.hover.transform.scale});\n`;
                css += `}\n\n`;
            }
        }

        // Global Classes
        if (preset.globalClasses) {
            Object.entries(preset.globalClasses).forEach(([className, classCSS]) => {
                css += `.${className} {\n`;
                css += `  ${classCSS}\n`;
                css += `}\n\n`;
            });
        }

        // Keyframes
        if (preset.keyframes) {
            Object.entries(preset.keyframes).forEach(([keyframeName, keyframeCSS]) => {
                css += `@keyframes ${keyframeName} {\n`;
                css += `  ${keyframeCSS}\n`;
                css += `}\n\n`;
            });
        }

        return css;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Interaction & Animations</h2>
                <p className="text-muted-foreground">
                    Choose how your interface elements animate and respond to user interactions.
                </p>
            </div>



            {/* Animation Presets */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Animation Preset</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Choose how your interface elements animate and respond to user interactions
                        </p>
                    </div>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Loading...
                        </div>
                    )}
                </div>

                <div className="relative">
                    <Select
                        value={selectedPreset || ''}
                        onValueChange={(value) => handlePresetChange(value as AnimationPresetName)}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-full h-14 px-4 bg-background border-2 border-border hover:border-primary/50 transition-colors duration-200 rounded-xl shadow-sm">
                            <SelectValue placeholder="Select an animation preset">
                                {selectedPreset && availablePresets[selectedPreset] && (
                                    <div className="flex items-center gap-4 w-full">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPresetColor(selectedPreset)} text-white shadow-sm`}>
                                            {getPresetIcon(selectedPreset)}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-medium text-foreground capitalize">
                                                {selectedPreset.replace('-', ' ')}
                                            </div>
                                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {availablePresets[selectedPreset].description}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="w-[450px] max-w-[95vw] p-2 bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl rounded-xl">
                            <div className="space-y-1">
                                {Object.entries(availablePresets)
                                    .sort(([, presetA], [, presetB]) => {
                                        // Only reorder on first entry to put current preset first
                                        if (!hasEntered) {
                                            const isCurrentA = currentPreset?.name === presetA.name;
                                            const isCurrentB = currentPreset?.name === presetB.name;

                                            if (isCurrentA && !isCurrentB) return -1;
                                            if (!isCurrentA && isCurrentB) return 1;
                                        }

                                        // Otherwise maintain original order or sort alphabetically
                                        return presetA.name.localeCompare(presetB.name);
                                    })
                                    .map(([presetName, preset]) => {
                                        const isCurrent = currentPreset?.name === presetName;

                                        return (
                                            <SelectItem
                                                key={presetName}
                                                value={presetName}
                                                className="w-full p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4 w-full">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPresetColor(presetName)} text-white shadow-sm flex-shrink-0`}>
                                                        {getPresetIcon(presetName)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-foreground capitalize mb-1">
                                                            {presetName.replace('-', ' ')}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground leading-relaxed">
                                                            {preset.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                            </div>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Complete Generated CSS */}
            <Separator />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            Generated CSS
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Complete CSS code that gets applied when this preset is selected
                        </p>
                    </div>
                    {currentPresetForDisplay && (
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                                {currentPresetForDisplay.name}
                            </Badge>
                        </div>
                    )}
                </div>

                <Card className="border-2 border-border/50 shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-4 border-b border-border/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${currentPresetForDisplay ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="text-sm font-medium text-foreground">CSS Output</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>Syntax: CSS</span>
                                    <span>•</span>
                                    <span>Copy to clipboard</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <pre className="text-sm bg-background p-6 rounded-b-lg overflow-x-auto max-h-[500px] font-mono leading-relaxed">
                                <code className="text-foreground">
                                    {currentPresetForDisplay ? generateCompleteCSS(currentPresetForDisplay) : '/* Loading animation presets... */'}
                                </code>
                            </pre>
                            {currentPresetForDisplay && (
                                <div className="absolute top-4 right-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-3 text-xs bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background"
                                        onClick={() => {
                                            navigator.clipboard.writeText(generateCompleteCSS(currentPresetForDisplay));
                                        }}
                                    >
                                        Copy CSS
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 