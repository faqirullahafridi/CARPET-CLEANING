import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Have a question? We're here to help seven days a week.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-md border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Call Us</h3>
                <p className="text-white/60 text-sm mb-2">Mon-Sun, 8am to 8pm</p>
                <a href="tel:08001234567" className="text-xl font-medium hover:text-accent transition-colors">0800 123 4567</a>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-md border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                <p className="text-white/60 text-sm mb-2">We reply within 2 hours</p>
                <a href="mailto:hello@freshlux.co.uk" className="text-lg font-medium hover:text-accent transition-colors">hello@freshlux.co.uk</a>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-md border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Service Areas</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  London, Manchester, Birmingham, Leeds, Bristol, and surrounding areas.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-xl border-white/10 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background/50 border-white/10" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-background/50 border-white/10" {...field} />
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="07700 900000" className="bg-background/50 border-white/10" {...field} />
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
                          <FormLabel>Subject (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" className="bg-background/50 border-white/10" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please describe your enquiry..." className="bg-background/50 border-white/10 min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={submitContact.isPending} className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white">
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
