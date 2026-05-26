import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-x-0 border-t-0 border-b-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <span className="font-bold text-lg leading-none text-[#ffffff] bg-[transparent]">E</span>
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text bg-gradient-to-r from-white to-white/70 text-[#ffffff00]">
            EventSphere
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</Link>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Events</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Organizer Portal</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Attendee Portal</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">Login</Button>
          </Link>
          <Link href="/role-select">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_25px_rgba(124,58,237,0.6)]">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-white/10">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium text-white/70 hover:text-white">Home</Link>
              <a href="#" className="text-lg font-medium text-white/70 hover:text-white">Events</a>
              <a href="#" className="text-lg font-medium text-white/70 hover:text-white">Features</a>
              <a href="#" className="text-lg font-medium text-white/70 hover:text-white">Organizer Portal</a>
              <a href="#" className="text-lg font-medium text-white/70 hover:text-white">Attendee Portal</a>
              <div className="h-px bg-white/10 my-4" />
              <Link href="/login">
                <Button variant="outline" className="w-full justify-center border-white/20 text-white hover:bg-white/10">Login</Button>
              </Link>
              <Link href="/role-select">
                <Button className="w-full justify-center bg-primary text-white hover:bg-primary/90">Sign Up</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}