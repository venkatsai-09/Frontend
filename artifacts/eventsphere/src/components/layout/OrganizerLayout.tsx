import { ReactNode } from "react";
import { Search, Bell, Menu, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OrganizerSidebar } from "@/components/OrganizerSidebar";
import { Link } from "wouter";

interface OrganizerLayoutProps {
  children: ReactNode;
  title: string;
}

export function OrganizerLayout({ children, title }: OrganizerLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[240px] shrink-0 border-r border-white/10 bg-card/50 backdrop-blur-xl z-20">
        <OrganizerSidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/4" />

        {/* Top Header */}
        <header className="h-16 px-4 md:px-8 border-b border-white/10 bg-card/30 backdrop-blur-xl flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[240px] bg-card border-r-white/10">
                <OrganizerSidebar />
              </SheetContent>
            </Sheet>
            <h2 className="text-lg font-semibold capitalize hidden sm:block">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
            <div className="relative hidden md:flex items-center w-full max-w-sm">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input 
                className="w-full pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50 rounded-full" 
                placeholder="Search events, attendees..." 
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative text-foreground shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
            </Button>
            
            <Link href="/organizer/create-event">
              <Button className="hidden sm:flex bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-full px-6 shadow-lg shadow-primary/20 shrink-0 border-0">
                <PlusCircle className="w-4 h-4 mr-2" /> Create Event
              </Button>
            </Link>

            <Avatar className="h-8 w-8 sm:hidden shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary">RM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
