import { useState } from "react";
import { Link } from "wouter";
import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Search, Filter, MapPin, Calendar, Star, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_EVENTS = [
  { id: 1, title: "AI Summit 2026", category: "AI", date: "15/08/2026", location: "Bengaluru", price: 2499, rating: 4.8, gradient: "from-blue-600 to-violet-600" },
  { id: 2, title: "Startup Connect India", category: "Business", date: "22/08/2026", location: "Mumbai", price: 1499, rating: 4.6, gradient: "from-orange-500 to-pink-500" },
  { id: 3, title: "Future of Robotics", category: "Technology", date: "05/09/2026", location: "Delhi", price: 3999, rating: 4.9, gradient: "from-emerald-500 to-teal-700" },
  { id: 4, title: "Business Leaders Meet", category: "Business", date: "12/09/2026", location: "Pune", price: 2999, rating: 4.5, gradient: "from-indigo-500 to-purple-700" },
  { id: 5, title: "Tech Innovators Conference", category: "Technology", date: "18/09/2026", location: "Hyderabad", price: 1999, rating: 4.7, gradient: "from-cyan-500 to-blue-600" },
  { id: 6, title: "IndieMusic Fest 2026", category: "Music", date: "25/09/2026", location: "Chennai", price: 799, rating: 4.4, gradient: "from-rose-500 to-red-700" },
  { id: 7, title: "Data Science Summit", category: "Technology", date: "02/10/2026", location: "Bengaluru", price: 2499, rating: 4.8, gradient: "from-fuchsia-500 to-cyan-600" },
  { id: 8, title: "National Education Expo", category: "Education", date: "08/10/2026", location: "Delhi", price: 0, rating: 4.3, gradient: "from-amber-400 to-orange-600" },
  { id: 9, title: "Sports Tech India", category: "Sports", date: "14/10/2026", location: "Mumbai", price: 999, rating: 4.5, gradient: "from-lime-500 to-green-700" },
  { id: 10, title: "AI & Machine Learning Con", category: "AI", date: "20/10/2026", location: "Hyderabad", price: 3499, rating: 4.9, gradient: "from-violet-500 to-fuchsia-700" },
  { id: 11, title: "Entrepreneurs Networking", category: "Networking", date: "26/10/2026", location: "Pune", price: 599, rating: 4.6, gradient: "from-pink-500 to-rose-600" },
  { id: 12, title: "Cloud Computing Summit", category: "Technology", date: "01/11/2026", location: "Chennai", price: 1799, rating: 4.7, gradient: "from-blue-500 to-indigo-700" },
];

export default function AttendeeHome() {
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

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
          {MOCK_EVENTS.map(event => (
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
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">{event.title}</h3>
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
