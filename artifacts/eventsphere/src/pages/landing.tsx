import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Link } from "wouter";

const mockEvents = [
  { id: 1, name: "TechSummit India 2026", category: "Technology", date: "15/08/2026", location: "Bengaluru", price: 2499, gradient: "from-blue-600 to-indigo-900" },
  { id: 2, name: "AI & Future Conference", category: "AI", date: "22/08/2026", location: "Mumbai", price: 3999, gradient: "from-purple-600 to-fuchsia-900" },
  { id: 3, name: "Startup Connect India", category: "Business", date: "05/09/2026", location: "Delhi", price: 1499, gradient: "from-emerald-600 to-teal-900" },
  { id: 4, name: "IndieMusic Fest 2026", category: "Music", date: "12/09/2026", location: "Pune", price: 799, gradient: "from-rose-600 to-pink-900" },
  { id: 5, name: "Data Science Summit", category: "Technology", date: "18/09/2026", location: "Hyderabad", price: 2999, gradient: "from-cyan-600 to-blue-900" },
  { id: 6, name: "National Education Expo", category: "Education", date: "25/09/2026", location: "Chennai", price: 0, gradient: "from-amber-500 to-orange-800" },
];

const categories = ["AI", "Technology", "Business", "Music", "Sports", "Education", "Networking"];

const testimonials = [
  { name: "Rahul Sharma", role: "Event Organizer", quote: "EventSphere completely transformed how we manage registrations. The AI insights helped us target the right audience.", initials: "RS" },
  { name: "Priya Patel", role: "Tech Enthusiast", quote: "Finding relevant AI conferences in Mumbai has never been this easy. The recommendations are spot on.", initials: "PP" },
  { name: "Arjun Desai", role: "Startup Founder", quote: "We ran our entire product launch event through EventSphere. Flawless execution from ticketing to analytics.", initials: "AD" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
              >
                Discover, Manage & <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Experience Events
                </span><br />
                Smarter with AI
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              >
                The ultimate AI-powered event management platform for organizers and attendees.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
              >
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  Explore Events
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Organize Event
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000"
            >
              <div className="relative w-full aspect-square md:aspect-video rounded-2xl glass-panel p-4 rotate-y-[-5deg] rotate-x-[5deg] transform-style-3d shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                {/* Mockup UI Elements */}
                <div className="h-full flex flex-col gap-4 relative z-10">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/20 rounded w-1/3" />
                      <div className="h-3 bg-white/10 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
                      <div className="h-3 bg-white/20 rounded w-1/2" />
                      <div className="text-2xl font-bold text-white mt-auto">₹45,000</div>
                      <div className="h-2 bg-primary/50 rounded w-full mt-2" />
                    </div>
                    <div className="glass-panel rounded-xl p-4 flex flex-col gap-2">
                      <div className="h-3 bg-white/20 rounded w-1/2" />
                      <div className="text-2xl font-bold text-white mt-auto">1,204</div>
                      <div className="h-2 bg-accent/50 rounded w-3/4 mt-2" />
                    </div>
                  </div>
                  <div className="glass-panel rounded-xl p-4 h-1/3">
                    <div className="h-3 bg-white/20 rounded w-1/4 mb-4" />
                    <div className="flex items-end gap-2 h-16">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -bottom-8 glass-panel rounded-xl p-4 w-48 shadow-2xl border-white/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">New Ticket</div>
                    <div className="text-xs text-white/50">Just now</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Bar */}
        <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Attendees", value: "50,000+" },
                { label: "Events", value: "5,000+" },
                { label: "Organizers", value: "1,000+" },
                { label: "Satisfaction", value: "98%" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">{stat.value}</div>
                  <div className="text-sm font-medium text-primary uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Explore Categories</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category} variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white glass-panel">
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-white">Featured Events</h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">View all</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass-panel overflow-hidden border-white/10 hover:border-primary/50 transition-colors group">
                    <div className={`h-40 w-full bg-gradient-to-br ${event.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                          {event.category}
                        </Badge>
                        <div className="text-xl font-bold text-white">
                          {event.price === 0 ? "Free" : `₹${event.price.toLocaleString('en-IN')}`}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4 line-clamp-1">{event.name}</h3>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-muted-foreground text-sm gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-white/10 text-white hover:bg-primary hover:text-white border-none" data-testid={`button-book-${event.id}`}>
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl border-white/10 flex flex-col gap-6"
              >
                <div className="text-muted-foreground flex-1 italic text-lg leading-relaxed">"{t.quote}"</div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}