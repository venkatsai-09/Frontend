import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Calendar, MapPin, Clock, Users, Share2, Heart, 
  Map as MapIcon, ChevronRight, CheckCircle2, User, PlayCircle, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvent } from '@/services/eventClient';
import { safeText, defaultTicketFromEvent } from '@/utils/renderUtils';

// Event data will be fetched from the backend by id

export default function EventDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [saved, setSaved] = useState(false);
  const { data: eventData, isLoading } = useEvent(id ?? null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (tId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [tId]: Math.max(0, (prev[tId] || 0) + delta)
    }));
  };

  const selectedTotal = Object.entries(quantities).reduce((acc, [tId, qty]) => {
    const ticketsSource = (eventData?.tickets && eventData.tickets.length) ? eventData.tickets : [defaultTicketFromEvent(eventData)];
    const ticket = ticketsSource.find((t: any) => t.id === tId);
    return acc + (ticket ? ticket.price * qty : 0);
  }, 0);

  const goToRegister = () => {
    // find first selected ticket (support one type at a time)
    const selected = Object.entries(quantities).find(([_, q]) => q > 0);
    let ticketId: string | null = null;
    let qty = 0;
    if (selected) {
      ticketId = selected[0];
      qty = selected[1];
    } else if ((eventData?.tickets || []).length === 1) {
      const t0 = eventData?.tickets?.[0];
      if (t0) {
        ticketId = t0.id;
        qty = 1;
      }
    }

    // For free events, allow proceeding even if nothing explicitly selected.
    if ((!ticketId || qty <= 0) && (eventData?.price || 0) === 0) {
      // Derive a default ticket id from event tickets if present, else use 'general'
      const defaultTicket = (eventData?.tickets && eventData.tickets.length > 0) ? eventData.tickets[0].id : 'general';
      ticketId = ticketId || defaultTicket;
      // if user didn't pick quantity, default to 1
      const sumQty = Object.values(quantities).reduce((s, v) => s + (v || 0), 0);
      qty = qty > 0 ? qty : (sumQty > 0 ? sumQty : 1);
    }

    // if nothing selected for paid events, don't navigate
    if (!ticketId || qty <= 0) return;

    setLocation(`/events/${id}/register?ticketId=${encodeURIComponent(ticketId)}&tickets=${qty}`);
  };

  // Safe display helpers: use utilities that avoid raw object rendering
  const organizerDisplay = safeText(eventData?.organizer, 'Organizer');
  const vAny = eventData?.venue as any;
  const venueDisplayName = safeText(vAny?.name ?? eventData?.venue, 'Venue');
  const venueDisplayAddress = safeText({ address: vAny?.address, city: vAny?.city }, '');

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
  <Navbar />
  {isLoading ? (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center text-muted-foreground">Loading event…</div>
  ) : !eventData ? (
    <div className="max-w-7xl mx-auto px-6 py-12 text-center text-muted-foreground">Event not found</div>
  ) : (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] mt-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-end pb-16 px-6 lg:px-12">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute top-6 right-6 flex gap-3 z-10">
          <Button variant="outline" size="icon" className="glass-panel border-white/20 hover:bg-white/20 rounded-full text-white">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="glass-panel border-white/20 hover:bg-white/20 rounded-full text-white"
            onClick={() => setSaved(!saved)}
          >
            <Heart className={`w-4 h-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Badge className="bg-primary/20 text-primary-foreground border-primary/30 mb-4 px-3 py-1 backdrop-blur-md">
            {eventData?.category}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            {eventData?.title}
          </h1>
          <p className="text-white/80 text-lg">by {organizerDisplay}</p>
        </div>
      </div>

      {/* Meta Row Card - Negative Margin on Desktop to overlap hero */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-12">
        <Card className="glass-panel border-white/10 shadow-2xl">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Date & Time</p>
                <p className="text-foreground font-semibold">{eventData?.date}</p>
                <p className="text-sm text-muted-foreground">{eventData?.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Location</p>
                <p className="text-foreground font-semibold line-clamp-1">{venueDisplayName}</p>
                <p className="text-sm text-blue-400 cursor-pointer hover:underline">Show on map</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Capacity</p>
                <p className="text-foreground font-semibold">{eventData?.capacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        {/* Left Column (Content) */}
        <div className="lg:col-span-2 space-y-16">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">About this event</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {(eventData?.description || '').split('\n\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Speakers */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(eventData?.speakers || []).map((speaker: any, i: number) => (
                <Card key={i} className="glass-panel border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Avatar className={`h-16 w-16 ${speaker.color || ''}`}>
                      <AvatarFallback className="text-white font-bold">{speaker.initials || speaker.name?.split(' ').map((s: string) => s[0]).slice(0,2).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{speaker.name}</h3>
                      <p className="text-primary text-sm font-medium">{speaker.role}</p>
                      <p className="text-muted-foreground text-sm">{speaker.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Agenda */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Agenda</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {(eventData?.agenda || []).map((item: any, i: number) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white/10 bg-card text-muted-foreground group-hover:text-primary group-hover:border-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg transition-colors z-10 ml-0 md:ml-auto">
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] glass-panel p-4 rounded-xl border-white/5 ml-4 md:ml-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{item.time}</span>
                      <Badge variant="outline" className="ml-auto text-xs">{item.type}</Badge>
                    </div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location Map Placeholder */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Location</h2>
            <div className="glass-panel border-white/5 rounded-2xl p-2 relative h-64 overflow-hidden flex flex-col items-center justify-center group">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDAuNWg0MG0tNDAgMzlINDBNMCAuNXYzOW0zOS0zOVY0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              <div className="z-10 bg-background/80 backdrop-blur-xl p-4 rounded-xl border border-white/10 text-center shadow-2xl transition-transform group-hover:scale-105">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-foreground mb-1">{venueDisplayName}</p>
                <p className="text-sm text-muted-foreground mb-1">{venueDisplayAddress}</p>
                <Button variant="link" className="text-primary h-auto p-0">Open in Google Maps <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {(eventData?.faqs || []).map((faq: any, i: number) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Attendee Reviews</h2>
            <div className="grid gap-4">
              {(eventData?.reviews || []).map((review: any, i: number) => (
                <Card key={i} className="glass-panel border-white/5 bg-transparent">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-white/10">
                          <User className="w-5 h-5 m-auto text-white/50" />
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-4 h-4 ${j < review.rating ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic text-sm">"{review.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (Tickets Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6 hidden lg:block">
            <h3 className="text-2xl font-bold text-foreground mb-6">Select Tickets</h3>
            {((eventData?.tickets && eventData?.tickets.length) ? eventData.tickets : [defaultTicketFromEvent(eventData)]).map((ticket: any) => (
              <Card key={ticket.id} className={`glass-panel transition-all ${quantities[ticket.id] > 0 ? "border-primary/50 bg-primary/5" : "border-white/10"}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">{ticket.name}</h4>
                      <p className="text-xl font-bold text-primary">₹{ticket.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1 border border-white/5">
                      <button 
                        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 text-foreground transition-colors disabled:opacity-50"
                        onClick={() => updateQuantity(ticket.id, -1)}
                        disabled={!quantities[ticket.id]}
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-medium text-foreground">{quantities[ticket.id] || 0}</span>
                      <button 
                        className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 text-foreground transition-colors"
                        onClick={() => updateQuantity(ticket.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{ticket.desc}</p>
                </CardContent>
              </Card>
            ))}

            <Separator className="bg-white/10 my-6" />
              <div className="glass-panel p-6 rounded-2xl border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">₹{selectedTotal}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-6 text-lg shadow-lg shadow-primary/25"
                // free events should always be enabled; paid events require a selection
                disabled={((eventData?.price || 0) > 0) ? (selectedTotal === 0) : false}
                onClick={goToRegister}
              >
                {((eventData?.price || 0) > 0) ? 'Checkout' : 'Register Free'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 p-4 z-50 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div>
          <p className="text-sm text-muted-foreground">Starts from</p>
          <p className="text-xl font-bold text-foreground">₹{eventData?.tickets?.[0]?.price || '—'}</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-blue-600 px-8" onClick={goToRegister}>
          {((eventData?.price || 0) > 0) ? 'Get Tickets' : 'Register Free'}
        </Button>
      </div>
    </>
  )}
    </div>
  );
}