import * as React from "react";
import { useUIContext } from "../BrandContext";

// Top-level helpers so all wrappers share consistent badge rendering
const badgeLabelForRole = (roleRaw: string): string => {
  const role = (roleRaw || '').toUpperCase();
  if (["H1","H2","H3","H4","H5","H6"].includes(role)) return role;
  if (role === 'P') return 'P';
  if (role === 'BUTTON') return 'Btn';
  if (role === 'SPAN' || role === 'DIV' || role === 'DEFAULT' || role === 'BODY') return 'Abc';
  return role.charAt(0) || 'T';
};

const badgeTypographyStyleForRole = (roleRaw: string): React.CSSProperties => {
  const role = (roleRaw || '').toLowerCase();
  const fontVar = (
    role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4' || role === 'h5' || role === 'h6'
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === 'heading' || role === 'display'
        ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
        : role === 'button'
          ? `var(--font-button, var(--font-body))`
          : role === 'code' || role === 'mono'
            ? `var(--font-code, var(--font-mono))`
            : `var(--font-body)`
  );
  const weightVar = (
    role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4' || role === 'h5' || role === 'h6' || role === 'button' || role === 'p' || role === 'body' || role === 'default'
      ? `var(--font-weight-${role}, 600)`
      : role === 'heading' || role === 'display'
        ? `var(--font-weight-${role}, 600)`
        : `var(--font-weight-body, 400)`
  );
  return { fontFamily: fontVar as any, fontWeight: weightVar as any };
};

// Inline role-driven style (uses CSS variables with sensible fallbacks)
const roleInlineStyle = (roleRaw: string): React.CSSProperties => {
  const role = (roleRaw || '').toLowerCase();
  const family = (
    role === 'h1' || role === 'h2' || role === 'h3' || role === 'h4' || role === 'h5' || role === 'h6'
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === 'heading' || role === 'display'
        ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
        : role === 'button'
          ? `var(--font-button, var(--font-body))`
          : role === 'code' || role === 'mono'
            ? `var(--font-code, var(--font-mono))`
            : `var(--font-p, var(--font-body))`
  );
  const weightDefault = role.startsWith('h') ? '700' : (role === 'button' ? '600' : '400');
  const sizeFallback = role === 'h1' ? '2.25rem'
    : role === 'h2' ? '1.875rem'
    : role === 'h3' ? '1.5rem'
    : role === 'h4' ? '1.25rem'
    : role === 'h5' ? '1.125rem'
    : role === 'h6' ? '1rem'
    : role === 'button' ? '0.875rem'
    : '1rem';
  const lhFallback = role === 'h1' ? '1.1'
    : role === 'h2' ? '1.15'
    : role.startsWith('h') ? '1.2'
    : role === 'button' ? '1.2'
    : role === 'blockquote' ? '1.5'
    : '1.5';
  return {
    fontFamily: family as any,
    fontWeight: `var(--font-weight-${role}, ${weightDefault})` as any,
    fontSize: `var(--font-size-${role}, ${sizeFallback})`,
    lineHeight: `var(--line-height-${role}, ${lhFallback})` as any,
    letterSpacing: `var(--letter-spacing-${role}, 0em)` as any,
  };
};

const computeTypographyFromChild = (container: HTMLElement | null): React.CSSProperties | null => {
  if (!container || typeof window === 'undefined') return null;
  const child = container.querySelector(':scope > *:first-child') as HTMLElement | null;
  if (!child) return null;
  const cs = window.getComputedStyle(child);
  const style: React.CSSProperties = {};
  if (cs.fontFamily) style.fontFamily = cs.fontFamily;
  if (cs.fontWeight) style.fontWeight = cs.fontWeight as any;
  return Object.keys(style).length ? style : null;
};

interface TypographyElementProps {
  elementType: string;
  textColorRole?: string;
  accentColorRole?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TypographyElement: React.FC<TypographyElementProps> = ({
  elementType,
  textColorRole = "foreground",
  accentColorRole,
  children,
  className = "",
  style = {}
}) => {
  const [isHoverActive, setIsHoverActive] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);
  const [showControls, setShowControls] = React.useState(false);
  const [badgeComputedStyle, setBadgeComputedStyle] = React.useState<React.CSSProperties | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const {
    setActiveTab,
    setSelectedTypographyRole,
    setSelectedColorRole,
    selectedTypographyRole,
    selectedColorRole,
    showTokenTargeting,
  } = useUIContext();

  if (!showTokenTargeting) {
    // Even when token targeting UI is off, keep role data attr so CSS can target it
    return (
      <div data-typography-role={elementType.toLowerCase()} style={roleInlineStyle(elementType)}>
        {children}
      </div>
    );
  }

