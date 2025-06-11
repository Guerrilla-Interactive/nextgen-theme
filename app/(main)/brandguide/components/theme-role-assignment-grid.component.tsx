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
    <GridCol className="col-span-3 border-dashed border-[var(--border)]/50 text-xs" style={{ fontFamily: "var(--font-code, var(--font-mono, monospace))" }}>
      <div className="columns-4 gap-4 space-y-4">
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

          return (
            <div
              key={`${primaryRole.role}-${index}`}
              className={`flex flex-col rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-xs)] break-inside-avoid transition-opacity ${isUnassigned ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
              style={previewBg}
            >
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
                        <Icon className="h-3 w-3 cursor-pointer" style={{ color: 'currentColor', opacity: 0.6 }} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex items-center p-2 max-w-xs">
                          <Icon className="h-12 w-12 mr-3 text-muted-foreground" />
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
              <div className="bg-[var(--background)]/50 p-1.5 border-t border-[var(--border)]/50 space-y-1">
                {roles.map((roleItem) => (
                  <div
                    key={roleItem.role}
                    role="button"
                    tabIndex={shouldDisable ? -1 : 0}
                    aria-disabled={shouldDisable}
                    onClick={() => onRoleClick?.(roleItem.role)}
                    className="flex items-center justify-between text-[10px] cursor-pointer rounded-sm p-1 -m-1 transition-colors hover:bg-white/10"
                  >
                    <span>{roleItem.role.replace(/-/g, " ")}</span>
                    <ColorPicker
                      value={roleItem.assignedColorHex ?? '#ffffff'}
                      onChange={(newHex) => handleRoleColorChange(roleItem.role, newHex)}
                      swatches={swatches}
                      className="!h-4 !w-4 rounded-[var(--radius-sm)] border border-[var(--border)]/50"
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