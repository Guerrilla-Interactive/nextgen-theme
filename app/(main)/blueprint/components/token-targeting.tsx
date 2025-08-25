import * as React from "react";
import { useUIContext } from "../BrandContext";

/* -------------------------------------------------------------------------------------------------
 * Constants & utilities
 * ------------------------------------------------------------------------------------------------*/

const VAR_PREFIX = "var:" as const;

type VariableDomain = "typo" | "color";
export type VariableKey = `${typeof VAR_PREFIX}${VariableDomain}:${string}`;

const isVariableKey = (key: string | null | undefined): key is VariableKey =>
  !!key && key.startsWith(VAR_PREFIX);
const stripVarPrefix = (key: VariableKey): string => key.slice(VAR_PREFIX.length);
const makeVarKey = (domain: VariableDomain, name: string): VariableKey =>
  `${VAR_PREFIX}${domain}:${name}`;

const BADGE_BUTTON_BASE =
  "rounded-full border bg-background/95 shadow-sm hover:shadow-md transition pointer-events-auto grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-105 active:scale-95 active:shadow-sm hover:border-orange-400 hover:ring-1 hover:ring-orange-400/40 hover:ring-offset-2 hover:ring-offset-background";
const badgeButtonClass = (active: boolean, extra = "") =>
  `${BADGE_BUTTON_BASE} ${active ? "border-orange-500" : "border-border/60"} ${extra}`;

/** Unique, case-insensitive, preserves first-seen casing. */
const uniqueCaseInsensitive = (items: string[]) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    const key = it.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }
  return out;
};

// Shared badge label + style
const badgeLabelForRole = (roleRaw: string): string => {
  const role = (roleRaw || "").toUpperCase();
  if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(role)) return role;
  if (role === "P") return "P";
  if (role === "BUTTON") return "Btn";
  if (role === "SPAN" || role === "DIV" || role === "DEFAULT" || role === "BODY") return "Abc";
  return role.charAt(0) || "T";
};

const badgeTypographyStyleForRole = (roleRaw: string): React.CSSProperties => {
  const role = (roleRaw || "").toLowerCase();
  const fontVar =
    role === "h1" ||
    role === "h2" ||
    role === "h3" ||
    role === "h4" ||
    role === "h5" ||
    role === "h6"
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === "heading" || role === "display"
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === "button"
      ? `var(--font-button, var(--font-body))`
      : role === "code" || role === "mono"
      ? `var(--font-code, var(--font-mono))`
      : `var(--font-body)`;

  const weightVar =
    role === "h1" ||
    role === "h2" ||
    role === "h3" ||
    role === "h4" ||
    role === "h5" ||
    role === "h6" ||
    role === "button" ||
    role === "p" ||
    role === "body" ||
    role === "default"
      ? `var(--font-weight-${role}, 600)`
      : role === "heading" || role === "display"
      ? `var(--font-weight-${role}, 600)`
      : `var(--font-weight-body, 400)`;

  return { fontFamily: fontVar as any, fontWeight: weightVar as any };
};

// Inline role-driven style (uses CSS variables with sensible fallbacks)
const roleInlineStyle = (roleRaw: string): React.CSSProperties => {
  const role = (roleRaw || "").toLowerCase();
  const family =
    role === "h1" ||
    role === "h2" ||
    role === "h3" ||
    role === "h4" ||
    role === "h5" ||
    role === "h6"
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === "heading" || role === "display"
      ? `var(--font-${role}, var(--font-heading, var(--font-body)))`
      : role === "button"
      ? `var(--font-button, var(--font-body))`
      : role === "code" || role === "mono"
      ? `var(--font-code, var(--font-mono))`
      : `var(--font-p, var(--font-body))`;

  const weightDefault = role.startsWith("h") ? "700" : role === "button" ? "600" : "400";

  const sizeFallback =
    role === "h1"
      ? "2.25rem"
      : role === "h2"
      ? "1.875rem"
      : role === "h3"
      ? "1.5rem"
      : role === "h4"
      ? "1.25rem"
      : role === "h5"
      ? "1.125rem"
      : role === "h6"
      ? "1rem"
      : role === "button"
      ? "0.875rem"
      : "1rem";

  const lhFallback =
    role === "h1"
      ? "1.1"
      : role === "h2"
      ? "1.15"
      : role.startsWith("h")
      ? "1.2"
      : role === "button"
      ? "1.2"
      : role === "blockquote"
      ? "1.5"
      : "1.5";

  return {
    fontFamily: family as any,
    fontWeight: `var(--font-weight-${role}, ${weightDefault})` as any,
    fontSize: `var(--font-size-${role}, ${sizeFallback})`,
    lineHeight: `var(--line-height-${role}, ${lhFallback})` as any,
    letterSpacing: `var(--letter-spacing-${role}, 0em)` as any,
  };
};

