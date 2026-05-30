import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Clock, Shield, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-background">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp} className="w-12 h-0.5 bg-accent mb-6" />
              <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                Trusted by 10,000+ UK Homes
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground leading-tight"
              >
                Professional Carpet Cleaning Across the UK
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl font-medium"
              >
                Book trusted professional cleaners in minutes with instant pricing and same-day availability.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
              >
                <Link href="/book" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white transition-all rounded-lg" data-testid="button-hero-book">
                    Book Cleaning
                  </Button>
                </Link>
                <Link href="/quote" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border border-border hover:bg-muted text-foreground rounded-lg" data-testid="button-hero-quote">
                    Get Instant Quote
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>10,000+ Homes</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Same-Day</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Fully Insured</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="bg-card border border-border rounded-2xl p-8 max-w-md ml-auto shadow-xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />
                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-4">Booking Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-semibold text-foreground">Carpet Deep Clean</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-semibold text-foreground">3 Bed House</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-semibold text-accent">Today, 2:00 PM</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-2xl text-foreground">£145</span>
                </div>
                <Button className="w-full bg-muted/60 text-muted-foreground border border-border" disabled>
                  Ready to Book
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-card border-y border-border py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <div className="text-center px-4">
              <div className="text-4xl font-extrabold text-foreground mb-2">10,000+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Homes Cleaned</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-extrabold text-foreground mb-2">500+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">5-Star Reviews</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-extrabold text-foreground mb-2">15+</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Cities Covered</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-extrabold text-foreground mb-2">24hr</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-accent mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl">Professional, deep-extraction cleaning for all types of flooring and upholstery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Carpet Cleaning", price: "£45", desc: "Deep extraction cleaning for all carpet types." },
              { title: "Sofa & Upholstery", price: "£75", desc: "Restore the original beauty of your furniture." },
              { title: "Rug Cleaning", price: "£25", desc: "Specialist care for delicate and everyday rugs." },
              { title: "Mattress Cleaning", price: "£35", desc: "Remove dust mites, stains, and allergens." },
              { title: "Deep Stain Removal", price: "£30", desc: "Targeted treatment for stubborn stains." },
              { title: "End of Tenancy", price: "£95", desc: "Complete property carpet refresh for moving out." }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="p-8 bg-card border-border border-t-2 border-t-primary rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-1">{service.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-muted-foreground">from <span className="text-lg font-bold text-foreground ml-1">{service.price}</span></span>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Three simple steps to a cleaner home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-border" />
            
            {[
              { step: "01", title: "Get a Quote", desc: "Select your rooms and items for an instant online price." },
              { step: "02", title: "Choose a Date", desc: "Pick a convenient time slot, including same-day availability." },
              { step: "03", title: "We Clean", desc: "Our professionals arrive and transform your carpets." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-background border-2 border-primary rounded-xl flex items-center justify-center text-2xl font-extrabold text-primary mb-6 z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                Why 10,000 homes trust FreshLux
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We deliver uncompromising quality with transparent pricing and professional service.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Fully vetted professionals",
                "Advanced hot water extraction",
                "Eco-friendly solutions",
                "100% satisfaction guarantee",
                "Instant upfront pricing",
                "Same-day availability",
                "No hidden fees",
                "Fully insured up to £5M"
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Customer Reviews</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", quote: "Incredible service. They managed to remove stains from my living room carpet that I thought were permanent." },
              { name: "David Thorne", quote: "Very professional team. Arrived exactly on time, worked quickly, and the results are fantastic. Highly recommend." },
              { name: "Emma Williams", quote: "Booking online was so easy, and the upfront pricing meant no surprises. The carpets look brand new." }
            ].map((review, i) => (
              <Card key={i} className="p-8 bg-background border border-border rounded-xl">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{review.quote}"</p>
                <div>
                  <div className="font-bold text-foreground">{review.name}</div>
                  <div className="text-sm text-accent font-medium">Verified Customer</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border">
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-foreground hover:no-underline">How long does it take for carpets to dry?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                Typically, carpets take 2-4 hours to dry completely depending on the ventilation and heating in the room. We use industrial extraction machines that remove 90% of the moisture during the cleaning process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border">
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-foreground hover:no-underline">Do I need to move my furniture?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                We politely ask that you move smaller items (toys, plants, small tables) out of the room before we arrive. Our technicians can help move larger items like sofas and tables during the clean, placing them on protective foil pads afterwards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border">
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-foreground hover:no-underline">Are your cleaning products safe for pets and children?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                Yes, absolutely. We use eco-friendly, non-toxic cleaning solutions that are completely safe for your family and pets once the carpets are dry.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-border">
              <AccordionTrigger className="text-lg font-bold text-foreground hover:text-foreground hover:no-underline">Do you guarantee stain removal?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2 pb-6">
                While we have a very high success rate with stains, we cannot guarantee the complete removal of all stains, as some may have permanently dyed the carpet fibers. We will always give you an honest assessment before we start.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready for cleaner carpets?</h2>
          <p className="text-xl text-white mb-10 font-medium">Join 10,000+ satisfied customers across the UK.</p>
          <Link href="/book">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-10 bg-white text-primary hover:bg-gray-100 font-bold rounded-lg transition-transform hover:scale-105" data-testid="button-cta-book">
              Book Your Clean Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}