import { Link } from "wouter";
import { 
  Calendar, Users, TrendingUp, Search, Filter, 
  ChevronRight, ExternalLink, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { OrganizerLayout } from "@/components/layout/OrganizerLayout";

const PAST_EVENTS = [
  { 
    id: 1, 
    name: "Tech Summit 2023", 
    date: "Dec 10, 2023", 
    attendees: 450, 
    revenue: 89000, 
    status: "Completed",
    category: "Technology"
  },
  { 
    id: 2, 
    name: "Web3 Workshop", 
    date: "Nov 15, 2023", 
    attendees: 120, 
    revenue: 24000, 
    status: "Completed",
    category: "Workshop"
  },
  { 
    id: 3, 
    name: "Design Meetup", 
    date: "Oct 05, 2023", 
    attendees: 85, 
    revenue: 0, 
    status: "Completed",
    category: "Networking"
  },
  { 
    id: 4, 
    name: "Developer Conference", 
    date: "Aug 22, 2023", 
    attendees: 600, 
    revenue: 150000, 
    status: "Completed",
    category: "Conference"
  },
];

export default function OrganizerHistory() {
  return (
    <OrganizerLayout title="Event History">
      <div className="space-y-6">
        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search past events..." 
              className="pl-9 bg-black/20 border-white/10"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 flex-1 md:flex-none">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/5 flex-1 md:flex-none">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-panel border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Past Events</p>
                  <h3 className="text-2xl font-bold">14 Events</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-panel border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lifetime Attendees</p>
                  <h3 className="text-2xl font-bold">2,840</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-panel border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Past Revenue</p>
                  <h3 className="text-2xl font-bold">₹8,42,000</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card className="glass-panel border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10">
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PAST_EVENTS.map((event) => (
                  <TableRow key={event.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-bold">{event.name}</p>
                        <Badge variant="outline" className="text-[10px] py-0 mt-1 border-white/10 text-muted-foreground">
                          {event.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{event.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        {event.attendees}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {event.revenue > 0 ? `₹${event.revenue.toLocaleString('en-IN')}` : <span className="text-green-400 font-bold uppercase text-[10px]">Free</span>}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/events/${event.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-muted-foreground">
            <p>Showing 4 of 14 events</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="border-white/10">Previous</Button>
              <Button variant="outline" size="sm" className="border-white/10">Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </OrganizerLayout>
  );
}
