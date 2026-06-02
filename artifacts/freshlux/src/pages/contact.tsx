import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Loader2, MessageCircle } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { SITE_IMAGES } from "@/lib/site-images";
import { CONTACT } from "@/lib/contact-info";
import { openWhatsAppChat } from "@/lib/whatsapp-booking";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", email: "", phone: "", subject: "", message: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="relative mb-20 overflow-hidden rounded-2xl border border-border min-h-[220px] md:min-h-[280px] flex items-center justify-center text-center">
          <img
            src={SITE_IMAGES.gallery.teamVan}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#081120]/75" />
          <div className="relative z-10 px-6 py-12 max-w-2xl">
            <div className="text-[#22D3EE] text-sm font-bold tracking-widest uppercase mb-4">
              Customer Support
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Get in Touch</h1>
            <p className="text-lg text-slate-200 font-medium">Have a question? We&apos;re here to help seven days a week.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-1">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Contact Details</h2>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-primary shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground text-sm mb-2">Mon-Sun, 8am to 8pm</p>
                <a href={`tel:${CONTACT.phoneTel}`} className="text-lg font-bold text-primary hover:text-foreground transition-colors">{CONTACT.phone}</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-primary shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-2">We reply within 2 hours</p>
                <a href={`mailto:${CONTACT.email}`} className="text-lg font-bold text-primary hover:text-foreground transition-colors break-all">{CONTACT.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Service Areas</h3>
                <p className="text-muted-foreground leading-relaxed">
                  London, Manchester, Birmingham, Leeds, Bristol, and surrounding areas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded bg-card border border-border flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-2">Fastest way to book or ask a question</p>
                <button
                  type="button"
                  onClick={() => openWhatsAppChat("Hi, I would like to enquire about carpet cleaning.")}
                  className="text-lg font-bold text-[#25D366] hover:text-foreground transition-colors"
                >
                  {CONTACT.whatsappDisplay}
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border aspect-[4/3] hidden lg:block">
              <img
                src={SITE_IMAGES.gallery.stairs}
                alt="Freshly cleaned stairs and carpet"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 md:p-12 bg-card border border-border rounded-xl shadow-md">
              <h2 className="text-2xl font-extrabold text-foreground mb-8">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background border-border h-12 text-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background border-border h-12 text-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder={CONTACT.phone} className="bg-background border-border h-12 text-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Subject (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" className="bg-background border-border h-12 text-foreground" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please describe your enquiry..." className="bg-background border-border min-h-[150px] resize-y text-foreground p-4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={submitContact.isPending} className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-lg">
                    {submitContact.isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}