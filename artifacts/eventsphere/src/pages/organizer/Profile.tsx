import { useState } from "react";
import { 
  Camera, Pencil, Save, Mail, Phone, MapPin, 
  Globe, Linkedin, Twitter, LogOut, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { OrganizerLayout } from "@/components/layout/OrganizerLayout";
import { useLocation } from "wouter";

export default function OrganizerProfile() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rahul Mehta",
    organization: "TechEvents India",
    role: "Senior Event Strategist",
    bio: "Passionate about creating unforgettable tech experiences. Specialized in large-scale conferences and developer meetups with over 10 years of experience in the industry.",
    email: "rahul.mehta@techevents.in",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    website: "www.techevents.in",
    memberSince: "January 2022"
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to API
  };

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <OrganizerLayout title="Profile Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cover & Avatar Section */}
        <Card className="glass-panel border-white/10 overflow-hidden relative">
          <div className="h-48 bg-gradient-to-r from-primary/30 via-blue-500/20 to-purple-600/30 relative">
            <Button variant="outline" size="sm" className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/40">
              <Camera className="w-4 h-4 mr-2" /> Change Cover
            </Button>
          </div>
          
          <CardContent className="pt-0 pb-8 px-8 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 mb-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-background ring-4 ring-primary/20">
                  <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">RM</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <Badge className="bg-primary/20 text-primary border-primary/50">Pro Organizer</Badge>
                </div>
                <p className="text-muted-foreground font-medium">{profile.organization} • {profile.role}</p>
              </div>

              <div className="flex gap-3 pb-2">
                {isEditing ? (
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 gap-2">
                    <Save className="w-4 h-4" /> Save Profile
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
                    <Pencil className="w-4 h-4" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Left Column - Info */}
              <div className="md:col-span-1 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      {isEditing ? <Input value={profile.email} size={1} className="h-8 bg-white/5" /> : <span>{profile.email}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      {isEditing ? <Input value={profile.phone} size={1} className="h-8 bg-white/5" /> : <span>{profile.phone}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      {isEditing ? <Input value={profile.location} size={1} className="h-8 bg-white/5" /> : <span>{profile.location}</span>}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      {isEditing ? <Input value={profile.website} size={1} className="h-8 bg-white/5" /> : <span>{profile.website}</span>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Connect</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 hover:text-blue-500">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 hover:text-blue-400">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-muted-foreground">Member since {profile.memberSince}</p>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="w-full justify-start px-0 mt-4 text-red-400 hover:text-red-300 hover:bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout from Session
                  </Button>
                </div>
              </div>

              {/* Right Column - About & Experience */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">About Me</h3>
                  {isEditing ? (
                    <Textarea 
                      value={profile.bio} 
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="min-h-[150px] bg-white/5 border-white/10"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Tech Conferences", "Workshops", "Product Launches", "Virtual Events", "Networking"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-white/5 hover:bg-white/10 transition-colors border-white/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold">Identity Verified</h4>
                        <p className="text-sm text-muted-foreground">Your account has been verified by the EventSphere trust team.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </OrganizerLayout>
  );
}
