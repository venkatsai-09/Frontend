import { useState } from "react";
import { Link } from "wouter";
import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Search, Filter, MapPin, Calendar, Star, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useFetch } from "@/lib/backend";

export default function AttendeeHome() {
  const [savedEvents, setSavedEvents] = useState<number[]>([]);
  const { data: events, isLoading } = useFetch<Array<any>>("/api/events");

  const toggleSave = (id: number) => {
    setSavedEvents(prev => prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]);
  };

  return (
    <AttendeeLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
            <p className="text-muted-foreground">Find and register for upcoming events near you</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {isLoading && (
            <div className="col-span-full text-center py-20 text-muted-foreground">Loading events…</div>
          )}

          {!isLoading && (!events || events.length === 0) && (
            <div className="col-span-full text-center py-20 text-muted-foreground">No events available yet</div>
          )}

          {!isLoading && events && events.length > 0 && events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card className="glass-panel overflow-hidden flex flex-col group border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                <div className={`h-40 bg-gradient-to-br ${event.gradient} relative`}>
                  <Badge className="absolute top-4 left-4 bg-background/50 backdrop-blur-md text-foreground border-none">
                    {event.category}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 bg-background/50 backdrop-blur-md hover:bg-background/80 text-foreground border-none rounded-full h-8 w-8"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSave(event.id);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${savedEvents.includes(event.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                
                <CardContent className="pt-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">{event.title || event.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary/70" /> {event.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary/70" /> {event.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" /> {event.rating}/5
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="font-semibold text-lg text-foreground">
                    {event.price === 0 ? "Free" : `₹${event.price}`}
                  </span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AttendeeLayout>
  );
}
