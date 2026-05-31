import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SITE_IMAGES, GALLERY_ITEMS } from "@/lib/site-images";

export default function About() {
  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Stats Strip */}
      <section className="bg-card border-b border-border py-8">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-2xl font-extrabold text-foreground">10,000+</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Homes Cleaned</div>
            </div>
            <div className="hidden sm:block w-px bg-border" />
            <div>
              <div className="text-2xl font-extrabold text-foreground">£5M</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Public Liability</div>
            </div>
            <div className="hidden sm:block w-px bg-border" />
            <div>
              <div className="text-2xl font-extrabold text-foreground">24/7</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Support</div>
            </div>
            <div className="hidden sm:block w-px bg-border" />
            <div>
              <div className="text-2xl font-extrabold text-foreground">100%</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-6xl pt-24">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-foreground">
            Redefining Clean.
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Carpet Cleaning was founded with a single mission: to bring a modern, transparent, and premium experience to the traditional carpet cleaning industry.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-foreground">The Carpet Cleaning Standard</h2>
            <div className="w-12 h-1 bg-accent" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              For too long, booking a cleaner meant dealing with vague quotes, cash-only payments, and unpredictable quality. We built Carpet Cleaning to fix that.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every technician is vetted, fully insured, and equipped with industry-leading machinery. Our transparent pricing means the quote you see is the price you pay—no hidden fees.
            </p>
            <ul className="space-y-4 pt-6 border-t border-border mt-6">
              {[
                "£5M Public Liability Insurance", 
                "Advanced hot water extraction machinery", 
                "Eco-friendly, child & pet safe solutions", 
                "100% Satisfaction Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src={SITE_IMAGES.gallery.bedroom}
                alt="Professional carpet cleaning in a UK home"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-6 max-w-[220px] shadow-xl hidden sm:block">
              <Award className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-lg font-extrabold text-foreground mb-1">Award Winning</h3>
              <p className="text-sm text-muted-foreground">Excellence in domestic and commercial cleaning across the UK.</p>
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div className="mb-24">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">Life After a Professional Clean</h2>
          <div className="w-12 h-1 bg-accent mx-auto mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.slice(0, 6).map((item) => (
              <div key={item.src} className="relative overflow-hidden rounded-xl border border-border aspect-[4/3] group">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card border border-border text-center rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-primary mx-auto mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">Vetted Professionals</h3>
            <p className="text-muted-foreground leading-relaxed">Only the top 5% of applicants make it through our rigorous training and background checks.</p>
          </Card>
          <Card className="p-8 bg-card border border-border text-center rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-primary mx-auto mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">Fully Protected</h3>
            <p className="text-muted-foreground leading-relaxed">Your home is in safe hands. We carry comprehensive insurance covering up to £5,000,000.</p>
          </Card>
          <Card className="p-8 bg-card border border-border text-center rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center text-primary mx-auto mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3">Satisfaction Guaranteed</h3>
            <p className="text-muted-foreground leading-relaxed">If you're not completely happy with the result, we'll re-clean the area for free.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}