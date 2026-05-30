import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Premium Cleaning Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Specialist care for your carpets, upholstery, and hard floors across the UK.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-accent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services?.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all p-8 flex flex-col group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/40 font-medium">Starting from</div>
                      <div className="text-2xl font-bold text-accent">£{service.startingFrom / 100}</div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
                  <p className="text-white/60 mb-6 flex-1">{service.description}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/book?service=${service.id}`}>
                    <Button className="w-full bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary transition-all">
                      Book {service.name}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
