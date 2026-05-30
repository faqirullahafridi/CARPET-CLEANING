import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplets, Sparkles, CheckCircle2, Star, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0B1B3D] to-primary/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent/30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2 + 1,
              }}
              animate={{
                y: [null, Math.random() * -500],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">UK's Premium Cleaning Service</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
            >
              Professional Carpet Cleaning Across the UK
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto"
            >
              Book trusted professional cleaners in minutes with instant pricing and same-day availability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">
                  Book Cleaning
                </Button>
              </Link>
              <Link href="/quote" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-white/10 hover:bg-white/5 backdrop-blur-sm text-white">
                  Get Instant Quote
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/60 text-sm font-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>10,000+ Homes Cleaned</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Same-Day Availability</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>Fully Insured & Certified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Discover our range of professional cleaning services tailored for your home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Carpet Cleaning", price: "£45", desc: "Deep extraction cleaning for all carpet types.", icon: Droplets },
              { title: "Sofa & Upholstery", price: "£75", desc: "Restore the original beauty of your furniture.", icon: Sparkles },
              { title: "Rug Cleaning", price: "£25", desc: "Specialist care for delicate and everyday rugs.", icon: Shield },
              { title: "Mattress Cleaning", price: "£35", desc: "Remove dust mites, stains, and allergens.", icon: Star },
              { title: "Deep Stain Removal", price: "£30", desc: "Targeted treatment for stubborn stains.", icon: Droplets },
              { title: "End of Tenancy", price: "£95", desc: "Complete property carpet refresh for moving out.", icon: CheckCircle2 }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-xl border-white/5 hover:border-accent/50 transition-all group hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/60 mb-4">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/40">Starting from</span>
                    <span className="text-lg font-bold text-accent">{service.price}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Three simple steps to a cleaner home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-primary/50 to-primary/50 border-t border-dashed border-primary" />
            
            {[
              { step: "01", title: "Get a Quote", desc: "Select your rooms and items for an instant online price." },
              { step: "02", title: "Choose a Date", desc: "Pick a convenient time slot, including same-day availability." },
              { step: "03", title: "We Clean", desc: "Our professionals arrive and transform your carpets." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-2 border-primary flex items-center justify-center text-2xl font-bold text-accent mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)] z-10 relative">
                  {item.step}
                  <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Everything you need to know about our services.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-accent">How long does it take for carpets to dry?</AccordionTrigger>
              <AccordionContent className="text-white/60">
                Typically, carpets take 2-4 hours to dry completely depending on the ventilation and heating in the room. We use industrial extraction machines that remove 90% of the moisture during the cleaning process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-accent">Do I need to move my furniture?</AccordionTrigger>
              <AccordionContent className="text-white/60">
                We politely ask that you move smaller items (toys, plants, small tables) out of the room before we arrive. Our technicians can help move larger items like sofas and tables during the clean, placing them on protective foil pads afterwards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-accent">Are your cleaning products safe for pets and children?</AccordionTrigger>
              <AccordionContent className="text-white/60">
                Yes, absolutely. We use eco-friendly, non-toxic cleaning solutions that are completely safe for your family and pets once the carpets are dry.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-white/10">
              <AccordionTrigger className="text-lg hover:text-accent">Do you guarantee stain removal?</AccordionTrigger>
              <AccordionContent className="text-white/60">
                While we have a very high success rate with stains, we cannot guarantee the complete removal of all stains, as some may have permanently dyed the carpet fibers. We will always give you an honest assessment before we start.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready for cleaner carpets?</h2>
          <p className="text-xl text-white/70 mb-10">Join 10,000+ satisfied customers across the UK.</p>
          <Link href="/book">
            <Button size="lg" className="text-lg h-16 px-12 bg-accent hover:bg-accent/90 text-background font-bold shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              Book Your Clean Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