/* -------------------------------------------------------------------------------------------------
 * DRY hooks
 * ------------------------------------------------------------------------------------------------*/

const useStickyHover = (hideDelayMs: number) => {
  const [isHoverActive, setIsHoverActive] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  const handleMouseEnter = React.useCallback(() => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHoverActive(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHoverActive(false);
    }, hideDelayMs);
  }, [hideDelayMs]);

  React.useEffect(
    () => () => {
      if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    },
    []
  );

  return { isHoverActive, handleMouseEnter, handleMouseLeave } as const;
};

const useVariableActions = () => {
  const { setActiveTab, setSelectedTypographyRole, setSelectedColorRole, setActiveTargetKey } =
    useUIContext();

  const selectTypography = React.useCallback(
    (role: string) => {
      const key = role.toLowerCase();
      setActiveTab("typography");
      setSelectedTypographyRole(key);
      setActiveTargetKey(makeVarKey("typo", key));
    },
    [setActiveTab, setSelectedTypographyRole, setActiveTargetKey]
  );

  const selectColor = React.useCallback(
    (role: string) => {
      setActiveTab("colors");
      setSelectedColorRole(role);
      setActiveTargetKey(makeVarKey("color", role));
    },
    [setActiveTab, setSelectedColorRole, setActiveTargetKey]
  );

  return { selectTypography, selectColor } as const;
};

/* -------------------------------------------------------------------------------------------------
 * Primitive badge button
 * ------------------------------------------------------------------------------------------------*/

interface BadgeButtonProps {
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
  title: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}

const BadgeButton: React.FC<BadgeButtonProps> = ({
  onClick,
  ariaLabel,
  title,
  active,
  className = "",
  children,
}) => (
  <button
    type="button"
    className={badgeButtonClass(active, className)}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    aria-label={ariaLabel}
    title={title}
  >
    {children}
  </button>
);

/* -------------------------------------------------------------------------------------------------
 * TokenTarget (wrapper)
 * ------------------------------------------------------------------------------------------------*/

type Tone = "blue" | "purple" | "orange";

interface TokenTargetProps {
  targetKey: string;
  ariaLabel: string;
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
  hoverOutDelayMs?: number;
  showTokenTargeting: boolean;
  passThroughWhenHidden?: boolean;
  dataTypographyRole?: string;
  children: React.ReactNode;
  renderBadges: (args: { shouldShowBadges: boolean }) => React.ReactNode;
  /** e.g. ['typo:h1','color:foreground'] */
  variableMatchKeys?: string[];
}

