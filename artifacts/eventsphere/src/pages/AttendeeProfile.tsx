import { useState, useEffect } from "react";
import { useFetch } from "@/lib/backend";
import { AttendeeLayout } from "@/components/AttendeeLayout";
import { 
  Camera, Edit2, Mail, Phone, MapPin, Calendar, Save, LogOut, Github, Linkedin, Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AttendeeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profile, isLoading: profileLoading } = useFetch<any>("/api/users/me");
  const [localProfile, setLocalProfile] = useState<any>(null);

  useEffect(() => {
    if (profile) setLocalProfile(profile);
  }, [profile]);

  const handleSave = () => {
    // Would call API to save localProfile, then re-fetch
    setIsEditing(false);
  };

  return (
    <AttendeeLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Banner */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-900 rounded-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile Info Card */}
          <div className="px-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    {/* Avatar image could be served by backend; fallback to initials */}
                    <AvatarFallback>{(profile?.name || localProfile?.name || 'A').split(' ').map((n:any)=>n[0]).slice(0,2).join('') ?? 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left pb-2">
                  <h1 className="text-3xl font-bold">{profileLoading ? 'Loading…' : (profile?.name ?? localProfile?.name ?? 'Attendee')}</h1>
                  <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                    <MapPin className="w-4 h-4" /> {profile?.city ?? localProfile?.city ?? ''}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pb-2">
                {isEditing ? (
                  <Button onClick={handleSave} className="gap-2 px-6">
                    <Save className="w-4 h-4" /> Save Profile
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2 px-6">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="space-y-6">
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <textarea 
                    className="w-full min-h-[120px] bg-muted/50 border-none rounded-xl p-3 focus:ring-1 focus:ring-primary outline-none text-sm"
                    value={localProfile?.bio ?? ''}
                    onChange={(e) => setLocalProfile({...localProfile, bio: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile?.bio ?? localProfile?.bio ?? ''}
                  </p>
                )}
                <div className="flex gap-4 pt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {profile?.memberSince ?? localProfile?.memberSince ?? '—'}</span>
                </div>
                <div className="pt-4 space-y-2">
                  <h4 className="text-sm font-semibold">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AI</Badge>
                    <Badge variant="secondary">Startups</Badge>
                    <Badge variant="secondary">Web3</Badge>
                    <Badge variant="secondary">Tech</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Information Form */}
          <div className="md:col-span-2">
            <Card className="glass-panel border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <Input 
                        disabled={!isEditing}
                        value={localProfile?.name ?? profile?.name ?? ''}
                        onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
                        className="bg-muted/30 border-none h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        disabled={!isEditing}
                        value={localProfile?.email ?? profile?.email ?? ''}
                        onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                        className="pl-10 bg-muted/30 border-none h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        disabled={!isEditing}
                        value={localProfile?.phone ?? profile?.phone ?? ''}
                        onChange={(e) => setLocalProfile({...localProfile, phone: e.target.value})}
                        className="pl-10 bg-muted/30 border-none h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        disabled={!isEditing}
                        value={localProfile?.city ?? profile?.city ?? ''}
                        onChange={(e) => setLocalProfile({...localProfile, city: e.target.value})}
                        className="pl-10 bg-muted/30 border-none h-11"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 px-6">
                    <LogOut className="w-4 h-4" /> Logout from Device
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AttendeeLayout>
  );
}
