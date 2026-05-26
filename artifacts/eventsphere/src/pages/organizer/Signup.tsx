import { Link } from "wouter";
import { Sparkles, Mail, Lock, Building, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function OrganizerSignup() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          <span className="text-xl font-bold tracking-tight">EventSphere</span>
        </Link>
      </div>

      <div className="w-full max-w-[450px] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Host your first event</h1>
          <p className="text-muted-foreground">The platform for world-class event organizers</p>
        </div>

        <Card className="glass-panel border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle>Organizer Sign Up</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organizer-name">Organizer Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="organizer-name" placeholder="Alex Rivers" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="org-name" placeholder="Rivers Tech Events" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="alex@org.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full h-11 text-base group" asChild>
              <Link href="/organizer">
                Sign Up
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Have account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
