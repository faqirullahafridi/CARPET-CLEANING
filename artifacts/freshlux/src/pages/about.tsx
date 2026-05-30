import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6"
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Trusted by 10,000+ UK Homes</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Redefining Clean.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            FreshLux was founded with a single mission: to bring a modern, transparent, and premium experience to the traditional carpet cleaning industry.
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">The FreshLux Standard</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              For too long, booking a cleaner meant dealing with vague quotes, cash-only payments, and unpredictable quality. We built FreshLux to fix that.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Every technician is vetted, fully insured, and equipped with industry-leading machinery. Our transparent pricing means the quote you see is the price you pay—no hidden fees.
            </p>
            <ul className="space-y-3 pt-4">
              {["£5M Public Liability Insurance", "Advanced hot water extraction machinery", "Eco-friendly, child & pet safe solutions", "100% Satisfaction Guarantee"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-white/80 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" 
                alt="Professional cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stats card */}
            <Card className="absolute -bottom-8 -left-8 p-6 bg-card/80 backdrop-blur-xl border-white/10 shadow-2xl z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-white/60">Average Rating</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-white/5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Vetted Professionals</h3>
            <p className="text-white/60">Only the top 5% of applicants make it through our rigorous training and background checks.</p>
          </Card>
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-white/5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fully Protected</h3>
            <p className="text-white/60">Your home is in safe hands. We carry comprehensive insurance covering up to £5,000,000.</p>
          </Card>
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-white/5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Satisfaction Guaranteed</h3>
            <p className="text-white/60">If you're not completely happy with the result, we'll re-clean the area for free.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
