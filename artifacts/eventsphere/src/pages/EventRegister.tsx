import { useState, useMemo, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Ticket, Calendar, MapPin } from "lucide-react";
import { useEvent } from '@/services/eventClient';
import { safeText, defaultTicketFromEvent } from '@/utils/renderUtils';
import { createTicket } from '@/services/ticketClient';
import { useAuth } from '@/contexts/AuthContext';
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

  // determine selected ticket and read query params
  const { data: event, isLoading } = useEvent(id ?? null);
  const { user } = useAuth();

  // ticket options (fallback to single general ticket using event.price)
  const ticketOptions = event?.tickets || (event ? [{ id: 'general', name: 'General', price: event?.price || 0 }] : []);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // read query params for preselected ticket and quantity
  useEffect(() => {
    try {
      const qp = new URLSearchParams(window.location.search);
      const preTicketId = qp.get('ticketId');
      const preTickets = parseInt(qp.get('tickets') || '') || 0;
      if (preTickets > 0) setFormData(prev => ({ ...prev, tickets: preTickets }));
      if (preTicketId) setSelectedTicketId(preTicketId);
    } catch (e) {
      // ignore
    }
  }, []);

  // default to first ticket option when available
  useEffect(() => {
    if (!selectedTicketId && ticketOptions && ticketOptions.length > 0) {
      setSelectedTicketId(ticketOptions[0].id);
    }
  }, [ticketOptions, selectedTicketId]);

  const selectedTicket = useMemo(() => ticketOptions.find((t:any) => t.id === selectedTicketId) || ticketOptions[0] || null, [ticketOptions, selectedTicketId]);

  const totalAmount = (selectedTicket?.price || 0) * formData.tickets;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        // simulate payment if needed
        if ((event?.price || 0) > 0) {
          // Simulate payment success (could show a modal or external flow)
          // For demo: small timeout
          await new Promise((res) => setTimeout(res, 800));
        }

        const attendeeName = formData.name || user?.name || 'Guest User';
        const attendeeEmail = formData.email || user?.email || '';

        const { ticketId } = await createTicket({
          eventId: id as string,
          eventTitle: event?.title || '',
          attendeeName,
          attendeeEmail,
          ticketType: selectedTicket?.id || 'general',
          ticketName: selectedTicket?.name || 'General',
          unitPrice: selectedTicket?.price || 0,
          quantity: formData.tickets,
          totalPrice: (selectedTicket?.price || 0) * formData.tickets,
        });

        // Navigate to success page - pass ticket id in query if desired
        setLocation('/ticket-success');
      } catch (err) {
        console.error('Registration error', err);
      }
    })();
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
                      placeholder="you@example.com"
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

                  {/* Ticket Type Selector (if multiple) */}
                  {ticketOptions.length > 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="ticketType">Ticket Type</Label>
                      <div className="flex gap-2">
                        {ticketOptions.map((t: any) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTicketId(t.id)}
                            className={`px-3 py-2 rounded-md border ${selectedTicketId === t.id ? 'border-primary bg-primary/5' : 'border-white/10'} text-foreground`}
                          >
                            {t.name} - ₹{t.price}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button type="submit" disabled={isLoading} className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    {isLoading ? 'Loading…' : ((event?.price || 0) > 0 ? `Buy Ticket - ₹${totalAmount}` : "Register Free")}
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
                      <p className="font-medium text-foreground">{event?.date}</p>
                      <p className="text-muted-foreground text-xs">Starting at 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{safeText((event?.venue as any)?.name ?? event?.venue, 'Venue TBD')}</p>
                      <p className="text-muted-foreground text-xs">{safeText((event?.venue as any)?.city, '') || 'Show on map'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ticket Price</span>
                    <span className="text-foreground font-medium">₹{event?.price ?? 0}</span>
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
