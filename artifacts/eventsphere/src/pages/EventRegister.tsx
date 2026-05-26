import { useState, useMemo } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Ticket, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EventRegister() {
  const [, params] = useRoute("/events/:id/register");
  const [, setLocation] = useLocation();
  const id = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  // Mock event data - in a real app this would come from an API
  const event = useMemo(() => {
    const isPaid = id === "1" || id === "2" || id === "3";
    return {
      id,
      title: "Global Tech Summit 2024",
      date: "March 15, 2024",
      venue: "Grand Convention Center, Mumbai",
      isPaid,
      price: isPaid ? 999 : 0,
    };
  }, [id]);

  const totalAmount = event.price * formData.tickets;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event.isPaid) {
      // Store checkout info in session/state and navigate to payment
      setLocation("/payment");
    } else {
      // Direct registration for free events
      setLocation("/ticket-success");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-12 px-4">
        <Button 
          variant="ghost" 
          onClick={() => setLocation(`/events/${id}`)}
          className="mb-8 hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Event
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Register for Event</CardTitle>
                <CardDescription>Fill in your details to secure your spot</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tickets">Number of Tickets</Label>
                    <Input
                      id="tickets"
                      name="tickets"
                      type="number"
                      min="1"
                      value={formData.tickets}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    {event.isPaid ? `Buy Ticket - ₹${totalAmount}` : "Register Now"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Event Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{event.date}</p>
                      <p className="text-muted-foreground text-xs">Starting at 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{event.venue}</p>
                      <p className="text-muted-foreground text-xs">Show on map</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ticket Price</span>
                    <span className="text-foreground font-medium">₹{event.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="text-foreground font-medium">x {formData.tickets}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-xs text-primary/90 leading-relaxed">
                    Tickets are non-refundable but can be transferred to another attendee.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
