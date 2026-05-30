import { useParams, Link } from "wouter";
import { useGetBooking } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, Loader2, ArrowRight } from "lucide-react";

export default function BookingConfirmation() {
  const { bookingNumber } = useParams<{ bookingNumber: string }>();
  const { data: booking, isLoading } = useGetBooking(bookingNumber || "", { 
    query: { enabled: !!bookingNumber, queryKey: ["booking", bookingNumber] } 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Booking Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">We couldn't find a booking with reference {bookingNumber}.</p>
        <Link href="/"><Button className="bg-primary text-white hover:bg-primary/90">Return Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">Booking Confirmed</h1>
          <p className="text-xl text-muted-foreground">Thank you, {booking.customerName}. Your cleaning is scheduled.</p>
        </div>

        <Card className="bg-card border border-border rounded-xl overflow-hidden shadow-md">
          <div className="p-8">
            <div className="flex justify-between items-center border-b border-border pb-6 mb-6">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Reference Number</p>
                <p className="text-2xl font-mono font-extrabold text-foreground">{booking.bookingNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider">
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-1">
                  <h3 className="font-extrabold text-xl text-foreground mb-1">{new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                  <p className="text-muted-foreground text-lg">{booking.timeSlot}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded bg-background border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="pt-1">
                  <h3 className="font-extrabold text-xl text-foreground mb-1">{booking.address}</h3>
                  <p className="text-muted-foreground text-lg uppercase">{booking.postcode}</p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="font-bold text-lg text-foreground mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-foreground font-medium">{booking.serviceName}</span>
              </div>
              
              <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-foreground">Estimated Total</span>
                <span className="font-extrabold text-2xl text-foreground">£{(booking.totalGbp / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 p-6 flex flex-col sm:flex-row gap-4 justify-end border-t border-border">
            <Link href="/contact">
              <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-muted/60">Contact Support</Button>
            </Link>
            <Link href="/">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">Return to Home <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}