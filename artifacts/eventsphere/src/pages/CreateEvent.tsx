import { useState } from "react";
import {
  UploadCloud, PlusCircle, X, Sparkles, RefreshCw, Copy, ArrowLeft, Eye, Search, Bell, Menu
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

import { OrganizerSidebar } from "@/components/OrganizerSidebar";

const formSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string(),
  tags: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  venueName: z.string(),
  city: z.string(),
  address: z.string(),
  capacity: z.string(),
  speakers: z.array(z.object({
    name: z.string(),
    designation: z.string(),
    company: z.string(),
    bio: z.string()
  })),
  agenda: z.array(z.object({
    time: z.string(),
    title: z.string(),
    description: z.string()
  })),
  tickets: z.object({
    free: z.object({ enabled: z.boolean(), capacity: z.string() }),
    general: z.object({ enabled: z.boolean(), price: z.string(), capacity: z.string() }),
    vip: z.object({ enabled: z.boolean(), price: z.string(), capacity: z.string() }),
    earlyBird: z.object({ enabled: z.boolean(), price: z.string(), capacity: z.string(), endDate: z.string() })
  })
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateEvent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  // Banner Image State
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      category: "",
      description: "",
      tags: "",
      date: "",
      startTime: "",
      endTime: "",
      venueName: "",
      city: "",
      address: "",
      capacity: "",
      speakers: [{ name: "", designation: "", company: "", bio: "" }],
      agenda: [
        { time: "09:00 AM", title: "Registration", description: "" },
        { time: "10:00 AM", title: "Opening Keynote", description: "" }
      ],
      tickets: {
        free: { enabled: false, capacity: "" },
        general: { enabled: true, price: "499", capacity: "500" },
        vip: { enabled: true, price: "1499", capacity: "100" },
        earlyBird: { enabled: true, price: "799", capacity: "200", endDate: "" }
      }
    }
  });

  const { fields: speakerFields, append: appendSpeaker, remove: removeSpeaker } = useFieldArray({
    control: form.control,
    name: "speakers"
  });

  const { fields: agendaFields, append: appendAgenda, remove: removeAgenda } = useFieldArray({
    control: form.control,
    name: "agenda"
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    toast({
      title: "Event Published",
      description: "Your event has been successfully created."
    });
  };

  // AI Description Generator State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(false);
  const [aiForm, setAiForm] = useState({
    eventName: form.watch("eventName"),
    highlights: "",
    audience: "",
    speakers: "",
    goals: ""
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedContent(true);
    }, 2000);
  };

  const handleInsertIntoForm = () => {
    form.setValue("description", "Join us for the most anticipated technology event of the year — AI Summit 2026! This groundbreaking conference brings together the brightest minds in artificial intelligence, machine learning, and data science. From immersive workshops to high-impact keynotes, this is where innovation meets opportunity. Whether you're a seasoned professional or just beginning your AI journey, you'll leave with actionable insights and powerful connections.");
    setActiveTab("details");
    toast({
      title: "Content Inserted",
      description: "AI description added to event form."
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[240px] shrink-0 border-r border-white/10 bg-card/50 backdrop-blur-xl z-20">
        <OrganizerSidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

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
              Create Event
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
            <div className="relative hidden md:flex items-center w-full max-w-sm">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input 
                className="w-full pl-9 bg-white/5 border-white/10 focus-visible:ring-primary/50 rounded-full" 
                placeholder="Search..." 
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative text-foreground shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
            </Button>

            <Avatar className="h-8 w-8 sm:hidden shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary">RM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 z-10">
          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Create New Event</h1>
                  <p className="text-muted-foreground mt-1">Set up your event details and tickets.</p>
                </div>
                <TabsList className="bg-white/5 border border-white/10 h-auto p-1 rounded-xl">
                  <TabsTrigger value="details" data-testid="tab-details" className="px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                    Event Details
                  </TabsTrigger>
                  <TabsTrigger value="ai-desc" data-testid="tab-ai-desc" className="px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> AI Description
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="details" className="mt-0 outline-none">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Basic Information */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader>
                        <CardTitle>1. Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="eventName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Event Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="E.g. AI Summit 2026" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {["AI", "Technology", "Business", "Music", "Sports", "Education", "Networking"].map(cat => (
                                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your event..." 
                                  className="min-h-[120px] bg-white/5 border-white/10" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tags</FormLabel>
                              <FormControl>
                                <Input placeholder="Add tags separated by commas" className="bg-white/5 border-white/10" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Date, Time & Venue */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader>
                        <CardTitle>2. Date, Time & Venue</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Event Date</FormLabel>
                                <FormControl>
                                  <Input type="date" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Time (IST)</FormLabel>
                                <FormControl>
                                  <Input type="time" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Time (IST)</FormLabel>
                                <FormControl>
                                  <Input type="time" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="venueName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Venue Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="E.g. KTPO Convention Centre" className="bg-white/5 border-white/10" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white/5 border-white/10">
                                      <SelectValue placeholder="Select a city" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata"].map(c => (
                                      <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Address</FormLabel>
                              <FormControl>
                                <Textarea className="min-h-[80px] bg-white/5 border-white/10" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem className="max-w-xs">
                              <FormLabel>Total Capacity</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Maximum attendees" className="bg-white/5 border-white/10" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Banner Image */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader>
                        <CardTitle>3. Banner Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {bannerPreview ? (
                          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
                            <img src={bannerPreview} alt="Banner Preview" className="w-full h-64 object-cover" />
                            <Button 
                              type="button"
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-4 right-4 rounded-full"
                              onClick={() => setBannerPreview(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="relative border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors rounded-xl p-12 text-center bg-white/5">
                            <input 
                              type="file" 
                              accept="image/png, image/jpeg, image/webp"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleImageUpload}
                            />
                            <div className="flex flex-col items-center justify-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <UploadCloud className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-foreground font-medium">Drag & Drop or Click to Upload</p>
                                <p className="text-sm text-muted-foreground mt-1">Accepted: JPG, PNG, WebP (Max 5MB)</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Speakers */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>4. Speaker Information</CardTitle>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => appendSpeaker({ name: "", designation: "", company: "", bio: "" })}
                          className="border-white/10 bg-white/5 hover:bg-white/10"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" /> Add Speaker
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {speakerFields.map((field, index) => (
                          <div key={field.id} className="p-4 rounded-xl border border-white/10 bg-white/5 relative">
                            <div className="absolute top-4 right-4">
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-full"
                                onClick={() => removeSpeaker(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-10">
                              <FormField
                                control={form.control}
                                name={`speakers.${index}.name`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`speakers.${index}.designation`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`speakers.${index}.company`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name={`speakers.${index}.bio`}
                              render={({ field: f }) => (
                                <FormItem>
                                  <FormLabel>Bio</FormLabel>
                                  <FormControl><Textarea className="h-20 bg-white/5 border-white/10" {...f} /></FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Agenda */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>5. Agenda</CardTitle>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => appendAgenda({ time: "", title: "", description: "" })}
                          className="border-white/10 bg-white/5 hover:bg-white/10"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" /> Add Agenda Item
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {agendaFields.map((field, index) => (
                          <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start p-4 rounded-xl border border-white/10 bg-white/5">
                            <div className="w-full sm:w-32 shrink-0">
                              <FormField
                                control={form.control}
                                name={`agenda.${index}.time`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" placeholder="09:00 AM" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex-1 w-full space-y-4">
                              <FormField
                                control={form.control}
                                name={`agenda.${index}.title`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`agenda.${index}.description`}
                                render={({ field: f }) => (
                                  <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl><Input className="bg-white/5 border-white/10" {...f} /></FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="mt-8 shrink-0 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => removeAgenda(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Tickets */}
                    <Card className="glass-panel border-white/10">
                      <CardHeader>
                        <CardTitle>6. Ticket Configuration</CardTitle>
                        <CardDescription>Enable and configure the tickets you want to offer.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Free */}
                          <div className={`p-5 rounded-xl border transition-colors ${form.watch("tickets.free.enabled") ? "border-green-500/50 bg-green-500/5" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Free
                                </h4>
                                <p className="text-sm text-muted-foreground">₹0</p>
                              </div>
                              <FormField control={form.control} name="tickets.free.enabled" render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              )} />
                            </div>
                            {form.watch("tickets.free.enabled") && (
                              <div className="mt-4 pt-4 border-t border-white/10">
                                <FormField control={form.control} name="tickets.free.capacity" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Total Seats (Leave empty for unlimited)</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                              </div>
                            )}
                          </div>

                          {/* General */}
                          <div className={`p-5 rounded-xl border transition-colors ${form.watch("tickets.general.enabled") ? "border-blue-500/50 bg-blue-500/5" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> General Pass
                                </h4>
                                <p className="text-sm text-muted-foreground">Standard access</p>
                              </div>
                              <FormField control={form.control} name="tickets.general.enabled" render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              )} />
                            </div>
                            {form.watch("tickets.general.enabled") && (
                              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="tickets.general.price" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                                <FormField control={form.control} name="tickets.general.capacity" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Seats</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                              </div>
                            )}
                          </div>

                          {/* VIP */}
                          <div className={`p-5 rounded-xl border transition-colors ${form.watch("tickets.vip.enabled") ? "border-purple-500/50 bg-purple-500/5" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> VIP Pass
                                </h4>
                                <p className="text-sm text-muted-foreground">Premium access</p>
                              </div>
                              <FormField control={form.control} name="tickets.vip.enabled" render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              )} />
                            </div>
                            {form.watch("tickets.vip.enabled") && (
                              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="tickets.vip.price" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                                <FormField control={form.control} name="tickets.vip.capacity" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Seats</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                              </div>
                            )}
                          </div>

                          {/* Early Bird */}
                          <div className={`p-5 rounded-xl border transition-colors ${form.watch("tickets.earlyBird.enabled") ? "border-orange-500/50 bg-orange-500/5" : "border-white/10 bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Early Bird
                                </h4>
                                <p className="text-sm text-muted-foreground">Discounted access</p>
                              </div>
                              <FormField control={form.control} name="tickets.earlyBird.enabled" render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              )} />
                            </div>
                            {form.watch("tickets.earlyBird.enabled") && (
                              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="tickets.earlyBird.price" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl><Input type="number" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                                <FormField control={form.control} name="tickets.earlyBird.endDate" render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ends On</FormLabel>
                                    <FormControl><Input type="date" className="bg-white/5 border-white/10" {...field} /></FormControl>
                                  </FormItem>
                                )} />
                              </div>
                            )}
                          </div>

                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-white/10">
                      <Button type="button" variant="outline" data-testid="button-save-draft" className="w-full sm:w-auto bg-transparent border-white/20">
                        Save as Draft
                      </Button>
                      <Button type="button" variant="outline" data-testid="button-preview-event" className="w-full sm:w-auto bg-transparent border-white/20">
                        <Eye className="w-4 h-4 mr-2" /> Preview Event
                      </Button>
                      <Button type="submit" data-testid="button-publish-event" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 border-0 shadow-lg shadow-primary/20">
                        Publish Event
                      </Button>
                    </div>

                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="ai-desc" className="mt-0 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  
                  {/* Left Panel - Inputs */}
                  <Card className="glass-panel border-white/10 focus-within:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        AI Generator
                      </CardTitle>
                      <CardDescription>Provide details to generate marketing content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel>Event Name</FormLabel>
                        <Input 
                          value={aiForm.eventName} 
                          onChange={(e) => setAiForm({...aiForm, eventName: e.target.value})}
                          className="bg-white/5 border-white/10" 
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Key Highlights</FormLabel>
                        <Textarea 
                          placeholder="e.g. 3 workshops, 10 speakers, networking dinner"
                          value={aiForm.highlights} 
                          onChange={(e) => setAiForm({...aiForm, highlights: e.target.value})}
                          className="bg-white/5 border-white/10 h-20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Target Audience</FormLabel>
                        <Input 
                          placeholder="e.g. Startup founders, AI engineers"
                          value={aiForm.audience} 
                          onChange={(e) => setAiForm({...aiForm, audience: e.target.value})}
                          className="bg-white/5 border-white/10" 
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Speaker Names</FormLabel>
                        <Input 
                          placeholder="e.g. Rahul Mehta, Dr. Priya Sharma"
                          value={aiForm.speakers} 
                          onChange={(e) => setAiForm({...aiForm, speakers: e.target.value})}
                          className="bg-white/5 border-white/10" 
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Event Goals</FormLabel>
                        <Textarea 
                          placeholder="What attendees will learn or achieve"
                          value={aiForm.goals} 
                          onChange={(e) => setAiForm({...aiForm, goals: e.target.value})}
                          className="bg-white/5 border-white/10 h-20" 
                        />
                      </div>

                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        data-testid="button-generate-ai"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 border-0 mt-6 h-12 text-lg"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="w-5 h-5 mr-2 animate-spin" /> Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" /> Generate Description
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Right Panel - Output */}
                  <div className={`relative rounded-xl border transition-all duration-700 min-h-[500px] flex flex-col p-6 ${
                    generatedContent ? "border-primary/40 bg-primary/5 shadow-[0_0_30px_-5px_rgba(139,92,246,0.1)]" : "border-white/10 bg-white/5"
                  }`}>
                    
                    {!isGenerating && !generatedContent && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-lg font-medium">Your AI-generated content will appear here</p>
                        <p className="text-sm mt-2 max-w-sm">Fill out the details on the left and click generate to create optimized descriptions.</p>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="flex-1 flex flex-col space-y-6">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="space-y-3">
                            <div className="h-6 w-1/3 bg-white/10 animate-pulse rounded-md"></div>
                            <div className="h-20 w-full bg-white/5 animate-pulse rounded-xl"></div>
                          </div>
                        ))}
                      </div>
                    )}

                    {generatedContent && !isGenerating && (
                      <div className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        
                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-purple-500 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                          <h3 className="font-semibold text-purple-400 mb-2">AI Generated Description</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Join us for the most anticipated technology event of the year — AI Summit 2026! This groundbreaking conference brings together the brightest minds in artificial intelligence, machine learning, and data science. From immersive workshops to high-impact keynotes, this is where innovation meets opportunity. Whether you're a seasoned professional or just beginning your AI journey, you'll leave with actionable insights and powerful connections.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-blue-500 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                          <h3 className="font-semibold text-blue-400 mb-2">Marketing Summary</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            AI Summit 2026 — Where Visionaries Meet. 2,500 attendees. 10+ speakers. 1 unforgettable experience. Join India's premier AI event on 15/08/2026 in Bengaluru.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-green-500 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                          <h3 className="font-semibold text-green-400 mb-2">SEO Summary</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            AI Summit 2026 is India's largest artificial intelligence conference, featuring top AI experts, live demos, and networking opportunities. Register now for the ultimate AI event in Bengaluru.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-orange-500 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                          <h3 className="font-semibold text-orange-400 mb-2">Key Highlights</h3>
                          <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-4 space-y-1">
                            <li>10+ world-class speakers from Google, Razorpay & Infosys</li>
                            <li>Hands-on ML workshops with TensorFlow</li>
                            <li>Exclusive networking dinner for VIP attendees</li>
                            <li>Live product demos from 20+ AI startups</li>
                            <li>Certificate of participation for all attendees</li>
                          </ul>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-4">
                          <Button variant="outline" className="border-white/20" onClick={handleGenerate} data-testid="button-regenerate">
                            <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
                          </Button>
                          <Button variant="outline" className="border-white/20" data-testid="button-copy" onClick={() => {
                            toast({ title: "Copied!", description: "Content copied to clipboard." });
                          }}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                          </Button>
                          <Button 
                            className="bg-primary hover:bg-primary/90 ml-auto"
                            data-testid="button-insert-form"
                            onClick={handleInsertIntoForm}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Insert into Form
                          </Button>
                        </div>

                      </div>
                    )}
                    
                    <div className="absolute bottom-2 right-4 text-[10px] text-muted-foreground opacity-50 font-medium tracking-wider uppercase">
                      Powered by EventSphere AI
                    </div>
                  </div>

                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}