const TokenTarget: React.FC<TokenTargetProps> = ({
  targetKey,
  ariaLabel,
  tone = "blue",
  className = "",
  style = {},
  hoverOutDelayMs = 150,
  showTokenTargeting,
  passThroughWhenHidden = false,
  dataTypographyRole,
  children,
  renderBadges,
  variableMatchKeys = [],
}) => {
  const { activeTargetKey, setActiveTargetKey } = useUIContext();
  const [showControls, setShowControls] = React.useState(false);
  const { isHoverActive, handleMouseEnter, handleMouseLeave } = useStickyHover(hoverOutDelayMs);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Outside click closes controls (but preserves variable-level marks)
  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowControls(false);
        if (activeTargetKey === targetKey) setActiveTargetKey(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [activeTargetKey, targetKey, setActiveTargetKey]);

  // Variable-level activation: activeTargetKey like 'var:typo:h1' or 'var:color:foreground'
  const isVariableMarkActive = React.useMemo(() => {
    if (!isVariableKey(activeTargetKey)) return false;
    const key = stripVarPrefix(activeTargetKey);
    return variableMatchKeys.includes(key);
  }, [activeTargetKey, variableMatchKeys]);

  const isActiveByKey = activeTargetKey === targetKey;
  const isSelfActive = isActiveByKey || isHoverActive || showControls;
  const isBorderOn = isSelfActive || isVariableMarkActive;
  const shouldShowBadges = isHoverActive || isActiveByKey || showControls || isVariableMarkActive;

  // When another element-level target becomes active, close this element's controls
  React.useEffect(() => {
    const isOtherElementActive =
      !!activeTargetKey && !isVariableKey(activeTargetKey) && activeTargetKey !== targetKey;
    if (showControls && isOtherElementActive) setShowControls(false);
  }, [activeTargetKey, targetKey, showControls]);

  const toggleControls = () => {
    setShowControls((p) => !p);
    if (!isVariableKey(activeTargetKey)) {
      setActiveTargetKey((curr) => (curr === targetKey ? null : targetKey));
    }
  };

  const handleToggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleControls();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleControls();
      return;
    }
    if (e.key === "Escape") {
      setShowControls(false);
      if (activeTargetKey === targetKey) setActiveTargetKey(null);
    }
  };

  if (!showTokenTargeting) {
    if (passThroughWhenHidden) return <>{children}</>;
    return (
      <div className={className} style={style} data-typography-role={dataTypographyRole}>
        {children}
      </div>
    );
  }

  const toneActive =
    tone === "blue"
      ? "border-blue-500/80 shadow-[0_0_0_3px_rgba(59,130,246,0.35)] scale-100 opacity-100"
      : tone === "purple"
      ? "border-purple-500/80 shadow-[0_0_0_3px_rgba(147,51,234,0.35)] scale-100 opacity-100"
      : "border-orange-500/80 shadow-[0_0_0_3px_rgba(234,88,12,0.35)] scale-100 opacity-100";

  const toneInactive =
    tone === "blue"
      ? "border-blue-500/0 scale-95 opacity-0"
      : tone === "purple"
      ? "border-purple-500/0 scale-95 opacity-0"
      : "border-orange-500/0 scale-95 opacity-0";

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
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      data-typography-role={dataTypographyRole}
    >
      {children}

      <div
        className={`
        pointer-events-none absolute inset-0 rounded border-2 transition-all duration-300 ease-in-out z-10
        ${isBorderOn ? toneActive : toneInactive}
      `}
      />

      <div
        className={`absolute -top-[40px] right-[0px] z-20 flex flex-row gap-1 transition-all duration-300 ease-in-out ${
          shouldShowBadges ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {renderBadges({ shouldShowBadges })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TokenElement (single public API)
 * ------------------------------------------------------------------------------------------------*/

interface TokenElementProps {
  /** List of typography roles to expose for targeting. */
  typographyRoles?: string[];
  /** List of color roles to expose for targeting. */
  colorRoles?: string[];
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TokenElement: React.FC<TokenElementProps> = ({
  typographyRoles,
  colorRoles,
  children,
  className = "",
  style = {},
}) => {
  // Normalize roles into arrays with stable de-dupe
  const typoRoles = React.useMemo(() => {
    return uniqueCaseInsensitive(typographyRoles || []);
  }, [typographyRoles]);

  const colorRoleList = React.useMemo(() => {
    return uniqueCaseInsensitive(colorRoles || []);
  }, [colorRoles]);

  const hasTypo = typoRoles.length > 0;
  const hasColor = colorRoleList.length > 0;

  const { selectedTypographyRole, selectedColorRole, showTokenTargeting } = useUIContext();
  const { selectTypography, selectColor } = useVariableActions();

  const isTypoBadgeActive = (role: string) =>
    (selectedTypographyRole || "").toLowerCase() === role.toLowerCase();
  const isColorBadgeActive = (role: string) => selectedColorRole === role;

  // Compute keys, tone and variable matching
  const targetKey = React.useMemo(() => {
    if (hasTypo && hasColor)
      return `combo:${typoRoles.map((r) => r.toLowerCase()).join(",")}|${colorRoleList
        .map((r) => r.toLowerCase())
        .join(",")}`;
    if (hasTypo) return `typo:${typoRoles.map((r) => r.toLowerCase()).join(",")}`;
    if (hasColor) return `color:${colorRoleList.map((r) => r.toLowerCase()).join(",")}`;
    return `untargeted`;
  }, [hasTypo, hasColor, typoRoles, colorRoleList]);

  const variableKeys = React.useMemo(() => {
    const keys: string[] = [];
    for (const r of typoRoles) keys.push(`typo:${r.toLowerCase()}`);
    for (const r of colorRoleList) keys.push(`color:${r}`);
    return keys;
  }, [typoRoles, colorRoleList]);

  const tone: Tone = hasTypo && hasColor ? "purple" : hasTypo ? "blue" : "orange";
  const hoverOutDelayMs = hasTypo && !hasColor ? 150 : hasColor && !hasTypo ? 1000 : 150;
  const passThroughWhenHidden = !hasTypo && hasColor; // preserves previous ColorElement behavior

  // Inline style uses first typography role if present
  const mergedStyle = React.useMemo<React.CSSProperties>(() => {
    if (!hasTypo) return style;
    return { ...roleInlineStyle(typoRoles[0]), ...style };
  }, [hasTypo, typoRoles, style]);

  // If nothing provided, pass-through
  if (!hasTypo && !hasColor) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <TokenTarget
      targetKey={targetKey}
      ariaLabel={`Open ${
        hasTypo ? `${typoRoles.join("/")} ` : ""
      }${hasColor ? `${colorRoleList.join("/")} ` : ""}token controls`.trim()}
      className={className}
      style={mergedStyle}
      hoverOutDelayMs={hoverOutDelayMs}
      showTokenTargeting={showTokenTargeting}
      passThroughWhenHidden={passThroughWhenHidden}
      tone={tone}
      dataTypographyRole={hasTypo ? typoRoles[0].toLowerCase() : undefined}
      variableMatchKeys={variableKeys}
      renderBadges={() => (
        <>
          {typoRoles.map((role) => (
            <BadgeButton
              key={`typo-${role}`}
              onClick={() => selectTypography(role)}
              ariaLabel={`Edit ${role} typography`}
              title={`Edit ${role} typography`}
              active={isTypoBadgeActive(role)}
              className="w-10 h-8"
            >
              <span
                className={`text-[10px] ${isTypoBadgeActive(role) ? "text-orange-600" : ""}`}
                style={badgeTypographyStyleForRole(role)}
              >
                {badgeLabelForRole(role)}
              </span>
            </BadgeButton>
          ))}

          {colorRoleList.map((role) => (
            <BadgeButton
              key={`color-${role}`}
              onClick={() => selectColor(role)}
              ariaLabel={`Edit ${role} color`}
              title={`Edit ${role} color`}
              active={isColorBadgeActive(role)}
              className="h-8 w-10"
            >
              <span
                className="inline-block w-4 h-4 rounded-full border shadow-sm border-border"
                style={{ backgroundColor: `var(--${role})` }}
              />
            </BadgeButton>
          ))}
        </>
      )}
    >
      {children}
    </TokenTarget>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Public exports
 * ------------------------------------------------------------------------------------------------*/

// Single public API:
export default TokenElement;
