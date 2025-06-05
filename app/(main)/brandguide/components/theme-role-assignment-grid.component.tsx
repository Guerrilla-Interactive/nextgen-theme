import { GridCol } from "@/features/unorganized-components/nextgen-core-ui";
import { Role, SURFACE_ROLES } from "../brand-utils";
import { ProcessedColorToken } from "../page";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PaintBucket, Pipette } from 'lucide-react';
import { formatHex } from 'culori';

// Props for the new ThemeRoleAssignmentGrid component
interface ThemeRoleAssignmentGridProps {
    categorizedRoleUiData: Array<{
      categoryName: string;
      roles: Array<{
        role: Role;
        statusLabel: string;
        baseClasses: string;
        buttonTitle: string;
        isAssignedToCurrentColor: boolean;
        isAssignedGlobally: boolean;
        statusIndicatorBgClass: string;
        assignedColorHex: string | null;
        assignedByColorName: string | null;
      }>;
    }>;
    actualSelectedColorData: ProcessedColorToken | null;
    handleRoleInteraction: (role: Role) => void;
    setSelectedColorName: (name: string | null) => void;
  }

interface CustomCursorProps {
  colorHex: string | null;
  position: { x: number; y: number } | null;
  visible: boolean;
  iconType: 'bucket' | 'pipette';
  hideSwatchTemporarily?: boolean;
}

