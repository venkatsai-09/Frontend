import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Calendar, MapPin, QrCode, Ticket, CheckCircle2, Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PAST_EVENTS = [
  { 
    id: 1, 
    title: "AI Summit 2026", 
    date: "15/08/2026", 
    location: "Bengaluru, KA", 
    ticketType: "VIP Pass",
    status: "Upcoming",
    idCode: "EVT-8291-A"
  },
  { 
    id: 5, 
    title: "Tech Innovators Conference", 
    date: "18/07/2026", 
    location: "Hyderabad, TS", 
    ticketType: "General Access",
    status: "Attended",
    idCode: "EVT-7102-C"
  },
  { 
    id: 2, 
    title: "Startup Connect India", 
    date: "22/06/2026", 
    location: "Mumbai, MH", 
    ticketType: "Early Bird",
    status: "Attended",
    idCode: "EVT-6543-B"
  },
];

export default function AttendeeHistory() {
  return (
    <AttendeeLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
          <p className="text-muted-foreground">Manage your tickets and past event attendances</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {PAST_EVENTS.map(event => (
            <Card key={event.id} className="glass-panel border-white/10 overflow-hidden group hover:border-primary/30 transition-all">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Event Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant={event.status === "Upcoming" ? "default" : "secondary"} className="mb-2">
                          {event.status === "Upcoming" ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {event.status}
                        </Badge>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Ticket ID</p>
                        <p className="font-mono text-sm">{event.idCode}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Ticket className="w-4 h-4 mr-2 text-primary/70" />
                        <span className="text-sm">{event.ticketType}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <Button variant="outline" size="sm" className="bg-background/50">View Details</Button>
                      <Button variant="outline" size="sm" className="bg-background/50">Download Invoice</Button>
                    </div>
                  </div>

                  {/* Right: QR Code Placeholder */}
                  <div className="w-full md:w-48 bg-muted/30 border-t md:border-t-0 md:border-l border-white/10 flex flex-col items-center justify-center p-6 space-y-3">
                    <div className="w-24 h-24 bg-card rounded-xl border border-white/10 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                      <div className="grid grid-cols-4 gap-1 p-2 opacity-40">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`} />
                        ))}
                      </div>
                      <QrCode className="w-8 h-8 text-primary absolute" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs h-8">View QR Code</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AttendeeLayout>
  );
}
