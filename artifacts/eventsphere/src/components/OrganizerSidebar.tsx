import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, PlusCircle, CalendarDays, Users, BarChart3, 
  Sparkles, CreditCard, Settings, Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/organizer" },
  { name: "Scanner", icon: Search, href: "/organizer/scanner" },
  { name: "Create Event", icon: PlusCircle, href: "/organizer/create-event" },
  { name: "Manage Events", icon: CalendarDays, href: "/organizer/manage" },
  { name: "History", icon: CalendarDays, href: "/organizer/history" },
  { name: "Attendees", icon: Users, href: "/organizer/attendees" },
  { name: "Analytics", icon: BarChart3, href: "/organizer/analytics" },
  { name: "Profile", icon: Users, href: "/organizer/profile" },
  { name: "AI Tools", icon: Sparkles, href: "/organizer/ai-tools" },
  { name: "Payments", icon: CreditCard, href: "/organizer/payments" },
];

export function OrganizerSidebar() {
  const [location] = useLocation();

  // Helper to determine if a route is active
  // Match exact or prefix if it's a sub-route, for simplicity just exact match or starts with
  const isActive = (href: string) => {
    if (href === "/organizer") {
      return location === "/organizer";
    }
    return location.startsWith(href);
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          EventSphere
        </h1>
        <Badge variant="outline" className="mt-1 border-primary/50 text-primary/80">Organizer</Badge>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <item.icon className={`w-5 h-5 ${active ? "text-primary-foreground" : ""}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
          <Avatar className="h-10 w-10 border border-primary/50">
            <AvatarFallback className="bg-primary/20 text-primary">RM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Rahul Mehta</p>
            <p className="text-xs text-primary/80 truncate">Pro Organizer</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
