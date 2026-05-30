import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-card border-b border-white/5 text-center">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
            Professional Cleaning
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Premium Cleaning Services
          </h1>
          <p className="text-lg md:text-xl text-white/70">
            Specialist care for your carpets, upholstery, and hard floors across the UK. 
            Transparent pricing, reliable professionals.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-5xl pt-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-12">
            {services?.map((service, i) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Card className="bg-card border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-background border-r border-white/10 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-extrabold text-white mb-2">{service.name}</h2>
                    <div className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">Starting from</div>
                    <div className="text-4xl font-extrabold text-primary">£{service.startingFrom / 100}</div>
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col">
                    <p className="text-white/80 text-lg mb-8">{service.description}</p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {service.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-white/80 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <Link href={`/book?service=${service.id}`}>
                        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-lg px-8 h-12 text-base">
                          Book {service.name} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}