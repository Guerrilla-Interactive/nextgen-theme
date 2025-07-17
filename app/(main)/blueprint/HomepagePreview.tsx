import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import { Zap, Shield, Settings, Mail } from "lucide-react";
import { Separator } from "@/features/unorganized-components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/features/unorganized-components/ui/accordion";
import { Input } from "@/features/unorganized-components/ui/input";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { StarRating } from "@/features/unorganized-components/ui/star-rating";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";
import { useBrand } from "./BrandContext";
import { FontToken } from "./brand-utils";
import { formatHex } from "culori";

export default function HomepagePreview() {
  const { brand, processedBrand, getFontWeightForRole, getFontSizeForRole } = useBrand();

  // Force re-render when brand changes to ensure CSS variables are applied
  const [renderKey, setRenderKey] = React.useState(0);
  const [cssVariableUpdate, setCssVariableUpdate] = React.useState(0);
  
  React.useEffect(() => {
    if (brand) {
      setRenderKey(prev => prev + 1);
      // Only log when there are actual issues
    }
  }, [brand]);

  // Enhanced effect to monitor both brand and processedBrand changes
  React.useEffect(() => {
    if (processedBrand) {
      setCssVariableUpdate(prev => prev + 1);
      
      // Force a style recalculation after a short delay
      setTimeout(() => {
        if (typeof window !== "undefined") {
          // Force browser to recalculate styles
          document.documentElement.offsetHeight;
          setRenderKey(prev => prev + 1);
        }
      }, 50);
    }
  }, [processedBrand]);

  // Monitor CSS variable changes directly and watch for style[data-brand-theme] changes
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new MutationObserver((mutations) => {
      let needsRerender = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          if (target === document.documentElement) {
            needsRerender = true;
          }
        }
        
        // Also watch for changes to the brand theme style element
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              if (element.tagName === 'STYLE' && element.hasAttribute('data-brand-theme')) {
                needsRerender = true;
                // Style changes detected
              }
            }
          });
        }
        
        // Watch for content changes in existing brand theme style element
        if (mutation.type === 'characterData') {
          const parentElement = mutation.target.parentElement;
          if (parentElement?.tagName === 'STYLE' && parentElement.hasAttribute('data-brand-theme')) {
            needsRerender = true;
            // Style content updated
          }
        }
      });
      
      if (needsRerender) {
        // Theme changes detected - updating component
        setCssVariableUpdate(prev => prev + 1);
        // Small delay to ensure CSS changes are fully applied
        setTimeout(() => {
          setRenderKey(prev => prev + 1);
        }, 100);
      }
    });
    
    // Observe changes to document.documentElement style attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });
    
    // Observe changes to document.head for style element additions/removals
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Debug: Check CSS variables in the component - simplified for essential debugging only
  React.useEffect(() => {
    // Removed extensive CSS debug logging to reduce console noise
    // Add specific debug checks here only when needed
  }, [cssVariableUpdate]);

  // Get theme fonts and categorize them
  const getThemeFonts = () => {
    if (!brand?.fonts || brand.fonts.length === 0) {
      return { headingFont: undefined, bodyFont: undefined };
    }

    const headingFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('heading') || font.roles?.includes('display') || font.roles?.includes('h1')
    )?.family || brand.fonts[0]?.family;

    const bodyFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('body') || font.roles?.includes('text') || font.roles?.includes('p')
    )?.family || brand.fonts[1]?.family || brand.fonts[0]?.family;

    return { headingFont, bodyFont };
  };

  const { headingFont, bodyFont } = getThemeFonts();

  // Helper function to get theme colors dynamically
  const getThemeColors = () => {
    if (!brand?.colors) return {
      success: 'var(--primary, #22c55e)',      // Use CSS variable with fallback
      warning: 'var(--accent, #f59e0b)',       // Use CSS variable with fallback
      info: 'var(--primary, #3b82f6)',         // Use CSS variable with fallback
      accent1: 'var(--accent, #a855f7)',       // Use CSS variable with fallback
      accent2: 'var(--destructive, #ef4444)',  // Use CSS variable with fallback
      accent3: 'var(--accent, #f59e0b)',       // Use CSS variable with fallback
    };

    // Try to get colors from theme, with smart fallbacks using CSS variables
    const getColorByRole = (roles: string[], fallback: string) => {
      for (const role of roles) {
        const color = brand.colors.find(c => c.roles?.includes(role as any));
        if (color && color.oklch) {
          // Convert OKLCH to hex properly
          const hexColor = formatHex(color.oklch as string);
          if (hexColor) return hexColor;
        }
      }
      return fallback;
    };

    return {
      success: getColorByRole(['chart-5', 'success', 'positive'], 'var(--chart-5, #22c55e)'),
      warning: getColorByRole(['warning', 'caution', 'yellow', 'amber'], 'var(--accent, #f59e0b)'),
      info: getColorByRole(['info', 'blue', 'primary'], 'var(--primary, #3b82f6)'),
      accent1: getColorByRole(['accent', 'secondary', 'purple', 'violet'], 'var(--accent, #a855f7)'),
      accent2: getColorByRole(['error', 'danger', 'red'], 'var(--destructive, #ef4444)'),
      accent3: getColorByRole(['warning', 'yellow'], 'var(--accent, #f59e0b)'),
    };
  };

  const themeColors = getThemeColors();

  // Tailwind font size scale mapping (matches typography tab)
  const TAILWIND_FONT_SIZES: Record<string, number> = {
    'text-xs': 0.75,
    'text-sm': 0.875,
    'text-base': 1,
    'text-lg': 1.125,
    'text-xl': 1.25,
    'text-2xl': 1.5,
    'text-3xl': 1.875,
    'text-4xl': 2.25,
    'text-5xl': 3,
    'text-6xl': 3.75
  };

  // Default role to size assignments (matches typography tab)
  const DEFAULT_ROLE_SIZE_ASSIGNMENTS: Record<string, string> = {
    body: 'text-base',
    p: 'text-base',
    default: 'text-base',
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    heading: 'text-2xl',
    display: 'text-5xl',
    code: 'text-sm',
    button: 'text-sm',
    caption: 'text-xs',
    badge: 'text-xs',
    link: 'text-sm',
    nav: 'text-sm',
    logo: 'text-xl',
    name: 'text-base',
    subtitle: 'text-sm',
    quote: 'text-base',
    avatar: 'text-sm',
    input: 'text-sm',
    footer: 'text-sm',
    question: 'text-base',
    answer: 'text-sm',
  };

  // Helper function to get role-based font and size styles
  const getRoleStyle = (role: string, fallbackWeight: string = '400') => {
    // Get the assigned font for this role
    const assignedFont = brand?.fonts?.find(font => 
      font.roles?.includes(role)
    );

    // Get font family - prefer role-specific, fallback to heading/body, then inherit
    let fontFamily = 'inherit';
    if (assignedFont?.family) {
      fontFamily = assignedFont.family;
    } else if (role.includes('h') || role === 'heading' || role === 'display' || role === 'logo') {
      fontFamily = headingFont || 'inherit';
    } else {
      fontFamily = bodyFont || 'inherit';
    }

    // Get font size from role assignment
    const sizeKey = DEFAULT_ROLE_SIZE_ASSIGNMENTS[role] || 'text-base';
    const fontSize = `${TAILWIND_FONT_SIZES[sizeKey] || 1}rem`;

    // Get font weight
    const fontWeight = assignedFont && getFontWeightForRole ? 
      assignedFont.weights?.[getFontWeightForRole(assignedFont.name, role) || 'regular'] || fallbackWeight
      : fallbackWeight;

    return {
      fontFamily,
      fontSize,
      fontWeight,
    };
  };

  // Backward compatibility helper (for existing code)
  const getFontWeightStyle = (role: string, fallbackWeight: string = '400') => {
    return {
      fontWeight: `var(--font-weight-${role}, ${fallbackWeight})`
    };
  };

  return (
    <div 
      key={`${renderKey}-${cssVariableUpdate}`} 
      className="w-full h-full bg-background text-foreground"
      style={{ 
        // Force CSS variable re-evaluation by adding a custom property
        '--force-update': cssVariableUpdate as any,
        fontFamily: bodyFont || 'inherit'
      } as React.CSSProperties}
    >
 
      
      {/* Header */}
      <div className="bg-background text-foreground space-y-12 p-6">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span 
                  className="text-white text-sm font-bold"
                  style={getRoleStyle('logo', '700')}
                >
                  V
                </span>
              </div>
              <span
                className="text-xl font-semibold"
                style={getRoleStyle('logo', '600')}
              >
                Velocity
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
                style={getRoleStyle('nav', '500')}
              >
                Product
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
                style={getRoleStyle('nav', '500')}
              >
                Solutions
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
                style={getRoleStyle('nav', '500')}
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
                style={getRoleStyle('nav', '500')}
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
                style={getRoleStyle('nav', '500')}
              >
                Company
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className=""
              style={getRoleStyle('button', '500')}
            >
              Sign in
            </Button>
            <Button 
              className=""
              style={getRoleStyle('button', '600')}
              data-slot="button"
            >
              Start free trial
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center space-y-8 py-20 text-center">
          <div className="flex items-center space-x-2 mb-4">
          <Badge 
              variant="outline"
              className="border-opacity-20 bg-opacity-10"
              style={{ 
                borderColor: themeColors.success, 
                backgroundColor: `${themeColors.success}20`,
                color: themeColors.success,
                ...getRoleStyle('badge', '500')
              }}
          >
              ✨ New: AI-powered workflows
          </Badge>
          </div>
          <h1
            className="text-6xl font-bold text-center leading-tight tracking-tight max-w-4xl"
            style={getRoleStyle('h1', '800')}
          >
            Ship products faster with{' '}
            <span className="text-primary">intelligent automation</span>
          </h1>
          <p 
            className="text-xl text-muted-foreground text-center max-w-2xl leading-relaxed"
            style={getRoleStyle('p', '400')}
          >
            Velocity streamlines your entire product development lifecycle with AI-powered insights, 
            automated workflows, and real-time collaboration tools trusted by 10,000+ teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button 
              size="lg"
              className="px-8 py-6 text-lg"
              style={getRoleStyle('button', '600')}
              data-slot="button"
            >
              Start free 14-day trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg"
              style={getRoleStyle('button', '600')}
            >
              Watch demo (2 min)
            </Button>
          </div>
          <div className="flex items-center space-x-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.success }}></div>
              <span style={getRoleStyle('caption', '400')}>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.success }}></div>
              <span style={getRoleStyle('caption', '400')}>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.success }}></div>
              <span style={getRoleStyle('caption', '400')}>Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12">
          <div className="text-center mb-8">
            <p 
              className="text-sm text-muted-foreground mb-6"
              style={getRoleStyle('caption', '400')}
            >
              Trusted by innovative teams at
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'GitHub'].map((company) => (
                <div key={company} className="text-lg font-semibold text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-6"
              style={getRoleStyle('h2', '700')}
            >
              Everything you need to build better products
            </h2>
            <p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              style={getRoleStyle('p', '400')}
            >
              From planning to deployment, Velocity provides intelligent tools that adapt to your workflow 
              and help your team ship with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${themeColors.info}20` }}>
                <Zap className="w-6 h-6" style={{ color: themeColors.info }} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={getRoleStyle('h3', '600')}
              >
                AI-Powered Insights
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed mb-6"
                style={getRoleStyle('p', '400')}
              >
                Get intelligent recommendations on code quality, performance bottlenecks, and 
                technical debt before they become problems.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.info }}></div>
                <span 
                  className="text-sm text-muted-foreground"
                  style={getRoleStyle('caption', '400')}
                >
                  92% faster issue detection
                </span>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${themeColors.success}20` }}>
                <Shield className="w-6 h-6" style={{ color: themeColors.success }} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={getRoleStyle('h3', '600')}
              >
                Enterprise Security
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed mb-6"
                style={getRoleStyle('p', '400')}
              >
                SOC 2 Type II compliant with end-to-end encryption, SSO integration, 
                and granular permission controls for enterprise peace of mind.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.success }}></div>
                <span 
                  className="text-sm text-muted-foreground"
                  style={getRoleStyle('caption', '400')}
                >
                  99.9% uptime SLA
                </span>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: `${themeColors.accent1}20` }}>
                <Settings className="w-6 h-6" style={{ color: themeColors.accent1 }} />
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={getRoleStyle('h3', '600')}
              >
                Workflow Automation
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed mb-6"
                style={getRoleStyle('p', '400')}
              >
                Automate repetitive tasks with smart workflows that learn from your team's patterns 
                and adapt to your development process.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.accent1 }}></div>
                <span 
                  className="text-sm text-muted-foreground"
                  style={getRoleStyle('caption', '400')}
                >
                  60% reduction in manual work
                </span>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30 rounded-2xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={getRoleStyle('h2', '700')}
            >
              Trusted by teams who ship fast
            </h2>
            <p 
              className="text-lg text-muted-foreground"
              style={getRoleStyle('p', '400')}
            >
              Join thousands of developers and product teams already using Velocity
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl font-bold text-primary mb-2"
                style={getRoleStyle('display', '800')}
              >
                10,000+
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                Active teams
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-primary mb-2"
                style={getRoleStyle('display', '800')}
              >
                50M+
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                Lines of code analyzed
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-primary mb-2"
                style={getRoleStyle('display', '800')}
              >
                99.9%
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                Uptime reliability
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl font-bold text-primary mb-2"
                style={getRoleStyle('display', '800')}
              >
                4.9/5
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                Customer satisfaction
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20" data-slot="card">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <h3
                  className="text-2xl font-semibold mb-2"
                  style={getRoleStyle('h3', '600')}
                >
                  Get product updates and engineering insights
                </h3>
                <p 
                  className="text-muted-foreground"
                  style={getRoleStyle('p', '400')}
                >
                  Join 25,000+ developers getting our weekly newsletter with the latest features, 
                  best practices, and industry insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 min-w-fit">
              <Input 
                  placeholder="Enter your email address" 
                  className="w-80"
                  style={getRoleStyle('input', '400')}
                data-slot="input" 
              />
              <Button 
                  className="whitespace-nowrap"
                  style={getRoleStyle('button', '600')}
                data-slot="button"
              >
                  Subscribe now
              </Button>
              </div>
            </div>
            <div className="mt-4 text-center md:text-left">
              <p 
                className="text-xs text-muted-foreground"
                style={getRoleStyle('caption', '400')}
              >
                No spam, ever. Unsubscribe with one click. Read our{' '}
                <a href="#" className="underline hover:text-primary">privacy policy</a>.
              </p>
            </div>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="text-center mb-16">
          <h2
              className="text-4xl font-bold mb-6"
              style={getRoleStyle('h2', '700')}
          >
              Loved by developers and product teams
          </h2>
            <p 
              className="text-lg text-muted-foreground"
              style={getRoleStyle('p', '400')}
            >
              See what teams are saying about their experience with Velocity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
              <blockquote 
                className="text-base leading-relaxed mb-6"
                style={getRoleStyle('quote', '400')}
              >
                "Velocity reduced our deployment time from 2 hours to 15 minutes. The AI insights 
                caught 3 critical issues before they hit production. Game changer for our team."
              </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback 
                    className="text-white"
                    style={{ backgroundColor: themeColors.info, ...getRoleStyle('avatar', '600') }}
                  >
                    SH
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className="font-semibold"
                    style={getRoleStyle('name', '600')}
                  >
                    Sarah Chen
                  </div>
                  <div 
                    className="text-sm text-muted-foreground"
                    style={getRoleStyle('subtitle', '400')}
                  >
                    Lead Engineer at Stripe
                </div>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
                <blockquote 
                className="text-base leading-relaxed mb-6"
                style={getRoleStyle('quote', '400')}
                >
                "The workflow automation is incredible. We ship 40% faster now and our code quality 
                has never been better. The whole team loves using it every day."
                </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback 
                    className="text-white"
                    style={{ backgroundColor: themeColors.success, ...getRoleStyle('avatar', '600') }}
                  >
                    MR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className="font-semibold"
                    style={getRoleStyle('name', '600')}
                  >
                    Marcus Rodriguez
                  </div>
                  <div 
                    className="text-sm text-muted-foreground"
                    style={getRoleStyle('subtitle', '400')}
                  >
                    CTO at Linear
                  </div>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
              <blockquote 
                className="text-base leading-relaxed mb-6"
                style={getRoleStyle('quote', '400')}
              >
                "Finally, a platform that understands our workflow. The enterprise security features 
                gave us confidence to migrate our entire development process."
              </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback 
                    className="text-white"
                    style={{ backgroundColor: themeColors.accent1, ...getRoleStyle('avatar', '600') }}
                  >
                    AT
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className="font-semibold"
                    style={getRoleStyle('name', '600')}
                  >
                    Alex Thompson
                  </div>
                  <div 
                    className="text-sm text-muted-foreground"
                    style={getRoleStyle('subtitle', '400')}
                  >
                    VP Engineering at Notion
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Product Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4"
              style={getRoleStyle('h2', '700')}
            >
              Everything you need to succeed
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={getRoleStyle('p', '400')}
            >
              Our comprehensive platform provides all the tools and resources you need to build, 
              launch, and scale your digital products with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--primary, ${themeColors.info})20` }}>
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3
                className="text-xl mb-3"
                style={getRoleStyle('h3', '600')}
              >
                Lightning Fast
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed"
                style={getRoleStyle('p', '400')}
              >
                Optimized performance ensures your applications load instantly and run smoothly 
                across all devices and platforms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--primary, ${themeColors.info})20` }}>
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3
                className="text-xl mb-3"
                style={getRoleStyle('h3', '600')}
              >
                Enterprise Security
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed"
                style={getRoleStyle('p', '400')}
              >
                Bank-level encryption and security protocols protect your data and ensure 
                compliance with industry standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `var(--primary, ${themeColors.info})20` }}>
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3
                className="text-xl mb-3"
                style={getRoleStyle('h3', '600')}
              >
                Fully Customizable
              </h3>
              <p
                className="text-base text-muted-foreground leading-relaxed"
                style={getRoleStyle('p', '400')}
              >
                Tailor every aspect of your experience with our flexible theming system 
                and extensive configuration options.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Pricing Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4"
              style={getRoleStyle('h2', '700')}
            >
              Choose your plan
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={getRoleStyle('p', '400')}
            >
              Start free and scale as you grow. All plans include core features with 
              premium support and enterprise-grade security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative p-8" data-slot="card">
              <div className="text-center">
                <h3
                  className="text-xl mb-2"
                  style={getRoleStyle('h3', '600')}
                >
                  Free
                </h3>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={getRoleStyle('display', '800')}
                  >
                    $0
                  </span>
                  <span 
                    className="text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    /month
                  </span>
                </div>
                <Button 
                  className="w-full mb-6"
                  variant="outline"
                  style={getRoleStyle('button', '600')}
                  data-slot="button"
                >
                  Get Started
                </Button>
              </div>
              
              <ul className="space-y-3">
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Up to 3 team members
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ 5 projects
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Basic integrations
                </li>
                <li
                  className="flex items-center text-sm text-muted-foreground"
                  style={getRoleStyle('caption', '400')}
                >
                  ✗ AI-powered insights
                </li>
                <li
                  className="flex items-center text-sm text-muted-foreground"
                  style={getRoleStyle('caption', '400')}
                >
                  ✗ Priority support
                </li>
              </ul>
            </Card>

            {/* Pro Plan */}
            <Card className="relative p-8 border-primary bg-primary/5" data-slot="card">
              <Badge 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary"
                style={getRoleStyle('badge', '500')}
              >
                Most Popular
              </Badge>
              <div className="text-center">
                <h3
                  className="text-xl mb-2"
                  style={getRoleStyle('h3', '600')}
                >
                  Pro
                </h3>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={getRoleStyle('display', '800')}
                  >
                    $49
                  </span>
                  <span
                    className="text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    /month
                  </span>
                </div>
                <Button 
                  className="w-full mb-6"
                  style={getRoleStyle('button', '600')}
                  data-slot="button"
                >
                  Start 14-day trial
                </Button>
              </div>
              
              <ul className="space-y-3">
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Up to 10 team members
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Unlimited projects
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ AI-powered insights
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Advanced integrations
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Priority email support
                </li>
              </ul>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-8" data-slot="card">
              <div className="text-center">
                <h3
                  className="text-xl mb-2"
                  style={getRoleStyle('h3', '600')}
                >
                  Enterprise
                </h3>
                <div className="mb-6">
                  <span
                    className="text-2xl font-bold"
                    style={getRoleStyle('display', '700')}
                  >
                    Custom
                  </span>
                </div>
                <Button 
                  className="w-full mb-6"
                  variant="outline"
                  style={getRoleStyle('button', '600')}
                  data-slot="button"
                >
                  Contact Sales
                </Button>
              </div>
              
              <ul className="space-y-3">
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Unlimited team members
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Custom integrations
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ Dedicated support
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ SLA guarantees
                </li>
                <li
                  className="flex items-center text-sm"
                  style={getRoleStyle('p', '400')}
                >
                  ✓ On-premise deployment
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12 pt-8 border-t">
            <p 
              className="text-sm text-muted-foreground mb-4"
              style={getRoleStyle('caption', '400')}
            >
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span style={getRoleStyle('caption', '400')}>
                💳 Cancel anytime
              </span>
              <span style={getRoleStyle('caption', '400')}>
                🔒 SOC 2 compliant
              </span>
              <span style={getRoleStyle('caption', '400')}>
                📞 24/7 support
              </span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Blog Preview Section */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2
                className="text-3xl mb-4"
                style={getRoleStyle('h2', '700')}
              >
                Engineering blog
              </h2>
              <p
                className="text-lg text-muted-foreground"
                style={getRoleStyle('p', '400')}
              >
                Deep dives, tutorials, and insights from our engineering team
              </p>
            </div>
            <Button 
              variant="outline"
              style={getRoleStyle('button', '500')}
            >
              View all posts
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48" style={{ background: `linear-gradient(to bottom right, ${themeColors.info}40, ${themeColors.info}60)` }}></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={getRoleStyle('badge', '500')}
                  >
                    Engineering
                  </Badge>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    March 15, 2024 • 8 min read
                  </span>
                </div>
                <h3
                  className="text-lg mb-3 leading-tight group-hover:text-primary transition-colors"
                  style={getRoleStyle('h3', '600')}
                >
                  Building scalable AI pipelines with Kubernetes
                </h3>
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  style={getRoleStyle('p', '400')}
                >
                  How we process millions of AI requests daily using a distributed architecture 
                  that scales horizontally and maintains sub-100ms response times.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs" style={{ backgroundColor: themeColors.info }}>
                      DR
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    David Rodriguez, Senior Engineer
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 2 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48" style={{ background: `linear-gradient(to bottom right, ${themeColors.success}40, ${themeColors.success}60)` }}></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={getRoleStyle('badge', '500')}
                  >
                    Security
                  </Badge>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    March 12, 2024 • 6 min read
                  </span>
                </div>
                <h3
                  className="text-lg mb-3 leading-tight group-hover:text-primary transition-colors"
                  style={getRoleStyle('h3', '600')}
                >
                  Zero-trust architecture in modern development
                </h3>
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  style={getRoleStyle('p', '400')}
                >
                  Our journey to implementing zero-trust security principles across our entire 
                  development lifecycle, from code commits to production deployments.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs" style={{ backgroundColor: themeColors.success }}>
                      LK
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    Lisa Kim, Security Lead
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 3 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48" style={{ background: `linear-gradient(to bottom right, ${themeColors.accent1}40, ${themeColors.accent1}60)` }}></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={getRoleStyle('badge', '500')}
                  >
                    Tutorial
                  </Badge>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    March 10, 2024 • 12 min read
                  </span>
                </div>
                <h3
                  className="text-lg mb-3 leading-tight group-hover:text-primary transition-colors"
                  style={getRoleStyle('h3', '600')}
                >
                  Advanced workflow automation patterns
                </h3>
                <p
                  className="text-sm text-muted-foreground mb-4 leading-relaxed"
                  style={getRoleStyle('p', '400')}
                >
                  Step-by-step guide to creating intelligent workflows that adapt to your team's 
                  patterns and automatically optimize for efficiency and reliability.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs" style={{ backgroundColor: themeColors.accent1 }}>
                      JM
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    Jordan Mills, Product Engineer
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className="py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2
              className="text-4xl font-bold mb-6"
              style={getRoleStyle('h2', '800')}
            >
              Ready to ship faster?
            </h2>
            <p 
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
              style={getRoleStyle('p', '400')}
            >
              Join 10,000+ teams already using Velocity to build better products. 
              Start your free trial today and see the difference intelligent automation makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                className="px-8 py-6 text-lg"
                style={getRoleStyle('button', '600')}
                data-slot="button"
              >
                Start free trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg"
                style={getRoleStyle('button', '600')}
              >
                Schedule demo
              </Button>
            </div>
            <p 
              className="text-sm text-muted-foreground mt-6"
              style={getRoleStyle('caption', '400')}
            >
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2
              className="text-3xl mb-4"
              style={getRoleStyle('h2', '700')}
            >
              Integrates with your favorite tools
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={getRoleStyle('p', '400')}
            >
              Connect with the tools you already use and love. Our platform works seamlessly 
              with your existing workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Slack', 'GitHub', 'Figma', 'Notion'].map((tool, index) => (
              <div key={tool} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span
                    className="text-xs font-medium"
                    style={getRoleStyle('badge', '600')}
                  >
                    {tool}
                  </span>
                </div>
                <h4
                  className="text-sm font-medium"
                  style={getRoleStyle('h4', '500')}
                >
                  {tool}
                </h4>
                <p
                  className="text-xs text-muted-foreground mt-1"
                  style={getRoleStyle('caption', '400')}
                >
                  Connected
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Developer Experience Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl mb-6"
                style={getRoleStyle('h2', '700')}
              >
                Built for developers, by developers
              </h2>
              <p
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
                style={getRoleStyle('p', '400')}
              >
                We understand the challenges developers face. That's why we've built our platform 
                with developer experience as a top priority.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4
                      className="text-base font-medium mb-1"
                      style={getRoleStyle('h4', '600')}
                    >
                      Type-safe APIs
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      style={getRoleStyle('p', '400')}
                    >
                      Full TypeScript support with auto-generated types
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4
                      className="text-base font-medium mb-1"
                      style={getRoleStyle('h4', '600')}
                    >
                      Comprehensive documentation
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      style={getRoleStyle('p', '400')}
                    >
                      Clear guides, examples, and interactive API explorer
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4
                      className="text-base font-medium mb-1"
                      style={getRoleStyle('h4', '600')}
                    >
                      Active community
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      style={getRoleStyle('p', '400')}
                    >
                      Join thousands of developers sharing knowledge and best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6" data-slot="card">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs text-muted-foreground"
                    style={getRoleStyle('caption', '400')}
                  >
                    Terminal
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.accent2 }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.warning }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.success }}></div>
                  </div>
                </div>
                <div className="bg-black/90 rounded p-4 font-mono text-sm" style={{ color: themeColors.success }}>
                  <div
                    style={getRoleStyle('code', '400')}
                  >
                    $ npm install @yourplatform/sdk
                  </div>
                  <div
                    className="mt-1 opacity-60"
                    style={{ ...getRoleStyle('code', '400'), color: 'inherit' }}
                  >
                    ✓ Installation complete
                  </div>
                </div>
              </div>
              
              <pre
                className="bg-muted p-4 rounded text-xs overflow-x-auto"
                style={getRoleStyle('code', '400')}
              >
                <code>{`import { createClient } from '@yourplatform/sdk';

const client = createClient({
  apiKey: process.env.API_KEY,
  region: 'us-east-1'
});

// Type-safe API calls
const user = await client.users.get(userId);
console.log(user.email); // ✓ TypeScript knows this exists`}</code>
              </pre>
            </Card>
          </div>
        </section>

        <Separator />

        {/* FAQ Section */}
        <section>
          <h2
            className="mb-4 text-lg"
            style={getRoleStyle('heading', '700')}
          >
            FAQ
          </h2>
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1">
              <AccordionTrigger
                className=""
                style={getRoleStyle('question', '600')}
              >
                What is this product?
              </AccordionTrigger>
              <AccordionContent 
                className=""
                style={getRoleStyle('answer', '400')}
              >
                It's a powerful platform to accelerate your creative ideas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger
                className=""
                style={getRoleStyle('question', '600')}
              >
                How do I subscribe?
              </AccordionTrigger>
              <AccordionContent 
                className=""
                style={getRoleStyle('answer', '400')}
              >
                Enter your email in the newsletter section above and click Subscribe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />



        {/* Footer Section */}
        <footer className="flex justify-between text-sm text-muted-foreground">
          <p 
            className=""
            style={getRoleStyle('footer', '400')}
          >
            © 2024 Your Company
          </p>
          <div className="flex space-x-4">
            <Button 
              variant="link" 
              className=""
              style={getRoleStyle('link', '500')}
              data-slot="link"
            >
              Privacy
            </Button>
            <Button 
              variant="link" 
              className=""
              style={getRoleStyle('link', '500')}
              data-slot="link"
            >
              Terms
            </Button>
            <Button 
              variant="link" 
              className=""
              style={getRoleStyle('link', '500')}
              data-slot="link"
            >
              Contact
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
} 