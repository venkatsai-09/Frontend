import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <span className="text-white font-bold text-lg leading-none">E</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">EventSphere</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              The ultimate AI-powered event management platform. Discover, manage, and experience events smarter.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Organizers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Attendees</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} EventSphere India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">X</a>
            <a href="#" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">in</a>
            <a href="#" className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}