  const isTypoBadgeActive = (selectedTypographyRole || '').toLowerCase() === elementType.toLowerCase();
  const isTextColorBadgeActive = selectedColorRole === textColorRole;
  const isAccentColorBadgeActive = accentColorRole ? selectedColorRole === accentColorRole : false;
  const isBorderOn = isHoverActive || showControls || isTypoBadgeActive || isTextColorBadgeActive || isAccentColorBadgeActive;
  const shouldShowBadges = isHoverActive || showControls || isTypoBadgeActive || isTextColorBadgeActive || isAccentColorBadgeActive;

  const handleTypographyEditClick = () => {
    setActiveTab('typography');
    setSelectedTypographyRole(elementType.toLowerCase());
    setShowControls(false);
  };

  const handleTextColorEditClick = () => {
    setActiveTab('colors');
    setSelectedColorRole(textColorRole);
    setShowControls(false);
  };

  const handleAccentColorEditClick = () => {
    if (!accentColorRole) return;
    setActiveTab('colors');
    setSelectedColorRole(accentColorRole);
    setShowControls(false);
  };

  // Toggle controls on click; hide on outside click / Escape
  const handleToggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowControls(prev => !prev);
    } else if (e.key === 'Escape') {
      setShowControls(false);
    }
  };

  React.useEffect(() => {
    if (shouldShowBadges) {
      setBadgeComputedStyle(computeTypographyFromChild(containerRef.current));
    }
  }, [shouldShowBadges, elementType]);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Sticky hover: keep active for 1s after mouse leaves
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHoverActive(true);
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHoverActive(false);
    }, 150);
  };
  React.useEffect(() => () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={{ ...roleInlineStyle(elementType), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleControls}
      role="button"
      tabIndex={0}
      aria-label={`Open ${elementType} token controls`}
      onKeyDown={handleKeyDown}
      data-typography-role={elementType.toLowerCase()}
    >
      {children}

      <div className={`
        pointer-events-none absolute inset-0 rounded border-2 transition-all duration-300 ease-in-out z-10
        ${isBorderOn ? 'border-blue-500/80 shadow-[0_0_0_3px_rgba(59,130,246,0.35)] scale-100 opacity-100' : 'border-blue-500/0 scale-95 opacity-0'}
      `} />

      <div
        className={`absolute -top-[40px] right-[0px] z-20 flex flex-row gap-1 transition-all duration-300 ease-in-out ${shouldShowBadges ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
      >
        <button
          type="button"
          className={`w-10 h-8 rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isTypoBadgeActive ? 'border-orange-500' : 'border-border/60'}`}
          onClick={(e) => { e.stopPropagation(); handleTypographyEditClick(); }}
          aria-label={`Edit ${elementType} typography`}
          title={`Edit ${elementType} typography`}
        >
          <span className={`text-[10px] ${isTypoBadgeActive ? 'text-orange-600' : ''}`} style={badgeTypographyStyleForRole(elementType)}>{badgeLabelForRole(elementType)}</span>
        </button>
        <button
          type="button"
          className={`w-10 rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isTextColorBadgeActive ? 'border-orange-500' : 'border-border/60'}`}
          onClick={(e) => { e.stopPropagation(); handleTextColorEditClick(); }}
          aria-label={`Edit ${textColorRole} text color`}
          title={`Edit ${textColorRole} text color`}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full border shadow-sm border-border`}
            style={{ backgroundColor: `var(--${textColorRole})` }}
          />
        </button>
        {accentColorRole && (
          <button
            type="button"
            className={`h-8 w-10 rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isAccentColorBadgeActive ? 'border-orange-500' : 'border-border/60'}`}
            onClick={(e) => { e.stopPropagation(); handleAccentColorEditClick(); }}
            aria-label={`Edit ${accentColorRole} accent color`}
            title={`Edit ${accentColorRole} accent color`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full border shadow-sm border-border`}
              style={{ backgroundColor: `var(--${accentColorRole})` }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

interface CombinedElementProps {
  typographyRole: string;
  colorRole: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CombinedElement: React.FC<CombinedElementProps> = ({
  typographyRole,
  colorRole,
  children,
  className = "",
  style = {}
}) => {
  const [isHoverActive, setIsHoverActive] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);
  const [showControls, setShowControls] = React.useState(false);
  const [badgeComputedStyle, setBadgeComputedStyle] = React.useState<React.CSSProperties | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { setActiveTab, setSelectedTypographyRole, setSelectedColorRole, selectedTypographyRole, selectedColorRole, showTokenTargeting } = useUIContext();

  if (!showTokenTargeting) {
    return (
      <div data-typography-role={typographyRole.toLowerCase()} style={roleInlineStyle(typographyRole)}>
        {children}
      </div>
    );
  }

  const isTypoBadgeActive2 = (selectedTypographyRole || '').toLowerCase() === typographyRole.toLowerCase();
  const isColorBadgeActive2 = selectedColorRole === colorRole;
  const isBorderOn = isHoverActive || showControls || isTypoBadgeActive2 || isColorBadgeActive2;
  const shouldShowBadges = isHoverActive || showControls || isTypoBadgeActive2 || isColorBadgeActive2;

  const handleTypographyEditClick = () => {
    setActiveTab('typography');
    setSelectedTypographyRole(typographyRole.toLowerCase());
    setShowControls(false);
  };

  const handleColorEditClick = () => {
    setActiveTab('colors');
    setSelectedColorRole(colorRole);
    setShowControls(false);
  };

  const handleToggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowControls(prev => !prev);
    } else if (e.key === 'Escape') {
      setShowControls(false);
    }
  };

  React.useEffect(() => {
    if (shouldShowBadges) {
      setBadgeComputedStyle(computeTypographyFromChild(containerRef.current));
    }
  }, [shouldShowBadges, typographyRole]);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Sticky hover: keep active for 1s after mouse leaves
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHoverActive(true);
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHoverActive(false);
    }, 150);
  };
  React.useEffect(() => () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={{ ...roleInlineStyle(typographyRole), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleControls}
      role="button"
      tabIndex={0}
      aria-label={`Open ${typographyRole} & ${colorRole} token controls`}
      onKeyDown={handleKeyDown}
      data-typography-role={typographyRole.toLowerCase()}
    >
      {children}

      <div className={`
        pointer-events-none absolute inset-0 rounded border-2 transition-all duration-300 ease-in-out z-10
        ${isBorderOn ? 'border-purple-500/80 shadow-[0_0_0_3px_rgba(147,51,234,0.35)] scale-100 opacity-100' : 'border-purple-500/0 scale-95 opacity-0'}
      `} />

      <div
        className={`absolute -top-[40px] right-[0px] z-20 flex flex-row gap-1 transition-all duration-300 ease-in-out ${shouldShowBadges ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
      >
        <button
          type="button"
          className={`h-8 w-10 rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isTypoBadgeActive2 ? 'border-orange-500' : 'border-border/60'}`}
          onClick={(e) => { e.stopPropagation(); handleTypographyEditClick(); }}
          aria-label={`Edit ${typographyRole} typography`}
          title={`Edit ${typographyRole} typography`}
        >
          <span className={`text-[10px] ${isTypoBadgeActive2 ? 'text-orange-600' : ''}`} style={badgeTypographyStyleForRole(typographyRole)}>{badgeLabelForRole(typographyRole)}</span>
        </button>
        <button
          type="button"
          className={`h-8 w-10 border rounded-full bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isColorBadgeActive2 ? 'border-orange-500' : 'border-border/60'}`}
          onClick={(e) => { e.stopPropagation(); handleColorEditClick(); }}
          aria-label={`Edit ${colorRole} color`}
          title={`Edit ${colorRole} color`}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full border shadow-sm border-border`}
            style={{ backgroundColor: `var(--${colorRole})` }}
          />
        </button>
      </div>
    </div>
  );
};

interface ColorElementProps {
  colorRole: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ColorElement: React.FC<ColorElementProps> = ({
  colorRole,
  children,
  className = "",
  style = {}
}) => {
  const [isHoverActive, setIsHoverActive] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);
  const [showControls, setShowControls] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { setActiveTab, setSelectedColorRole, selectedColorRole, showTokenTargeting } = useUIContext();

  if (!showTokenTargeting) {
    return <>{children}</>;
  }

  const isColorBadgeActive3 = selectedColorRole === colorRole;
  const isBorderOn = isHoverActive || showControls || isColorBadgeActive3;
  const shouldShowBadges = isHoverActive || showControls || isColorBadgeActive3;

  const handleEditClick = () => {
    setActiveTab('colors');
    setSelectedColorRole(colorRole);
    setShowControls(false);
  };

  const handleToggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowControls(prev => !prev);
    } else if (e.key === 'Escape') {
      setShowControls(false);
    }
  };

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Sticky hover: keep active for 1s after mouse leaves
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHoverActive(true);
  };
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHoverActive(false);
    }, 1000);
  };
  React.useEffect(() => () => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleControls}
      role="button"
      tabIndex={0}
      aria-label={`Open ${colorRole} token controls`}
      onKeyDown={handleKeyDown}
    >
      {children}

      <div className={`
        pointer-events-none absolute inset-0 rounded border-2 transition-all duration-300 ease-in-out z-10
        ${isBorderOn ? 'border-orange-500/80 shadow-[0_0_0_3px_rgba(234,88,12,0.35)] scale-100 opacity-100' : 'border-orange-500/0 scale-95 opacity-0'}
      `} />

      <div
        className={`absolute -top-[40px] right-[0px] z-20 flex flex-row gap-1 transition-all duration-300 ease-in-out ${shouldShowBadges ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
      >
        <button
          type="button"
          className={`h-8 w-10 rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm ${isColorBadgeActive3 ? 'border-orange-500' : 'border-border/60'}`}
          onClick={(e) => { e.stopPropagation(); handleEditClick(); }}
          aria-label={`Edit ${colorRole} color`}
          title={`Edit ${colorRole} color`}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full border shadow-sm border-border`}
            style={{ backgroundColor: `var(--${colorRole})` }}
          />
        </button>
      </div>
    </div>
  );
}; 