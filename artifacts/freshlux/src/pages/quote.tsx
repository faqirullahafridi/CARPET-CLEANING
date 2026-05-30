import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useListServices, useCalculateQuote } from "@workspace/api-client-react";
import { Loader2, Calculator } from "lucide-react";
import { Link } from "wouter";

export default function Quote() {
  const { data: services, isLoading } = useListServices();
  const [serviceId, setServiceId] = useState<string>("");
  
  // Real implementation would have full item selection
  const calculateQuote = useCalculateQuote();

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Instant Quote Calculator</h1>
        <p className="text-xl text-white/60">Get a clear, upfront price for your cleaning needs.</p>
      </div>

      <Card className="p-8 bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">1. Select Service</h2>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
              ) : (
                <div className="space-y-2">
                  {services?.map(s => (
                    <div 
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${serviceId === s.id ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-white/30'}`}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-background/80 border border-white/10 rounded-xl p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" /> Estimated Price
              </h2>
              
              <div className="flex-1 flex flex-col items-center justify-center py-8">
                {serviceId ? (
                  <>
                    <span className="text-5xl font-bold text-accent mb-2">£--.--</span>
                    <span className="text-sm text-white/40">Select items to see total</span>
                  </>
                ) : (
                  <span className="text-white/40">Select a service to start</span>
                )}
              </div>
              
              <Link href={`/book${serviceId ? `?service=${serviceId}` : ''}`}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-auto h-12 text-lg">
                  Book This Price
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
