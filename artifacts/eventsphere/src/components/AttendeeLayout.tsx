import { Link, useLocation } from "wouter";
import { 
  Search, Home, Sparkles, Wand2, User, History, 
  Menu, X, Bell, LogOut, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sheet, SheetContent, SheetTrigger 
} from "@/components/ui/sheet";
import { useState } from "react";

interface AttendeeLayoutProps {
  children: React.ReactNode;
}

export function AttendeeLayout({ children }: AttendeeLayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "/attendee" },
    { icon: Sparkles, label: "Recommendations", href: "/attendee/recommendations" },
    { icon: Wand2, label: "AI Discovery", href: "/attendee/ai-discovery" },
    { icon: User, label: "Profile", href: "/attendee/profile" },
    { icon: History, label: "History", href: "/attendee/history" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">EventSphere</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"}
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-3 px-3 py-2 rounded-xl">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border shrink-0 sticky top-0 h-screen bg-card">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 glass-panel border-r border-white/10">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <Link href="/" className="lg:hidden flex items-center gap-2">
              <Sparkles className="text-primary w-6 h-6" />
              <span className="text-lg font-bold">EventSphere</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search events..." 
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            </Button>
            <div className="flex items-center gap-3 pl-2 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground">Attendee</p>
              </div>
              <Avatar className="h-9 w-9 border border-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
