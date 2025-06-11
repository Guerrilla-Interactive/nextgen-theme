import React, { useEffect, useRef } from "react";
import { GridCol } from "@/features/unorganized-components/nextgen-core-ui";
import { Role, type OklchString } from "../brand-utils";
import { ProcessedColorToken } from "../page";
import { ColorPicker } from "../../brand-colors/ColorPicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/features/unorganized-components/ui/tooltip';

/*───────────────────────────────────────────────────────────────────────────*
  Types
 *──────────────────────────────────────────────────────────────────────────*/

interface ColorSwatch {
  name: string;
  color: string;
}
interface ThemeRoleAssignmentGridProps {
  categorizedRoleUiData: Array<{
    categoryName: string;
    subCategories: Array<{
      subCategoryName: string;
      roles: Array<{
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
      }>;
    }>;
  }>;
  actualSelectedColorData: ProcessedColorToken | null;
  handleRoleInteraction: (role: Role) => void;
  setSelectedColorName: (name: string | null) => void;
  swatches: ColorSwatch[];
  handleRoleColorChange: (role: Role, newColorHex: string) => void;
  onRoleClick?: (role: Role) => void;
  selectedRole?: Role | null;
}

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

  /*───────────────────────────────────────────────────────────────────────*/
  return (
    <GridCol className="col-span-3 border-dashed border-[var(--border)]/50 text-xs" style={{ fontFamily: "var(--font-code, var(--font-mono, monospace))" }}>
      <div className="space-y-3">
        {categorizedRoleUiData.map(({ categoryName, subCategories }) => (
          <section key={categoryName}>
            <h4 className="mb-1.5 mt-2 uppercase tracking-wider text-[10px] font-semibold text-[var(--muted-foreground)]/80" style={{ fontFamily: "var(--font-display, var(--font-sans, sans-serif))" }}>
              {categoryName}
            </h4>
            <div className="space-y-4">
              {subCategories.map(({ subCategoryName, roles }) => (
                <div key={subCategoryName}>
                  <h5 className="mb-2 text-[9px] font-medium uppercase tracking-wider text-[var(--muted-foreground)]/70">{subCategoryName}</h5>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((r) => {
                      const textWeight = r.isAssignedGlobally ? "font-medium" : "font-normal";
                      const btnFg = { color: r.accessibleTextColor } as React.CSSProperties;
                      const btnBg = { backgroundColor: r.assignedColorHex ?? "transparent" } as React.CSSProperties;

                      // Don't disable buttons when in role view mode (selectedRole is not null)
                      const isInRoleViewMode = selectedRole !== null && selectedRole !== undefined;
                      const shouldDisable = !actualSelectedColorData && !isInRoleViewMode;

                      return (
                        <TooltipProvider key={r.role}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                role="button"
                                tabIndex={shouldDisable ? -1 : 0}
                                aria-disabled={shouldDisable}
                                title={r.buttonTitle}
                                className={[
                                  "group flex items-center justify-between rounded-[var(--radius-md)] border px-[var(--spacing-sm)] py-1 text-[10px] shadow-[var(--shadow-xs)] transition-all hover:shadow-[var(--shadow-md)]",
                                  "border-[var(--border)]",
                                  shouldDisable ? "cursor-not-allowed opacity-60" : "cursor-pointer",
                                  r.baseClasses,
                                ].join(" ")}
                                style={{ ...btnFg, ...btnBg }}
                                onClick={(e) => {
                                  // Check if click is on ColorPicker (should not trigger role or color selection)
                                  const target = e.target as HTMLElement;
                                  if (target.closest('.color-picker') || target.closest('[data-color-picker]')) {
                                    return;
                                  }

                                  // If onRoleClick is provided, prioritize role viewing over color selection
                                  if (onRoleClick) {
                                    onRoleClick(r.role);
                                    return;
                                  }

                                  // Fallback: only do color selection if no onRoleClick handler
                                  if (!actualSelectedColorData) return;
                                  cleanupRef.current?.();
                                  if (r.assignedByColorName) {
                                    setSelectedColorName(r.assignedByColorName);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    if (!actualSelectedColorData) return;
                                    e.preventDefault();
                                    cleanupRef.current?.();
                                    if (r.assignedByColorName) setSelectedColorName(r.assignedByColorName);
                                  }
                                }}
                              >
                                <div className="flex items-center overflow-hidden">
                                  {r.assignedColorHex && (
                                    <div onClick={(e) => e.stopPropagation()} className="mr-1.5 flex items-center" data-color-picker="true">
                                      <ColorPicker
                                        value={r.assignedColorHex}
                                        onChange={(newHex) => handleRoleColorChange(r.role, newHex)}
                                        swatches={swatches}
                                        className="!h-4 !w-4 rounded-[var(--radius-sm)] border border-[var(--border)]/50"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center flex-grow">
                                    <span
                                      className={`truncate ${textWeight} ${onRoleClick ? 'cursor-pointer hover:underline hover:text-[var(--primary)] transition-colors' : ''}`}
                                      onClick={(e) => {
                                        if (onRoleClick) {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          onRoleClick(r.role);
                                        }
                                      }}
                                      title={onRoleClick ? `Click to view details for role: ${r.role}` : undefined}
                                    >
                                      {r.role.replace(/-/g, " ")}
                                    </span>
                                    {onRoleClick && (
                                      <span
                                        className="ml-1 text-[8px] text-[var(--muted-foreground)] opacity-70"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          onRoleClick(r.role);
                                        }}
                                      >
                                        ⓘ
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span
                                  className={`${r.statusIndicatorBgClass} rounded-[var(--radius-sm)] px-1 py-px text-[8px] opacity-80 group-hover:opacity-100`}
                                  style={{ color: r.statusIndicatorAccessibleTextColor, fontFamily: "var(--font-code, var(--font-mono, monospace))" }}
                                >
                                  {r.statusLabel}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="p-2 text-xs font-mono max-w-xs">
                                <p className="font-bold mb-2">Applied Styles for Role: <span className="font-normal">{r.role}</span></p>
                                <ul className="space-y-1">
                                  <li><span className="font-semibold">Status:</span> {r.statusLabel}</li>
                                  {r.assignedColorHex && <li><span className="font-semibold">Assigned Color:</span> {r.assignedColorHex}</li>}

                                  <li className="mt-2 font-semibold">Component Classes:</li>
                                  {r.baseClasses.split(' ').filter(Boolean).map((cls, i) => (
                                    <li key={i} className="ml-2 break-all">- {cls}</li>
                                  ))}

                                  <li className="font-semibold mt-2">Indicator Classes:</li>
                                  <li className="ml-2 break-all">- {r.statusIndicatorBgClass}</li>
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </GridCol>
  );
};