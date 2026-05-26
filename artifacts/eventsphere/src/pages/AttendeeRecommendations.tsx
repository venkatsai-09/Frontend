import { useState } from "react";
import { Link } from "wouter";
import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Sparkles, Calendar, MapPin, Star, Heart, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Empty } from "@/components/ui/empty";

const RECOMMENDATIONS = [
  { id: 1, title: "AI Summit 2026", category: "AI", date: "15/08/2026", location: "Bengaluru", price: 2499, rating: 4.8, gradient: "from-blue-600 to-violet-600" },
  { id: 7, title: "Data Science Summit", category: "Technology", date: "02/10/2026", location: "Bengaluru", price: 2499, rating: 4.8, gradient: "from-fuchsia-500 to-cyan-600" },
  { id: 10, title: "AI & Machine Learning Con", category: "AI", date: "20/10/2026", location: "Hyderabad", price: 3499, rating: 4.9, gradient: "from-violet-500 to-fuchsia-700" },
];

export default function AttendeeRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const loadRecommendations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowRecommendations(true);
    }, 1500);
  };

  return (
    <AttendeeLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
          <p className="text-muted-foreground">Personalized event suggestions based on your interests</p>
        </div>

        {!showRecommendations ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card/30 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-8">
              Register for events to get AI-powered recommendations tailored to your taste.
            </p>
            <Button onClick={loadRecommendations} disabled={isLoading} className="min-w-[200px]">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Preferences...
                </>
              ) : (
                "Load Recommendations"
              )}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {RECOMMENDATIONS.map(event => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="glass-panel overflow-hidden flex flex-col group border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <div className={`h-40 bg-gradient-to-br ${event.gradient} relative`}>
                    <Badge className="absolute top-4 left-4 bg-background/50 backdrop-blur-md text-foreground border-none">
                      {event.category}
                    </Badge>
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
                      ₹{event.price}
                    </span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AttendeeLayout>
  );
}
