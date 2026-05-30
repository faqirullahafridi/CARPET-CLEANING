import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect } from "react";

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
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans dark selection:bg-primary selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <header className="sticky top-0 z-40 w-full bg-background border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <div className="w-4 h-4 bg-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              FreshLux
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
            <Link href="/quote" className="text-white/70 hover:text-white transition-colors">Instant Quote</Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/book">
              <Button className="rounded-lg px-6 font-semibold bg-primary hover:bg-primary/90 text-white transition-all">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-background relative overflow-hidden mt-auto">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 bg-white" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">FreshLux</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                The UK's premium carpet and upholstery cleaning service. 
                Instant pricing, same-day availability, and a meticulous finish.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Services</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link href="/services" className="hover:text-white transition-colors">Carpet Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Sofa & Upholstery</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Rug Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Mattress Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">End of Tenancy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/quote" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">Book Now</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm text-white/70">
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

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
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