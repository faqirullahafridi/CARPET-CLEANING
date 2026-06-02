import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { BrandMark } from "@/components/brand-mark";
import { CONTACT } from "@/lib/contact-info";
import { openWhatsAppChat } from "@/lib/whatsapp-booking";

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
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <BrandMark />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
            <Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">Services</Link>
            <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
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

      <footer className="border-t border-border bg-card relative overflow-hidden mt-auto">
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-6 transition-opacity hover:opacity-90">
                <BrandMark size="footer" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The UK&apos;s premium carpet and upholstery cleaning service.
                Same-day availability and a meticulous finish.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-6">Services</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-primary transition-colors">Carpet Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Sofa & Upholstery</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Rug Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Mattress Cleaning</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">End of Tenancy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/book" className="hover:text-primary transition-colors">Book Now</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-accent" />
                  <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-primary transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-accent" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                  <span>London, Manchester, Birmingham & Nationwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Carpet Cleaning Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => openWhatsAppChat("Hi, I would like to book a carpet cleaning.")}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#20bd5a] md:px-5 md:py-3.5"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
}