import { useLocation } from "wouter";
import { Check, Download, Home, Calendar, MapPin, User, Ticket as TicketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketSuccess() {
  const [, setLocation] = useLocation();

  const ticketData = {
    eventName: "Global Tech Summit 2024",
    attendeeName: "Rahul Mehta",
    date: "March 15, 2024",
    venue: "Grand Convention Center, Mumbai",
    ticketId: "#EVT-8291-XL",
    type: "Regular Entry",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Success Checkmark */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in zoom-in duration-500">
            <Check className="w-12 h-12 text-white stroke-[3px]" />
          </div>
          <div className="absolute -inset-4 border-2 border-green-500/20 rounded-full animate-ping duration-1000" />
        </div>

        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Registration Successful!
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Your ticket has been sent to your email. You can also download it here.
        </p>

        {/* Ticket Card */}
        <Card className="mb-12 border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden text-left relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-600" />
          
          <CardContent className="p-0">
            <div className="p-8 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3">
                    {ticketData.type}
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{ticketData.eventName}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {ticketData.date}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Attendee</span>
                    <p className="font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> {ticketData.attendeeName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Ticket ID</span>
                    <p className="font-medium flex items-center gap-2 text-primary">
                      <TicketIcon className="w-4 h-4" /> {ticketData.ticketId}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Venue</span>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {ticketData.venue}
                  </p>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-32 h-32 relative bg-white">
                  {/* Grid pattern for mock QR */}
                  <div className="grid grid-cols-8 grid-rows-8 gap-0.5 w-full h-full opacity-90">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'} rounded-[1px]`} 
                      />
                    ))}
                  </div>
                  {/* QR Core boxes */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-[3px] border-black bg-white flex items-center justify-center p-1">
                    <div className="w-full h-full bg-black" />
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-[3px] border-black bg-white flex items-center justify-center p-1">
                    <div className="w-full h-full bg-black" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-[3px] border-black bg-white flex items-center justify-center p-1">
                    <div className="w-full h-full bg-black" />
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-black font-bold tracking-widest uppercase">Scan at Entrance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="h-12 px-8 font-semibold bg-white text-black hover:bg-white/90 gap-2">
            <Download className="w-5 h-5" />
            Download Ticket (PDF)
          </Button>
          <Button 
            variant="outline" 
            className="h-12 px-8 font-semibold border-white/10 bg-white/5 hover:bg-white/10 gap-2"
            onClick={() => setLocation("/attendee")}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
