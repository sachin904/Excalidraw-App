"use client"
/* eslint-disable @next/next/no-img-element */

import { Button } from "@repo/ui/button";
import { Pencil, Sparkles, Share2, Users2, Layers } from "lucide-react";
import Link from "next/link";



const features = [
  {
    title: "Intuitive Drawing",
    description: "Create beautiful diagrams with our intuitive hand-drawn style tools.",
    icon: <Pencil className="w-6 h-6 text-primary" />,
  },
  {
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team in real-time.",
    icon: <Users2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Instant Sharing",
    description: "Share your creations with a single click, anywhere, anytime.",
    icon: <Share2 className="w-6 h-6 text-primary" />,
  },
];
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">DrawFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-blue-400 h-8 w-15">signup</button>
            <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90" >
              <Link href="/signup">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Where Ideas Flow Freely
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform your thoughts into beautiful hand-drawn diagrams. Collaborate in real-time, 
              share instantly, and bring your ideas to life.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
             <Link  href={"/canvas/11"}>start creating</Link> 
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Try Demo
              </Button>
            </div>
          </div>
          <div className="mt-20">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl blur-2xl" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=2000&q=80"
                  alt="DrawFlow Interface"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Craft Your Vision
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features that make DrawFlow the perfect choice for your creative process.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-xl border border-border hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Start Creating Today
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust DrawFlow for their visual storytelling.
              Get started for free, no credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-50 text-primary hover:bg-background/90"
                variant="default"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                
              >
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Templates', 'Integrations', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Tutorials', 'Blog', 'Support'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About', 'Careers', 'Contact', 'Press'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">DrawFlow</span>
            </div>
            <p className="text-center text-muted-foreground mt-4">
              © 2025 DrawFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
