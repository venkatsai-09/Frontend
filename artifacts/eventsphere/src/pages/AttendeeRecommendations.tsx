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
import { useFetch } from "@/lib/backend";

export default function AttendeeRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const { data: recommendations, isLoading: fetching, refresh } = useFetch<Array<any>>(showRecommendations ? "/api/recommendations" : null);

  const loadRecommendations = () => {
    setIsLoading(true);
    setShowRecommendations(true);
    // trigger fetch
    refresh();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
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
            {fetching ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">Loading recommendations…</div>
            ) : (!recommendations || recommendations.length === 0) ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">No recommendations available yet</div>
            ) : (
              recommendations.map((event: any) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="glass-panel overflow-hidden flex flex-col group border-white/5 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                    <div className={`h-40 bg-gradient-to-br ${event.gradient || ''} relative`}>
                      <Badge className="absolute top-4 left-4 bg-background/50 backdrop-blur-md text-foreground border-none">
                        {event.category}
                      </Badge>
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
                        ₹{event.price}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Register
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </AttendeeLayout>
  );
}
