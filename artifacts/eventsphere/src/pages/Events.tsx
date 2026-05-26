import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Search, Filter, MapPin, Calendar, Star, Heart, 
  Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";

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

const CATEGORIES = ["All", "AI", "Technology", "Business", "Music", "Sports", "Education", "Networking"];
const CITIES = ["All Cities", "Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata"];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([10000]);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedEvents(prev => prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground">Reset</Button>
      </div>

      <div className="space-y-3">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <Badge 
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Date</Label>
        <RadioGroup defaultValue="any">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="date-any" />
            <Label htmlFor="date-any">Any Date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="today" id="date-today" />
            <Label htmlFor="date-today">Today</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="date-week" />
            <Label htmlFor="date-week">This Week</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="date-month" />
            <Label htmlFor="date-month">This Month</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>City</Label>
        <Select defaultValue="All Cities">
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Max Price</Label>
          <span className="text-sm text-muted-foreground">₹{priceRange[0]}</span>
        </div>
        <Slider 
          value={priceRange} 
          onValueChange={setPriceRange} 
          max={10000} 
          step={100}
        />
      </div>

      <div className="space-y-3">
        <Label>Type</Label>
        <ToggleGroup type="single" defaultValue="all" className="justify-start">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="free">Free</ToggleGroupItem>
          <ToggleGroupItem value="paid">Paid</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 px-6 sm:px-12 bg-card border-b border-border">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Discover Events
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              className="w-full h-14 pl-12 pr-4 text-lg bg-background/50 backdrop-blur-sm border-white/10 shadow-lg rounded-2xl focus-visible:ring-primary" 
              placeholder="Search events, cities or categories..." 
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 flex gap-8 relative items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 glass-panel p-6 rounded-2xl">
          <FilterSidebar />
        </aside>

        {/* Mobile Filter Trigger */}
        <div className="lg:hidden absolute top-0 right-6 -mt-14 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="glass-panel backdrop-blur-md">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass-panel w-[300px] sm:w-[350px] overflow-y-auto">
              <div className="mt-8">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_EVENTS.map(event => (
              <Card key={event.id} className="glass-panel overflow-hidden flex flex-col group border-white/5 hover:border-primary/50 transition-all duration-300">
                <div className={`h-40 bg-gradient-to-br ${event.gradient} relative`}>
                  <Badge className="absolute top-4 left-4 bg-background/50 backdrop-blur-md text-foreground border-none">
                    {event.category}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 bg-background/50 backdrop-blur-md hover:bg-background/80 text-foreground border-none rounded-full h-8 w-8"
                    onClick={() => toggleSave(event.id)}
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

                <CardFooter className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="w-full flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-foreground">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" className="w-full border-white/20 hover:bg-white/10" asChild>
                      <Link href={`/events/${event.id}`}>View Details</Link>
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Register
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}