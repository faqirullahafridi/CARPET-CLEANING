import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useListServices, useListServiceItems, useCalculateQuote, useValidateCoupon, useCreateBooking, useGetAvailability } from "@workspace/api-client-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { ChevronRight, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function Book() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  
  // State
  const [serviceId, setServiceId] = useState<string>("");
  const [propertyType, setPropertyType] = useState<"flat" | "house" | "office">("flat");
  const [postcode, setPostcode] = useState("");
  const [items, setItems] = useState<{itemId: string, quantity: number}[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  
  // Customer details
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const { data: services, isLoading: loadingServices } = useListServices();
  const { data: serviceItems, isLoading: loadingItems } = useListServiceItems(serviceId, { query: { enabled: !!serviceId, queryKey: ["items", serviceId] } });
  
  const createBooking = useCreateBooking();

  const nextStep = () => setStep(s => Math.min(s + 1, 7));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleBooking = () => {
    if (!serviceId || !date || !timeSlot || !customer.name || !customer.email || !customer.phone || !customer.address || !postcode) {
        return; // Validation would go here
    }

    createBooking.mutate({
      data: {
        serviceId,
        items,
        date: date.toISOString().split('T')[0],
        timeSlot,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        address: customer.address,
        postcode,
        notes: customer.notes,
        propertyType
      }
    }, {
      onSuccess: (res) => {
        setLocation(`/booking-confirmation/${res.bookingNumber}`);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Book Your Clean</h1>
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-2 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2" 
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 6) * 100}%` }}
          />
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <div 
              key={num} 
              className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 font-bold text-sm transition-colors ${step >= num ? 'bg-accent text-background' : 'bg-card border border-white/20 text-white/40'}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
              {loadingServices ? (
                <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services?.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => setServiceId(service.id)}
                      className={`p-6 rounded-xl border cursor-pointer transition-all ${serviceId === service.id ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-white/10 hover:border-white/30 bg-background/50'}`}
                    >
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-sm text-white/60 mb-4">{service.description}</p>
                      <span className="text-sm font-medium text-accent">From £{service.startingFrom / 100}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep} disabled={!serviceId} className="bg-primary hover:bg-primary/90 text-white">
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
               <h2 className="text-2xl font-bold mb-6">Property Details</h2>
               <div className="space-y-6">
                 <div>
                   <Label className="text-base mb-3 block">Property Type</Label>
                   <div className="grid grid-cols-3 gap-4">
                     {['flat', 'house', 'office'].map(type => (
                       <div 
                         key={type}
                         onClick={() => setPropertyType(type as any)}
                         className={`p-4 rounded-xl border text-center cursor-pointer capitalize transition-all ${propertyType === type ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-white/30'}`}
                       >
                         {type}
                       </div>
                     ))}
                   </div>
                 </div>
                 <div>
                   <Label className="text-base mb-3 block">Postcode</Label>
                   <Input 
                     placeholder="e.g. SW1A 1AA" 
                     value={postcode} 
                     onChange={e => setPostcode(e.target.value)}
                     className="bg-background/50 border-white/10 text-lg py-6"
                   />
                 </div>
               </div>
               <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={prevStep}><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button onClick={nextStep} disabled={!postcode} className="bg-primary hover:bg-primary/90 text-white">
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Further steps would follow the same pattern, simplified for brevity in this initial implementation */}
          {step > 2 && step < 7 && (
            <motion.div
              key={`step${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10 text-center py-12"
            >
              <h2 className="text-2xl font-bold mb-4">Step {step} Details</h2>
              <p className="text-white/60 mb-8">This section will contain the specific inputs for step {step}.</p>
              
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={prevStep}><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 text-white">
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>
              <div className="bg-background/50 border border-white/10 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> Booking Summary</h3>
                <p className="text-white/70 mb-2">Service ID: {serviceId}</p>
                <p className="text-white/70 mb-2">Property: {propertyType}, {postcode}</p>
                {/* Real breakdown would be displayed here using useCalculateQuote */}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={prevStep}><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                <Button onClick={handleBooking} disabled={createBooking.isPending} className="bg-accent hover:bg-accent/90 text-background font-bold px-8">
                  {createBooking.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
