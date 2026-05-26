import { 
  LayoutDashboard, PlusCircle, CalendarDays, Users, BarChart3, 
  Sparkles, CreditCard, Settings, Search, Bell, Menu,
  TrendingUp, Pencil, Eye, Trash2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { OrganizerSidebar } from "@/components/OrganizerSidebar";

const PIE_COLORS = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b"];

const REVENUE_DATA = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 58000 },
  { name: "Mar", value: 51000 },
  { name: "Apr", value: 73000 },
  { name: "May", value: 68000 },
  { name: "Jun", value: 82000 },
];

const ATTENDANCE_DATA = [
  { name: "Jan", value: 320 },
  { name: "Feb", value: 480 },
  { name: "Mar", value: 410 },
  { name: "Apr", value: 560 },
  { name: "May", value: 490 },
  { name: "Jun", value: 620 },
];

const POPULAR_EVENTS_DATA = [
  { name: "AI Summit 2026", value: 850 },
  { name: "Startup Connect", value: 620 },
  { name: "Tech Innovators", value: 540 },
  { name: "Music Fest", value: 480 },
  { name: "Data Science", value: 357 },
];

const RECENT_EVENTS = [
  { id: 1, name: "AI Summit 2026", category: "Technology", date: "15/08/2026", revenue: 124950, tickets: 500, status: "Live" },
  { id: 2, name: "Startup Connect India", category: "Business", date: "22/08/2026", revenue: 89940, tickets: 600, status: "Upcoming" },
  { id: 3, name: "Future of Robotics", category: "Technology", date: "05/09/2026", revenue: 159960, tickets: 400, status: "Upcoming" },
  { id: 4, name: "Business Leaders Meet", category: "Networking", date: "12/09/2026", revenue: 59970, tickets: 200, status: "Draft" },
  { id: 5, name: "IndieMusic Fest 2026", category: "Music", date: "25/09/2026", revenue: 47940, tickets: 600, status: "Upcoming" },
  { id: 6, name: "Data Science Summit", category: "Technology", date: "02/10/2026", revenue: 74975, tickets: 300, status: "Completed" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live": return "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50";
    case "Upcoming": return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/50";
    case "Completed": return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/50";
    case "Draft": return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50";
    default: return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/50";
  }
};

export default function OrganizerDashboard() {
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
              Dashboard
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
            
            <Button className="hidden sm:flex bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-full px-6 shadow-lg shadow-primary/20 shrink-0 border-0">
              <PlusCircle className="w-4 h-4 mr-2" /> Create Event
            </Button>

            <Avatar className="h-8 w-8 sm:hidden shrink-0">
              <AvatarFallback className="bg-primary/20 text-primary">RM</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Events", value: "24", change: "+3 this month", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "Total Revenue", value: "₹4,82,500", change: "+12.5%", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
                { label: "Tickets Sold", value: "3,847", change: "+8.2%", icon: CreditCard, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Total Attendees", value: "3,412", change: "+15.1%", icon: Users, color: "text-orange-400", bg: "bg-orange-500/10" },
              ].map((stat, i) => (
                <Card key={i} className="glass-panel border-white/5 hover:border-white/10 transition-colors">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Line Chart */}
              <Card className="glass-panel lg:col-span-2 border-white/5">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Bar Chart */}
              <Card className="glass-panel border-white/5">
                <CardHeader>
                  <CardTitle>Event Attendance</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ATTENDANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          cursor={{fill: '#ffffff05'}}
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {ATTENDANCE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} className="fill-blue-500 hover:fill-primary transition-all duration-300" />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Events Chart & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Popular Events Pie */}
              <Card className="glass-panel border-white/5">
                <CardHeader>
                  <CardTitle>Top Events by Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={POPULAR_EVENTS_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {POPULAR_EVENTS_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-panel border-white/5 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button data-testid="action-create-event" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 transition-all group text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <PlusCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Create Event</h4>
                    <p className="text-sm text-muted-foreground">Launch a new event with AI assistance</p>
                  </button>

                  <button data-testid="action-ai-desc" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/50 transition-all group text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Generate AI Description</h4>
                    <p className="text-sm text-muted-foreground">Let AI write your event description</p>
                  </button>

                  <button data-testid="action-analytics" className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/50 transition-all group text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">View Analytics</h4>
                    <p className="text-sm text-muted-foreground">Deep dive into your event performance</p>
                  </button>
                </CardContent>
              </Card>

            </div>

            {/* Recent Events Table */}
            <Card className="glass-panel border-white/5 overflow-hidden">
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-muted-foreground font-medium">Event Name</TableHead>
                      <TableHead className="text-muted-foreground font-medium">Date</TableHead>
                      <TableHead className="text-muted-foreground font-medium">Revenue</TableHead>
                      <TableHead className="text-muted-foreground font-medium">Tickets Sold</TableHead>
                      <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                      <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT_EVENTS.map((event) => (
                      <TableRow key={event.id} className="border-white/10 hover:bg-white/5 transition-colors">
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground">{event.name}</span>
                            <Badge variant="outline" className="w-fit text-[10px] py-0 border-white/10 text-muted-foreground">{event.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">{event.date}</TableCell>
                        <TableCell className="font-medium">₹{event.revenue.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-muted-foreground">{event.tickets}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(event.status)} border whitespace-nowrap`}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/10">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