const CustomCursorDisplay: React.FC<CustomCursorProps> = ({ colorHex, position, visible, iconType, hideSwatchTemporarily }) => {
  if (!visible || !position) return null;

  const iconStyles = {
    size: 16,
    fill: "var(--primary-foreground)",
    strokeWidth: 1.5,
  };

  // Determine the horizontal offset based on the icon type
  // The goal is to center the icon's tip (bucket bottom, or inverted pipette left tip) on the cursor
  let xOffset = 0;
  if (iconType === 'bucket') {
    xOffset = 10; // Offset to center the (now potentially inverted) bucket icon
  } else { // Pipette
    xOffset = 8;  // Offset to center the pipette's tip
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x + xOffset, 
        top: position.y,  
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        padding: '2px', 
        borderRadius: '6px', 
        gap: '1px', 
      }}
    >
      {iconType === 'bucket' ? (
        <PaintBucket 
          {...iconStyles} 
          className="text-[var(--foreground)]"
          style={{ 
            transform: 'scaleX(-1) translateY(-8px)', // Inverted bucket, tip aligned up
            transformOrigin: 'center center' 
          }}
        />
      ) : (
        <Pipette 
          {...iconStyles} 
          className="text-[var(--foreground)]"
          fill="var(--primary-foreground)"
          style={{ 
            transform: 'translateY(-7px)', // Pipette upright, tip aligned
            transformOrigin: 'center center' 
          }}
        />
      )}
      {colorHex && !hideSwatchTemporarily && (
        <div
          style={{
            width: '14px',
            height: '14px',
            border: '1px solid var(--border-stronger, var(--foreground))',
            backgroundColor: colorHex,
            borderRadius: '3px',
            boxShadow: 'inset 0 0 0 1px oklch(from var(--background) l c h / 0.1)'
          }}
        />
      )}
    </div>
  );
};
  
  export const ThemeRoleAssignmentGrid: React.FC<ThemeRoleAssignmentGridProps> = ({
    categorizedRoleUiData,
    actualSelectedColorData,
    handleRoleInteraction,
    setSelectedColorName,
  }) => {
    const [hoveredRoleForCursor, setHoveredRoleForCursor] = useState<Role | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedColorHexForCursor, setSelectedColorHexForCursor] = useState<string | null>(null);
    const activePreviewCleanupRef = useRef<(() => void) | null>(null);
    const [isCursorOverSwatch, setIsCursorOverSwatch] = useState<boolean>(false);

    useEffect(() => {
      if (actualSelectedColorData && actualSelectedColorData.oklchLight) {
        try {
            const hex = formatHex(actualSelectedColorData.oklchLight as string);
            setSelectedColorHexForCursor(hex || null);
        } catch (e) {
            console.error("Error formatting oklchLight to hex for cursor:", e);
            setSelectedColorHexForCursor(null);
        }
      } else {
        setSelectedColorHexForCursor(null);
      }
    }, [actualSelectedColorData]);

    useEffect(() => {
      return () => {
        if (activePreviewCleanupRef.current) {
          activePreviewCleanupRef.current();
          activePreviewCleanupRef.current = null;
        }
      };
    }, []);

    const handleRoleMouseEnter = (role: Role) => {
      if (activePreviewCleanupRef.current) {
        activePreviewCleanupRef.current();
        activePreviewCleanupRef.current = null;
      }

      if (!actualSelectedColorData || !actualSelectedColorData.variableName) return;
      
      const propertiesToRestore: Array<{ name: string, value: string | null }> = [];
      const rootStyle = document.documentElement.style;

      const mainCssVar = `--${role}`;
      const originalMainValue = rootStyle.getPropertyValue(mainCssVar).trim() || null;
      propertiesToRestore.push({ name: mainCssVar, value: originalMainValue });
      rootStyle.setProperty(mainCssVar, `var(--${actualSelectedColorData.variableName})`);

      if (SURFACE_ROLES.has(role)) {
        const foregroundCssVar = `--${role}-foreground`;
        const originalFgValue = rootStyle.getPropertyValue(foregroundCssVar).trim() || null;
        propertiesToRestore.push({ name: foregroundCssVar, value: originalFgValue });
        if (actualSelectedColorData.onColorLight) {
          rootStyle.setProperty(foregroundCssVar, actualSelectedColorData.onColorLight);
        } else {
          rootStyle.removeProperty(foregroundCssVar);
        }
      }
      
      activePreviewCleanupRef.current = () => {
        propertiesToRestore.forEach(p => {
          if (p.value !== null) {
            rootStyle.setProperty(p.name, p.value);
          } else {
            rootStyle.removeProperty(p.name);
          }
        });
      };
    };

    const handleRoleMouseLeave = () => {
      if (activePreviewCleanupRef.current) {
        activePreviewCleanupRef.current();
        activePreviewCleanupRef.current = null;
      }
    };

    const currentIconType = isCursorOverSwatch && actualSelectedColorData ? 'bucket' : 'pipette';

    return (
      <GridCol className="text-xs col-span-3 font-mono border-dashed border-[var(--border)]/50">
        <CustomCursorDisplay 
            visible={isCursorOverSwatch && !!hoveredRoleForCursor && !!actualSelectedColorData}
            colorHex={selectedColorHexForCursor}
            position={cursorPosition}
            iconType={'bucket'}
            hideSwatchTemporarily={false}
        />
        
        <div className="space-y-3">
          {categorizedRoleUiData.map(category => (
            <div key={category.categoryName}>
              <h4 className="text-[10px] font-semibold text-[var(--muted-foreground)]/80 uppercase tracking-wider col-span-full mb-1.5 mt-2">
                {category.categoryName}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-1.5">
                {category.roles.map((roleData) => {
                  let mainRoleTextDynamicClasses = "";
                  if (roleData.isAssignedToCurrentColor) {
                    mainRoleTextDynamicClasses = "font-medium";
                  } else if (roleData.isAssignedGlobally && !roleData.isAssignedToCurrentColor) {
                    mainRoleTextDynamicClasses = "font-medium";
                  } else {
                    mainRoleTextDynamicClasses = "font-normal"; 
                  }
                  const mainRoleTextClasses = `truncate ${mainRoleTextDynamicClasses}`;
                  const isButtonHoveredForCursor = hoveredRoleForCursor === roleData.role && actualSelectedColorData;
  
                  return (
                    <button 
                      key={roleData.role}
                      type="button"
                      onClick={() => {
                        if (activePreviewCleanupRef.current) {
                          activePreviewCleanupRef.current();
                          activePreviewCleanupRef.current = null;
                        }
                        if (roleData.assignedByColorName) {
                          setSelectedColorName(roleData.assignedByColorName);
                        }
                      }}
                      className={`flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] px-[var(--spacing-sm)] py-[calc(var(--spacing-sm)/2)] text-[10px] shadow-[var(--shadow-xs)] transition-all group hover:shadow-[var(--shadow-md)] disabled:opacity-50 disabled:cursor-not-allowed ${roleData.baseClasses} ${isCursorOverSwatch && hoveredRoleForCursor === roleData.role && actualSelectedColorData ? 'cursor-none' : 'cursor-pointer'}`}
                      title={roleData.buttonTitle}
                      onMouseEnter={(e) => {
                        setHoveredRoleForCursor(roleData.role);
                        setCursorPosition({ x: e.clientX, y: e.clientY });
                        setIsCursorOverSwatch(false);
                      }}
                      onMouseLeave={() => {
                        setHoveredRoleForCursor(null);
                        setCursorPosition(null);
                      }}
                      onMouseMove={(e) => {
                        if (hoveredRoleForCursor === roleData.role) {
                          setCursorPosition({ x: e.clientX, y: e.clientY });
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {roleData.assignedColorHex && roleData.assignedByColorName && (
                          <span
                            className={`w-3 h-3 rounded-[var(--radius-sm)] border border-[var(--border)]/50 mr-[calc(var(--spacing-sm)*0.75)] flex-shrink-0 hover:ring-1 hover:ring-offset-1 hover:ring-[var(--ring)] transition-all ${isCursorOverSwatch && hoveredRoleForCursor === roleData.role ? 'cursor-none' : 'cursor-pointer'} ${!actualSelectedColorData?.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ backgroundColor: roleData.assignedColorHex }}
                            title={actualSelectedColorData?.name ? `Apply color: ${actualSelectedColorData.rawTokenSpecificName} to ${roleData.role}` : `Select a color first to apply`}
                            onClick={(e) => {
                              e.stopPropagation(); 
                              if (actualSelectedColorData?.name) {
                                if (activePreviewCleanupRef.current) {
                                  activePreviewCleanupRef.current();
                                  activePreviewCleanupRef.current = null;
                                }
                                handleRoleInteraction(roleData.role);
                              }
                            }}
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setIsCursorOverSwatch(true);
                              if (activePreviewCleanupRef.current) {
                                activePreviewCleanupRef.current();
                                activePreviewCleanupRef.current = null;
                              }
                              if (actualSelectedColorData) {
                                  setHoveredRoleForCursor(roleData.role);
                                  setCursorPosition({ x: e.clientX, y: e.clientY });
                                  handleRoleMouseEnter(roleData.role);
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setIsCursorOverSwatch(false);
                              if (activePreviewCleanupRef.current) {
                                handleRoleMouseLeave();
                              }
                            }}
                          ></span>
                        )}
                        <span className={mainRoleTextClasses}>{roleData.role.charAt(0).toUpperCase() + roleData.role.slice(1).replace(/-/g, ' ')}</span>
                      </div>
                      <span className={`ml-1.5 px-[calc(var(--spacing-sm)*0.75)] py-[calc(var(--spacing-sm)*0.25)] rounded-[var(--radius-sm)] text-[8px] opacity-80 group-hover:opacity-100 ${roleData.statusIndicatorBgClass}`}>
                        {roleData.statusLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </GridCol>
    );
  };