"use client"

import * as React from "react";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import { Button } from "@/features/unorganized-components/ui/button";
import { Zap, Shield, Settings } from "lucide-react";
import { Separator } from "@/features/unorganized-components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/features/unorganized-components/ui/accordion";
import { Input } from "@/features/unorganized-components/ui/input";
import { Badge } from "@/features/unorganized-components/ui/badge";
import { StarRating } from "@/features/unorganized-components/ui/star-rating";
import { Avatar, AvatarFallback } from "@/features/unorganized-components/ui/avatar";

export default function HomepageExample() {
  return (
    <div className="w-full h-full bg-background text-foreground ">
      {/* Header */}
      <div className="bg-background text-foreground space-y-12 p-6">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-semibold">Velocity</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-primary transition-colors">
                Product
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Solutions
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Docs
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Company
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" data-slot="button">
              Sign in
            </Button>
            <Button data-slot="button">Start free trial</Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center space-y-8 py-20 text-center">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              ✨ New: AI-powered workflows
            </Badge>
          </div>

          <h1 className="font-bold text-center leading-tight tracking-tight max-w-4xl">
            Ship products faster with <span className="text-primary">intelligent automation</span>
          </h1>

          <p className="text-muted-foreground text-center max-w-2xl leading-relaxed">
            Velocity streamlines your entire product development lifecycle with AI-powered insights, automated
            workflows, and real-time collaboration tools trusted by 10,000+ teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button size="lg" className="px-8 py-6" data-slot="button">
              Start free 14-day trial
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6" data-slot="button">
              Watch demo (2 min)
            </Button>
          </div>

          <div className="flex items-center space-x-6 pt-8 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12">
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6 text-sm">Trusted by innovative teams at</p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {["Stripe", "Notion", "Linear", "Vercel", "Figma", "GitHub"].map((company) => (
                <div key={company} className="font-semibold text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-6">Everything you need to build better products</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              From planning to deployment, Velocity provides intelligent tools that adapt to your workflow and help
              your team ship with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-4">AI-Powered Insights</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Get intelligent recommendations on code quality, performance bottlenecks, and technical debt before
                they become problems.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground text-sm">92% faster issue detection</span>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-green-500/10">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-4">Enterprise Security</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SOC 2 Type II compliant with end-to-end encryption, SSO integration, and granular permission controls
                for enterprise peace of mind.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground text-sm">99.9% uptime SLA</span>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-purple-500/10">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-4">Workflow Automation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Automate repetitive tasks with smart workflows that learn from your team's patterns and adapt to your
                development process.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-muted-foreground text-sm">60% reduction in manual work</span>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">Trusted by teams who ship fast</h2>
            <p className="text-muted-foreground">Join thousands of developers and product teams already using Velocity</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground text-sm">Active teams</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50M+</div>
              <p className="text-muted-foreground text-sm">Lines of code analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground text-sm">Uptime reliability</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-muted-foreground text-sm">Customer satisfaction</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20" data-slot="card">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="font-semibold mb-2">Get product updates and engineering insights</h3>
                <p className="text-muted-foreground">
                  Join 25,000+ developers getting our weekly newsletter with the latest features, best practices, and
                  industry insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 min-w-fit">
                <Input placeholder="Enter your email address" className="w-80" data-slot="input" />
                <Button className="whitespace-nowrap" data-slot="button">
                  Subscribe now
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                No spam, ever. Unsubscribe with one click. Read our <a href="#" className="underline hover:text-primary">privacy policy</a>.
              </p>
            </div>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="font-bold mb-6">Loved by developers and product teams</h2>
            <p className="text-muted-foreground">See what teams are saying about their experience with Velocity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
              <blockquote className="mb-6" data-typography-role="blockquote">
                "Velocity reduced our deployment time from 2 hours to 15 minutes. The AI insights caught 3 critical
                issues before they hit production. Game changer for our team."
              </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="text-white bg-primary">
                    SH
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-muted-foreground text-sm">Lead Engineer at Stripe</div>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
              <blockquote className="mb-6" data-typography-role="blockquote">
                "The workflow automation is incredible. We ship 40% faster now and our code quality has never been
                better. The whole team loves using it every day."
              </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="text-white bg-green-600">
                    MR
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-muted-foreground text-sm">CTO at Linear</div>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 border-0 shadow-lg" data-slot="card">
              <div className="mb-6">
                <StarRating rating={5} />
              </div>
              <blockquote className="mb-6" data-typography-role="blockquote">
                "Finally, a platform that understands our workflow. The enterprise security features gave us
                confidence to migrate our entire development process."
              </blockquote>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="text-white bg-purple-600">
                    AT
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Alex Thompson</div>
                  <div className="text-muted-foreground text-sm">VP Engineering at Notion</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Product Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to build, launch, and scale
              your digital products with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimized performance ensures your applications load instantly and run smoothly across all devices and
                platforms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bank-level encryption and security protocols protect your data and ensure compliance with industry
                standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-3">Fully Customizable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailor every aspect of your experience with our flexible theming system and extensive configuration
                options.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Pricing Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose your plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. All plans include core features with premium support and enterprise-grade
              security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative p-8" data-slot="card">
              <div className="text-center">
                <h3 className="mb-2">Free</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Button className="w-full mb-6" variant="outline" data-slot="button">
                  Get Started
                </Button>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center">✓ Up to 3 team members</li>
                <li className="flex items-center">✓ 5 projects</li>
                <li className="flex items-center">✓ Basic integrations</li>
                <li className="flex items-center text-muted-foreground text-sm">✗ AI-powered insights</li>
                <li className="flex items-center text-muted-foreground text-sm">✗ Priority support</li>
              </ul>
            </Card>

            {/* Pro Plan */}
            <Card className="relative p-8 border border-primary bg-primary/5" data-slot="card">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
              <div className="text-center">
                <h3 className="mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Button className="w-full mb-6" data-slot="button">
                  Start 14-day trial
                </Button>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center">✓ Up to 10 team members</li>
                <li className="flex items-center">✓ Unlimited projects</li>
                <li className="flex items-center">✓ AI-powered insights</li>
                <li className="flex items-center">✓ Advanced integrations</li>
                <li className="flex items-center">✓ Priority email support</li>
              </ul>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-8" data-slot="card">
              <div className="text-center">
                <h3 className="mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <Button className="w-full mb-6" variant="outline" data-slot="button">
                  Contact Sales
                </Button>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center">✓ Unlimited team members</li>
                <li className="flex items-center">✓ Custom integrations</li>
                <li className="flex items-center">✓ Dedicated support</li>
                <li className="flex items-center">✓ SLA guarantees</li>
                <li className="flex items-center">✓ On-premise deployment</li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-muted-foreground mb-4 text-sm">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <div className="flex items-center justify-center space-x-6 text-muted-foreground text-sm">
              <span>💳 Cancel anytime</span>
              <span>🔒 SOC 2 compliant</span>
              <span>📞 24/7 support</span>
            </div>
          </div>
        </section>

        <Separator />

        {/* Blog Preview Section */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="mb-4">Engineering blog</h2>
              <p className="text-muted-foreground">Deep dives, tutorials, and insights from our engineering team</p>
            </div>
            <Button variant="outline" data-slot="button">View all posts</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48 bg-gradient-to-br from-primary/40 to-primary/60" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Engineering</Badge>
                  <span className="text-muted-foreground text-sm">March 15, 2024 • 8 min read</span>
                </div>
                <h3 className="mb-3 leading-tight group-hover:text-primary transition-colors">
                  Building scalable AI pipelines with Kubernetes
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  How we process millions of AI requests daily using a distributed architecture that scales horizontally
                  and maintains sub-100ms response times.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs bg-primary">DR</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground text-sm">David Rodriguez, Senior Engineer</span>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 2 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48 bg-gradient-to-br from-green-500/40 to-green-600/60" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Security</Badge>
                  <span className="text-muted-foreground text-sm">March 12, 2024 • 6 min read</span>
                </div>
                <h3 className="mb-3 leading-tight group-hover:text-primary transition-colors">
                  Zero-trust architecture in modern development
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our journey to implementing zero-trust security principles across our entire development lifecycle,
                  from code commits to production deployments.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs bg-green-600">LK</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground text-sm">Lisa Kim, Security Lead</span>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 3 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow" data-slot="card">
              <div className="h-48 bg-gradient-to-br from-purple-500/40 to-purple-600/60" />
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Tutorial</Badge>
                  <span className="text-muted-foreground text-sm">March 10, 2024 • 12 min read</span>
                </div>
                <h3 className="mb-3 leading-tight group-hover:text-primary transition-colors">
                  Advanced workflow automation patterns
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Step-by-step guide to creating intelligent workflows that adapt to your team's patterns and
                  automatically optimize for efficiency and reliability.
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs bg-purple-600">JM</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground text-sm">Jordan Mills, Product Engineer</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className="py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-bold mb-6">Ready to ship faster?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Join 10,000+ teams already using Velocity to build better products. Start your free trial today and see
              the difference intelligent automation makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="px-8 py-6" data-slot="button">
                Start free trial
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6" data-slot="button">
                Schedule demo
              </Button>
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Integrates with your favorite tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the tools you already use and love. Our platform works seamlessly with your existing
              workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Slack", "GitHub", "Figma", "Notion"].map((tool) => (
              <div key={tool} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="font-medium">{tool}</span>
                </div>
                <h4 className="font-medium">{tool}</h4>
                <p className="text-muted-foreground mt-1 text-sm">Connected</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Developer Experience Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Built for developers, by developers</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We understand the challenges developers face. That's why we've built our platform with developer
                experience as a top priority.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-primary" />
                  <div>
                    <h4 className="font-medium mb-1">Type-safe APIs</h4>
                    <p className="text-muted-foreground">Full TypeScript support with auto-generated types</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-primary" />
                  <div>
                    <h4 className="font-medium mb-1">Comprehensive documentation</h4>
                    <p className="text-muted-foreground">Clear guides, examples, and interactive API explorer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-primary" />
                  <div>
                    <h4 className="font-medium mb-1">Active community</h4>
                    <p className="text-muted-foreground">Join thousands of developers sharing knowledge and best practices</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6" data-slot="card">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Terminal</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="bg-black/90 rounded p-4 font-mono text-sm text-green-400">
                  <div>$ npm install @yourplatform/sdk</div>
                  <div className="mt-1 opacity-60">✓ Installation complete</div>
                </div>
              </div>

              <pre className="bg-muted p-4 rounded overflow-x-auto text-xs">
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
          <h2 className="mb-4">FAQ</h2>
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1">
              <AccordionTrigger>What is this product?</AccordionTrigger>
              <AccordionContent>It's a powerful platform to accelerate your creative ideas.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How do I subscribe?</AccordionTrigger>
              <AccordionContent>Enter your email in the newsletter section above and click Subscribe.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator />

        {/* Footer Section */}
        <footer className="flex justify-between text-muted-foreground">
          <p>© 2024 Your Company</p>
          <div className="flex space-x-4">
            <Button variant="link" data-slot="link">
              Privacy
            </Button>
            <Button variant="link" data-slot="link">
              Terms
            </Button>
            <Button variant="link" data-slot="link">
              Contact
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}


