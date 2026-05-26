import { useState } from "react";
import { Link } from "wouter";
import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Wand2, Search, MapPin, Calendar, IndianRupee, Tag, Loader2, ArrowLeft, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const DISCOVERY_RESULTS = [
  { id: 2, title: "Startup Connect India", category: "Business", date: "22/08/2026", location: "Mumbai", price: 1499, rating: 4.6, gradient: "from-orange-500 to-pink-500" },
  { id: 4, title: "Business Leaders Meet", category: "Business", date: "12/09/2026", location: "Pune", price: 2999, rating: 4.5, gradient: "from-indigo-500 to-purple-700" },
  { id: 9, title: "Sports Tech India", category: "Sports", date: "14/10/2026", location: "Mumbai", price: 999, rating: 4.5, gradient: "from-lime-500 to-green-700" },
  { id: 11, title: "Entrepreneurs Networking", category: "Networking", date: "26/10/2026", location: "Pune", price: 599, rating: 4.6, gradient: "from-pink-500 to-rose-600" },
];

export default function AttendeeAIDiscovery() {
  const [phase, setPhase] = useState<"input" | "loading" | "results">("input");

  const handleDiscover = () => {
    setPhase("loading");
    setTimeout(() => {
      setPhase("results");
    }, 2000);
  };

  return (
    <AttendeeLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Wand2 className="text-primary w-8 h-8" />
            AI Discovery
          </h1>
          <p className="text-muted-foreground">Describe your perfect event and let our AI find it for you</p>
        </div>

        {phase === "input" && (
          <Card className="glass-panel border-white/10 shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label>What type of event are you looking for?</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea 
                    className="w-full min-h-[100px] bg-muted/50 border-none rounded-xl pl-10 p-3 focus:ring-1 focus:ring-primary outline-none" 
                    placeholder="e.g. A tech networking event with focus on AI and cloud computing..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred city</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-muted/50 border-none h-11" placeholder="Mumbai, Pune, etc." />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date range</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-muted/50 border-none h-11" placeholder="Next 3 months" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Budget (₹)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-muted/50 border-none h-11" placeholder="Max ₹5,000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-muted/50 border-none h-11" placeholder="Startups, Networking" />
                </div>
              </div>
            </div>
            <Button onClick={handleDiscover} className="w-full mt-8 h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group">
              Discover Events
              <Wand2 className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </Card>
        )}

        {phase === "loading" && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Discovery in progress...</h3>
              <p className="text-muted-foreground">Our AI is scanning thousands of events to find your perfect match</p>
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Top Matches</h2>
              <Button variant="ghost" onClick={() => setPhase("input")} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Search
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISCOVERY_RESULTS.map(event => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="glass-panel overflow-hidden flex flex-col group border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                    <div className={`h-40 bg-gradient-to-br ${event.gradient} relative`}>
                      <Badge className="absolute top-4 left-4 bg-background/50 backdrop-blur-md text-foreground border-none">
                        {event.category}
                      </Badge>
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> 98% Match
                      </div>
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
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="font-semibold text-lg text-foreground">
                        ₹{event.price}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AttendeeLayout>
  );
}
