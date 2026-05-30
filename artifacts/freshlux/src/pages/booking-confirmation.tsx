import { useParams, Link } from "wouter";
import { useGetBooking } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, Loader2 } from "lucide-react";

export default function BookingConfirmation() {
  const { bookingNumber } = useParams<{ bookingNumber: string }>();
  const { data: booking, isLoading } = useGetBooking(bookingNumber || "", { 
    query: { enabled: !!bookingNumber, queryKey: ["booking", bookingNumber] } 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-accent" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Booking Not Found</h1>
        <p className="text-white/60 mb-8">We couldn't find a booking with reference {bookingNumber}.</p>
        <Link href="/"><Button>Return Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      {/* Confetti effect background elements could go here */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Booking Confirmed!</h1>
          <p className="text-xl text-white/60">Thank you, {booking.customerName}. Your cleaning is scheduled.</p>
        </motion.div>

        <Card className="p-8 bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
            <div>
              <p className="text-sm text-white/40 font-medium">Reference Number</p>
              <p className="text-xl font-mono font-bold text-accent">{booking.bookingNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/40 font-medium">Status</p>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold capitalize">
                {booking.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-lg">{new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <p className="text-white/60">{booking.timeSlot}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-lg">{booking.address}</h3>
                <p className="text-white/60">{booking.postcode}</p>
              </div>
            </div>
          </div>

          <div className="bg-background/50 rounded-xl p-6 border border-white/5">
            <h3 className="font-bold mb-4 text-lg">Order Summary</h3>
            <p className="text-white/80 font-medium mb-4">{booking.serviceName}</p>
            
            <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center font-bold text-lg">
              <span>Total Paid</span>
              <span>£{(booking.totalGbp / 100).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="border-white/20 text-white">Add to Calendar</Button>
          <Link href="/"><Button className="bg-primary hover:bg-primary/90 text-white">Return to Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
