import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Stats Strip */}
      <section className="bg-card border-b border-white/5 py-8">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-2xl font-extrabold text-white">10,000+</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Homes Cleaned</div>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div>
              <div className="text-2xl font-extrabold text-white">£5M</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Public Liability</div>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div>
              <div className="text-2xl font-extrabold text-white">24/7</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Support</div>
            </div>
            <div className="hidden sm:block w-px bg-white/10" />
            <div>
              <div className="text-2xl font-extrabold text-white">100%</div>
              <div className="text-xs font-bold text-white/50 uppercase tracking-wider">Satisfaction</div>
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Redefining Clean.
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-medium">
            FreshLux was founded with a single mission: to bring a modern, transparent, and premium experience to the traditional carpet cleaning industry.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-white">The FreshLux Standard</h2>
            <div className="w-12 h-1 bg-accent" />
            <p className="text-white/70 text-lg leading-relaxed">
              For too long, booking a cleaner meant dealing with vague quotes, cash-only payments, and unpredictable quality. We built FreshLux to fix that.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Every technician is vetted, fully insured, and equipped with industry-leading machinery. Our transparent pricing means the quote you see is the price you pay—no hidden fees.
            </p>
            <ul className="space-y-4 pt-6 border-t border-white/10 mt-6">
              {[
                "£5M Public Liability Insurance", 
                "Advanced hot water extraction machinery", 
                "Eco-friendly, child & pet safe solutions", 
                "100% Satisfaction Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-white/90 font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-card border border-white/10 flex items-center justify-center p-12 text-center">
               <div>
                 <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                 <h3 className="text-2xl font-extrabold text-white mb-2">Award Winning</h3>
                 <p className="text-white/60">Recognized for excellence in domestic and commercial cleaning services across the UK.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card border border-white/10 text-center rounded-xl">
            <div className="w-12 h-12 rounded bg-background border border-white/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Vetted Professionals</h3>
            <p className="text-white/70 leading-relaxed">Only the top 5% of applicants make it through our rigorous training and background checks.</p>
          </Card>
          <Card className="p-8 bg-card border border-white/10 text-center rounded-xl">
            <div className="w-12 h-12 rounded bg-background border border-white/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Fully Protected</h3>
            <p className="text-white/70 leading-relaxed">Your home is in safe hands. We carry comprehensive insurance covering up to £5,000,000.</p>
          </Card>
          <Card className="p-8 bg-card border border-white/10 text-center rounded-xl">
            <div className="w-12 h-12 rounded bg-background border border-white/10 flex items-center justify-center text-primary mx-auto mb-6">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3">Satisfaction Guaranteed</h3>
            <p className="text-white/70 leading-relaxed">If you're not completely happy with the result, we'll re-clean the area for free.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}