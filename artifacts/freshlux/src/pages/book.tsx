import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useListServices, useListServiceItems, useCreateBooking } from "@workspace/api-client-react";
import { ChevronRight, ChevronLeft, Loader2, Check, Info } from "lucide-react";
import { useLocation } from "wouter";
import { PostcodeInput } from "@/components/postcode-input";
import { AddressPicker } from "@/components/address-picker";
import type { PostcodeLookupResult } from "@/lib/postcodes";
import { useToast } from "@/hooks/use-toast";

export default function Book() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  
  // State
  const [serviceId, setServiceId] = useState<string>("");
  const [propertyType, setPropertyType] = useState<"flat" | "house" | "office">("flat");
  const [postcode, setPostcode] = useState("");
  const [postcodeDetails, setPostcodeDetails] = useState<PostcodeLookupResult | null>(null);
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
  
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleBooking = () => {
    if (!serviceId || !date || !timeSlot || !customer.name || !customer.email || !customer.phone || !customer.address || !postcodeDetails) {
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
        postcode: postcodeDetails?.postcode ?? postcode,
        notes: customer.notes,
        propertyType
      }
    }, {
      onSuccess: (res) => {
        setLocation(`/booking-confirmation/${res.bookingNumber}`);
      },
      onError: (err) => {
        const description =
          err instanceof Error
            ? err.message.replace(/^HTTP \d+[^:]+:\s*/, "")
            : "Failed to confirm booking. Please try again or contact us.";
        toast({
          title: "Booking failed",
          description,
          variant: "destructive",
        });
      },
    });
  };

  const steps = [
    { id: 1, title: "Service & Property" },
    { id: 2, title: "Select Items" },
    { id: 3, title: "Date & Time" },
    { id: 4, title: "Your Details" }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-foreground mb-8">Book Your Clean</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            {/* Progress Tabs */}
            <div className="flex border-b border-border mb-8 overflow-x-auto">
              {steps.map((s) => (
                <div 
                  key={s.id}
                  className={`flex-1 py-4 px-4 text-center font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${step === s.id ? 'border-primary text-foreground' : step > s.id ? 'border-transparent text-muted-foreground' : 'border-transparent text-muted-foreground'}`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded mr-2 text-xs ${step === s.id ? 'bg-primary text-white' : step > s.id ? 'bg-muted-foreground/20 text-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                  </span>
                  {s.title}
                </div>
              ))}
            </div>

            <Card className="p-8 bg-card border border-border rounded-xl shadow-md">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Select a Service</h2>
                    {loadingServices ? (
                      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {services?.map(service => (
                          <div 
                            key={service.id}
                            onClick={() => setServiceId(service.id)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${serviceId === service.id ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/30 bg-background'}`}
                            data-testid={`service-${service.id}`}
                          >
                            <h3 className="text-lg font-bold mb-2 text-foreground">{service.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                            <span className="text-sm font-bold text-foreground">From £{(service.startingFrom / 100).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <h2 className="text-2xl font-bold mb-6 text-foreground mt-10">Property Details</h2>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-semibold text-foreground mb-3 block">Property Type</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {['flat', 'house', 'office'].map(type => (
                            <div 
                              key={type}
                              onClick={() => setPropertyType(type as any)}
                              className={`p-4 rounded-xl border text-center font-bold cursor-pointer capitalize transition-all ${propertyType === type ? 'border-primary bg-primary/10 text-foreground' : 'border-border hover:border-muted-foreground/30 text-muted-foreground'}`}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-foreground mb-3 block">Postcode</Label>
                        <PostcodeInput
                          value={postcode}
                          onChange={(value) => {
                            setPostcode(value);
                            if (postcodeDetails && value !== postcodeDetails.postcode) {
                              setPostcodeDetails(null);
                              setCustomer((prev) => ({ ...prev, address: "" }));
                            }
                          }}
                          onValidated={(result) => {
                            setPostcodeDetails(result);
                            setCustomer((prev) => ({ ...prev, address: "" }));
                          }}
                        />
                      </div>

                      {postcodeDetails && (
                        <AddressPicker
                          postcodeDetails={postcodeDetails}
                          value={customer.address}
                          onChange={(address) =>
                            setCustomer((prev) => ({ ...prev, address }))
                          }
                        />
                      )}
                    </div>

                    <div className="mt-10 flex justify-end">
                      <Button onClick={nextStep} disabled={!serviceId || !postcodeDetails || !customer.address.trim()} className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg">
                        Continue <ChevronRight className="w-4 h-4 ml-2" />
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
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Select Items</h2>
                    {loadingItems ? (
                      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                    ) : (
                      <div className="space-y-4 mb-8">
                        {serviceItems?.map(item => {
                          const selected = items.find(i => i.itemId === item.id);
                          const isSelected = !!selected && selected.quantity > 0;
                          return (
                            <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isSelected ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}>
                              <div>
                                <div className="font-bold text-foreground">{item.name}</div>
                                <div className="text-sm text-muted-foreground">£{item.priceGbp.toFixed(2)}</div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="w-8 h-8 rounded-full p-0 border-border text-foreground hover:bg-muted/60"
                                  onClick={() => {
                                    setItems(prev => {
                                      const existing = prev.find(i => i.itemId === item.id);
                                      if (!existing) return prev;
                                      if (existing.quantity === 1) return prev.filter(i => i.itemId !== item.id);
                                      return prev.map(i => i.itemId === item.id ? { ...i, quantity: i.quantity - 1 } : i);
                                    });
                                  }}
                                >
                                  -
                                </Button>
                                <span className="w-4 text-center font-bold text-foreground">{selected?.quantity || 0}</span>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="w-8 h-8 rounded-full p-0 border-border text-foreground hover:bg-muted/60"
                                  onClick={() => {
                                    setItems(prev => {
                                      const existing = prev.find(i => i.itemId === item.id);
                                      if (existing) return prev.map(i => i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
                                      return [...prev, { itemId: item.id, quantity: 1 }];
                                    });
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        {(!serviceItems || serviceItems.length === 0) && (
                          <div className="text-center p-8 border border-border rounded-xl bg-background text-muted-foreground">
                            No additional items for this service.
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mt-10 flex justify-between">
                      <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-muted/60 h-12 px-6"><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                      <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg">
                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Date & Time</h2>
                    <div className="space-y-8">
                      <div>
                        <Label className="text-sm font-semibold text-foreground mb-4 block">Select Date</Label>
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                          {Array.from({ length: 14 }).map((_, i) => {
                            const d = new Date();
                            d.setDate(d.getDate() + i);
                            const isSelected = date?.toDateString() === d.toDateString();
                            return (
                              <div 
                                key={i}
                                onClick={() => setDate(d)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary text-white' : 'border-border hover:border-muted-foreground/30 bg-background text-muted-foreground'}`}
                              >
                                <span className="text-xs font-medium uppercase mb-1">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                                <span className="text-lg font-bold">{d.getDate()}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-foreground mb-4 block">Select Time Slot</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'].map((time) => (
                            <div 
                              key={time}
                              onClick={() => setTimeSlot(time)}
                              className={`p-3 rounded-lg border text-center font-medium cursor-pointer transition-colors ${timeSlot === time ? 'border-primary bg-primary/10 text-foreground' : 'border-border hover:border-muted-foreground/30 bg-background text-muted-foreground'}`}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-10 flex justify-between">
                      <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-muted/60 h-12 px-6"><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                      <Button onClick={nextStep} disabled={!date || !timeSlot} className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg">
                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Your Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Full Name</Label>
                          <Input 
                            value={customer.name}
                            onChange={(e) => setCustomer({...customer, name: e.target.value})}
                            className="bg-background border-border h-11 text-foreground" 
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Email</Label>
                          <Input 
                            type="email"
                            value={customer.email}
                            onChange={(e) => setCustomer({...customer, email: e.target.value})}
                            className="bg-background border-border h-11 text-foreground" 
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Phone Number</Label>
                        <Input 
                          value={customer.phone}
                          onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                          className="bg-background border-border h-11 text-foreground" 
                          placeholder="07700 900000"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Full Address</Label>
                        <Input 
                          value={customer.address}
                          onChange={(e) => setCustomer({...customer, address: e.target.value})}
                          className="bg-background border-border h-11 text-foreground" 
                          placeholder="Address from postcode lookup, or edit here"
                        />
                        {postcodeDetails && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Postcode {postcodeDetails.postcode} — update here if needed
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-2 block">Special Instructions (Optional)</Label>
                        <textarea 
                          value={customer.notes}
                          onChange={(e) => setCustomer({...customer, notes: e.target.value})}
                          className="w-full bg-background border border-border rounded-md p-3 text-foreground min-h-[100px]" 
                          placeholder="Parking details, access codes, specific stain concerns..."
                        />
                      </div>
                    </div>
                    
                    <div className="mt-10 flex justify-between">
                      <Button variant="ghost" onClick={prevStep} className="text-foreground hover:bg-muted/60 h-12 px-6"><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
                      <Button 
                        onClick={handleBooking} 
                        disabled={createBooking.isPending || !customer.name || !customer.email || !customer.phone || !customer.address} 
                        className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg"
                      >
                        {createBooking.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                        Confirm Booking
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 bg-card border border-border rounded-xl shadow-md">
                <h3 className="font-extrabold text-lg text-foreground mb-6 border-b border-border pb-4">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {serviceId && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-bold text-foreground text-right">{services?.find(s => s.id === serviceId)?.name || 'Selected Service'}</span>
                    </div>
                  )}
                  {propertyType && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Property</span>
                      <span className="font-bold text-foreground capitalize">{propertyType}</span>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-muted-foreground shrink-0">Address</span>
                      <span className="font-bold text-foreground text-right text-sm leading-relaxed">
                        {customer.address}
                      </span>
                    </div>
                  )}
                  {postcodeDetails && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Postcode</span>
                      <span className="font-bold text-foreground text-right uppercase">
                        {postcodeDetails.postcode}
                        {postcodeDetails.adminDistrict && (
                          <>
                            <br />
                            <span className="text-xs font-normal normal-case text-muted-foreground">
                              {postcodeDetails.adminDistrict}
                              {postcodeDetails.region ? `, ${postcodeDetails.region}` : ""}
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  )}
                  {date && timeSlot && (
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-bold text-foreground text-right">
                        {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}<br/>
                        <span className="text-accent">{timeSlot}</span>
                      </span>
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-border pt-4 mb-6">
                    <h4 className="font-bold text-sm text-foreground mb-3">Selected Items</h4>
                    <div className="space-y-2">
                      {items.map(item => {
                        const itemData = serviceItems?.find(i => i.id === item.itemId);
                        if (!itemData) return null;
                        return (
                          <div key={item.itemId} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.quantity}x {itemData.name}</span>
                            <span className="text-foreground">£{(itemData.priceGbp * item.quantity).toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-primary/10 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm mb-2">
                    <Info className="w-4 h-4" /> Final price confirmed on arrival
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="font-bold text-foreground">Estimated Total</span>
                    <span className="font-extrabold text-2xl text-foreground">
                      £{
                        (items.reduce((acc, curr) => {
                          const price = serviceItems?.find(i => i.id === curr.itemId)?.priceGbp || 0;
                          return acc + (price * curr.quantity);
                        }, 0)).toFixed(2)
                      }
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground text-right">
                    *Min. £85 applies
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}