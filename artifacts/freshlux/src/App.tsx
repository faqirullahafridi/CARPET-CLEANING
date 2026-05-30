import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "./components/layout";
import NotFound from "@/pages/not-found";

// Import pages (we will create these)
import Home from "./pages/home";
import Book from "./pages/book";
import Quote from "./pages/quote";
import Services from "./pages/services";
import BookingConfirmation from "./pages/booking-confirmation";
import Contact from "./pages/contact";
import About from "./pages/about";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/quote" component={Quote} />
        <Route path="/services" component={Services} />
        <Route path="/booking-confirmation/:bookingNumber" component={BookingConfirmation} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
