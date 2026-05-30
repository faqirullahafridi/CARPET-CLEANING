import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { Droplets, Sparkles, MapPin, Phone, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans dark selection:bg-accent selection:text-background">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50 shadow-[0_0_10px_var(--color-accent)]"
        style={{ scaleX }}
      />
      
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-white/5 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary group-hover:bg-accent/20 group-hover:text-accent transition-colors">
              <Sparkles className="w-6 h-6 absolute animate-pulse opacity-50" />
              <Droplets className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 rounded-xl box-shadow-[0_0_20px_var(--color-primary)] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              FreshLux
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/services" className="text-white/70 hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">Services</Link>
            <Link href="/quote" className="text-white/70 hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">Instant Quote</Link>
            <Link href="/about" className="text-white/70 hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">About</Link>
            <Link href="/contact" className="text-white/70 hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/book">
              <Button className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300 border border-primary-border">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-background relative overflow-hidden mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary">
                  <Droplets className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">FreshLux</span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                The UK's premium carpet and upholstery cleaning service. 
                Instant pricing, same-day availability, and a meticulous finish.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Services</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link href="/services" className="hover:text-accent transition-colors">Carpet Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Sofa & Upholstery</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Rug Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Mattress Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-accent transition-colors">End of Tenancy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="/quote" className="hover:text-accent transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="/book" className="hover:text-accent transition-colors">Book Now</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-accent" />
                  <span>0800 123 4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-accent" />
                  <span>hello@freshlux.co.uk</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                  <span>London, Manchester, Birmingham & Nationwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>© {new Date().getFullYear()} FreshLux Cleaning Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
