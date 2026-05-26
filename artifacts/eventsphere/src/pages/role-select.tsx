import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RoleSelect() {
  const [selectedRole, setSelectedRole] = useState<"attendee" | "organizer" | null>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selectedRole === "attendee") setLocation("/signup/attendee");
    else if (selectedRole === "organizer") setLocation("/signup/organizer");
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <span className="text-white font-bold text-lg leading-none">E</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">EventSphere</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-3">How do you want to use EventSphere?</h1>
          <p className="text-muted-foreground text-lg">Choose your primary goal to personalize your experience.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            whileHover={{ y: -5 }}
            className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all border-2 ${selectedRole === 'attendee' ? 'border-primary shadow-[0_0_30px_rgba(124,58,237,0.3)]' : 'border-white/10 hover:border-white/30'}`}
            onClick={() => setSelectedRole('attendee')}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Attendee</h2>
            <p className="text-muted-foreground leading-relaxed">
              Discover and attend amazing events. Get personalized recommendations, manage your tickets, and connect with others.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all border-2 ${selectedRole === 'organizer' ? 'border-accent shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-white/10 hover:border-white/30'}`}
            onClick={() => setSelectedRole('organizer')}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 text-accent">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Organizer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Create and manage events using AI. Get insights, handle ticketing seamlessly, and scale your audience.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="w-full max-w-sm bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] h-12 text-lg" 
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue as {selectedRole === 'attendee' ? 'Attendee' : selectedRole === 'organizer' ? 'Organizer' : '...'}
          </Button>
        </div>
      </div>
    </div>
  );
}