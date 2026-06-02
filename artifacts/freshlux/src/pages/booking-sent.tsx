import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/contact-info";
import { openWhatsAppWithMessage } from "@/lib/whatsapp-booking";

function getPendingMessage(): string {
  const stored = sessionStorage.getItem("pendingWhatsAppMessage");
  if (stored) return stored;
  return "Hi, I would like to book a carpet cleaning.";
}

export default function BookingSent() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#25D366]">
          <MessageCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Almost Done</h1>
        <p className="text-lg text-muted-foreground mb-8">
          WhatsApp should have opened with your booking details. Please tap <strong>Send</strong> in WhatsApp to
          send your request to {CONTACT.whatsappDisplay}.
        </p>

        <Card className="p-6 bg-card border border-border rounded-xl text-left mb-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your booking is only complete once you send the WhatsApp message. If WhatsApp did not open, use the
            button below or contact us at{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary font-semibold hover:underline">
              {CONTACT.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${CONTACT.phoneTel}`} className="text-primary font-semibold hover:underline">
              {CONTACT.phone}
            </a>
            .
          </p>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
            onClick={() => openWhatsAppWithMessage(getPendingMessage())}
          >
            Open WhatsApp Again
          </Button>
          <Link href="/">
            <Button variant="outline">
              Return Home <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
