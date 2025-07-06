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
import { useBrand } from "../brandguide/BrandContext";
import { FontToken } from "../brandguide/brand-utils";

export default function HomepagePreview() {
  const { brand } = useBrand();

  // Force re-render when brand changes to ensure CSS variables are applied
  const [renderKey, setRenderKey] = React.useState(0);
  
  React.useEffect(() => {
    if (brand) {
      setRenderKey(prev => prev + 1);
      console.log('[HomepagePreview] Brand changed - forcing re-render');
    }
  }, [brand]);

  // Debug: Check CSS variables in the component
  React.useEffect(() => {
    const debugCSSVariables = () => {
      if (typeof window === "undefined") return;
      
      const rootStyle = document.documentElement.style;
      const computedStyle = window.getComputedStyle(document.documentElement);
      
      const primaryVar = rootStyle.getPropertyValue('--primary').trim();
      const primaryComputed = computedStyle.getPropertyValue('--primary').trim();
      
      console.log('--- HomepagePreview CSS Variable Debug ---');
      console.log(`  --primary (set): "${primaryVar}"`);
      console.log(`  --primary (computed): "${primaryComputed}"`);
      
      // Check the final resolved value
      if (primaryVar.startsWith('var(--') && primaryVar.endsWith(')')) {
        const primaryRefVar = primaryVar.slice(6, -1);
        const primaryColor = rootStyle.getPropertyValue(primaryRefVar).trim();
        const primaryColorComputed = computedStyle.getPropertyValue(primaryRefVar).trim();
        console.log(`  --primary resolves to (set): "${primaryColor}" (from ${primaryVar})`);
        console.log(`  --primary resolves to (computed): "${primaryColorComputed}" (from ${primaryVar})`);
      }
      
      // Force element refresh by checking a test element
      const testElement = document.createElement('div');
      testElement.style.display = 'none';
      document.body.appendChild(testElement);
      
      // Check if text-primary class resolves correctly
      testElement.className = 'text-primary';
      const computedColor = window.getComputedStyle(testElement).color;
      console.log(`  text-primary computed color: "${computedColor}"`);
      
      document.body.removeChild(testElement);
      console.log('--- End HomepagePreview CSS Debug ---');
    };

    // Run immediately and set up periodic checks
    debugCSSVariables();
    
    // Set up a listener for CSS variable changes
    const observer = new MutationObserver((mutations) => {
      let needsRecheck = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          needsRecheck = true;
        }
      });
      
      if (needsRecheck) {
        setTimeout(debugCSSVariables, 100); // Small delay to ensure changes are applied
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });
    
    // Also check periodically
    const interval = setInterval(debugCSSVariables, 2000);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Get theme fonts and categorize them
  const getThemeFonts = () => {
    if (!brand?.fonts || brand.fonts.length === 0) {
      return { headingFont: undefined, bodyFont: undefined };
    }

    const headingFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('heading') || font.roles?.includes('display')
    )?.family || brand.fonts[0]?.family;

    const bodyFont = brand.fonts.find((font: FontToken) =>
      font.roles?.includes('body') || font.roles?.includes('text')
    )?.family || brand.fonts[1]?.family || brand.fonts[0]?.family;

    return { headingFont, bodyFont };
  };

  const { headingFont, bodyFont } = getThemeFonts();

  return (
    <div key={renderKey} className="w-full h-full bg-background text-foreground">
      {/* Visual indicator for current primary color */}
      <div className="fixed top-4 right-4 z-50 bg-card border rounded p-2 text-xs shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[var(--primary)] border"></div>
          <span>Primary Color (render #{renderKey})</span>
        </div>
      </div>
      
      {/* Header */}
      <div
        className="bg-background text-foreground space-y-8 p-6"
        style={{ fontFamily: bodyFont || 'inherit' }}
      >
        {/* Hero Section */}
        <section className="flex flex-col items-center space-y-6 py-20">
          <Badge className="font-medium">New</Badge>
          <h1
            className="text-5xl font-extrabold text-center leading-tight tracking-tight"
            style={{ fontFamily: headingFont || 'inherit' }}
          >
            Unleash Your Creative Power
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl font-normal leading-relaxed">
            Experience innovation that accelerates your ideas into reality.
          </p>
          <div className="flex space-x-4">
            <Button className="font-semibold" data-slot="button">Get Started</Button>
            <Button variant="outline" className="font-semibold" data-slot="button">Learn More</Button>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section>
          <div className="grid grid-cols-3 gap-4">
            <Card className="flex flex-col items-center p-8 shadow-[var(--shadow-md)]" data-slot="card">
              <Zap className="size-10 text-primary" />
              <CardTitle
                className="text-lg font-bold text-center"
                style={{ fontFamily: headingFont || 'inherit' }}
              >
                Fast Performance
              </CardTitle>
              <CardDescription className="text-sm text-center font-normal">
                Lightning-fast speeds.
              </CardDescription>
              <Button variant="link" className="font-medium" data-slot="link">
                Learn More
              </Button>
            </Card>
            <Card className="flex flex-col items-center p-8 shadow-[var(--shadow-md)]" data-slot="card">
              <Shield className="size-10 text-primary" />
              <CardTitle
                className="text-lg font-bold text-center"
                style={{ fontFamily: headingFont || 'inherit' }}
              >
                Secure
              </CardTitle>
              <CardDescription className="text-sm text-center font-normal">
                Robust data protection.
              </CardDescription>
              <Button variant="link" className="font-medium" data-slot="link">
                Learn More
              </Button>
            </Card>
            <Card className="flex flex-col items-center p-8 shadow-[var(--shadow-md)]" data-slot="card">
              <Settings className="size-10 text-primary" />
              <CardTitle
                className="text-lg font-bold text-center"
                style={{ fontFamily: headingFont || 'inherit' }}
              >
                Customizable
              </CardTitle>
              <CardDescription className="text-sm text-center font-normal">
                Flexible theming options.
              </CardDescription>
              <Button variant="link" className="font-medium" data-slot="link">
                Learn More
              </Button>
            </Card>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12">
          <Card className="p-8 shadow-[var(--shadow-lg)]" data-slot="card">
            <CardHeader className="flex items-center space-x-4">
              <Mail size={48} className="text-primary" />
              <div className="space-y-1">
                <CardTitle
                  className="text-2xl font-bold"
                  style={{ fontFamily: headingFont || 'inherit' }}
                >
                  Stay in the Loop
                </CardTitle>
                <CardDescription className="font-normal">
                  Subscribe to get the latest updates and exclusive offers.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-6 flex flex-row items-center space-x-2">
              <Input placeholder="Email address" className="flex-1 font-normal" data-slot="input" />
              <Button className="font-semibold" data-slot="button">Subscribe</Button>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2
            className="mb-6 text-2xl font-bold text-center"
            style={{ fontFamily: headingFont || 'inherit' }}
          >
            Testimonials
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <Card className="shadow-[var(--shadow-sm)]" data-slot="card">
              <CardHeader className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarFallback className="font-semibold">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: headingFont || 'inherit' }}
                  >
                    Jane Doe
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">Designer</span>
                </div>
                <StarRating rating={5} />
              </CardHeader>
              <CardContent className="pt-4">
                <blockquote className="italic text-base text-center font-normal leading-relaxed">
                  "This product changed my life! The intuitive design and powerful features are unmatched."
                </blockquote>
              </CardContent>
            </Card>
            {/* Testimonial 2 */}
            <Card className="shadow-[var(--shadow-sm)]" data-slot="card">
              <CardHeader className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarFallback className="font-semibold">JS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: headingFont || 'inherit' }}
                  >
                    John Smith
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">Developer</span>
                </div>
                <StarRating rating={4.5} />
              </CardHeader>
              <CardContent className="pt-4">
                <blockquote className="italic text-base text-center font-normal leading-relaxed">
                  "A must-have for any creative professional looking to boost productivity."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* FAQ Section */}
        <section>
          <h2
            className="mb-4 text-lg font-bold"
            style={{ fontFamily: headingFont || 'inherit' }}
          >
            FAQ
          </h2>
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1">
              <AccordionTrigger
                className="font-semibold"
                style={{ fontFamily: headingFont || 'inherit' }}
              >
                What is this product?
              </AccordionTrigger>
              <AccordionContent className="font-normal">
                It's a powerful platform to accelerate your creative ideas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger
                className="font-semibold"
                style={{ fontFamily: headingFont || 'inherit' }}
              >
                How do I subscribe?
              </AccordionTrigger>
              <AccordionContent className="font-normal">
                Enter your email in the newsletter section above and click Subscribe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Footer Section */}
        <footer className="flex justify-between text-sm text-muted-foreground">
          <p className="font-normal">© 2024 Your Company</p>
          <div className="flex space-x-4">
            <Button variant="link" className="font-medium" data-slot="link">Privacy</Button>
            <Button variant="link" className="font-medium" data-slot="link">Terms</Button>
            <Button variant="link" className="font-medium" data-slot="link">Contact</Button>
          </div>
        </footer>
      </div>
    </div>
  );
} 