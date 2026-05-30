import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListServices, useCalculateQuote, useListServiceItems } from "@workspace/api-client-react";
import { Loader2, Calculator, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Quote() {
  const { data: services, isLoading } = useListServices();
  const [serviceId, setServiceId] = useState<string>("");
  const [items, setItems] = useState<{itemId: string, quantity: number}[]>([]);
  
  const { data: serviceItems, isLoading: loadingItems } = useListServiceItems(serviceId, { query: { enabled: !!serviceId, queryKey: ["items", serviceId] } });

  const calculateQuote = useCalculateQuote();

  const handleCalculate = () => {
    if(!serviceId) return;
    calculateQuote.mutate({
      data: {
        serviceId,
        propertyType: "flat",
        items
      }
    })
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-accent text-sm font-bold tracking-widest uppercase mb-4">
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Instant Quote Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get a clear, upfront price for your cleaning needs. No hidden fees, ever.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 bg-card border border-border rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-6 text-foreground">1. Select Service</h2>
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services?.map(s => (
                    <div 
                      key={s.id}
                      onClick={() => {
                        setServiceId(s.id);
                        setItems([]);
                      }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-colors font-bold ${serviceId === s.id ? 'border-primary bg-primary/10 text-foreground' : 'border-border hover:border-muted-foreground/30 text-muted-foreground'}`}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {serviceId && (
              <Card className="p-8 bg-card border border-border rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-foreground">2. Select Items</h2>
                {loadingItems ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : (
                  <div className="space-y-3">
                    {serviceItems?.map(item => {
                      const selected = items.find(i => i.itemId === item.id);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
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
                      <div className="text-muted-foreground py-4">No specific items required for this service.</div>
                    )}
                  </div>
                )}
                <Button 
                  onClick={handleCalculate} 
                  className="mt-8 bg-primary hover:bg-primary/90 text-white"
                  disabled={calculateQuote.isPending}
                >
                  {calculateQuote.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Calculate Total
                </Button>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-8 bg-card border border-border rounded-xl flex flex-col min-h-[400px] shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground border-b border-border pb-4">
                  <Calculator className="w-5 h-5 text-accent" /> Estimated Price
                </h2>
                
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  {calculateQuote.data ? (
                    <>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Estimate</div>
                      <span className="text-5xl font-extrabold text-foreground mb-2">£{(calculateQuote.data.totalGbp / 100).toFixed(2)}</span>
                      <div className="w-full mt-8 space-y-2 text-sm text-left">
                         {calculateQuote.data.lines.map((line, idx) => (
                           <div key={idx} className="flex justify-between text-muted-foreground">
                             <span>{line.description}</span>
                             <span className="font-bold text-foreground">£{(line.totalGbp / 100).toFixed(2)}</span>
                           </div>
                         ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-extrabold text-muted-foreground mb-4">£--.--</span>
                      <span className="text-sm text-muted-foreground text-center">Select a service and items<br/>to see your total</span>
                    </>
                  )}
                </div>
                
                <Link href={`/book${serviceId ? `?service=${serviceId}` : ''}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-auto h-14 text-lg font-bold rounded-lg" disabled={!serviceId}>
                    Book This Price <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}