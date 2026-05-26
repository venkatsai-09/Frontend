import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import RoleSelect from "@/pages/role-select";
import AttendeeSignup from "@/pages/attendee/Signup";
import OrganizerSignup from "@/pages/organizer/Signup";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import EventRegister from "@/pages/EventRegister";
import Payment from "@/pages/Payment";
import TicketSuccess from "@/pages/TicketSuccess";
import AttendeeHome from "@/pages/AttendeeHome";
import AttendeeRecommendations from "@/pages/AttendeeRecommendations";
import AttendeeAIDiscovery from "@/pages/AttendeeAIDiscovery";
import AttendeeProfile from "@/pages/AttendeeProfile";
import AttendeeHistory from "@/pages/AttendeeHistory";
import OrganizerDashboard from "@/pages/OrganizerDashboard";
import CreateEvent from "@/pages/CreateEvent";
import OrganizerScanner from "@/pages/organizer/Scanner";
import OrganizerProfile from "@/pages/organizer/Profile";
import OrganizerHistory from "@/pages/organizer/History";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/role-select" component={RoleSelect} />
      <Route path="/signup/attendee" component={AttendeeSignup} />
      <Route path="/signup/organizer" component={OrganizerSignup} />
      <Route path="/events" component={Events} />
      <Route path="/events/:id/register" component={EventRegister} />
      <Route path="/events/:id" component={EventDetails} />
      <Route path="/payment" component={Payment} />
      <Route path="/ticket-success" component={TicketSuccess} />
      <Route path="/attendee" component={AttendeeHome} />
      <Route path="/attendee/recommendations" component={AttendeeRecommendations} />
      <Route path="/attendee/ai-discovery" component={AttendeeAIDiscovery} />
      <Route path="/attendee/profile" component={AttendeeProfile} />
      <Route path="/attendee/history" component={AttendeeHistory} />
      <Route path="/organizer" component={OrganizerDashboard} />
      <Route path="/organizer/create-event" component={CreateEvent} />
      <Route path="/organizer/scanner" component={OrganizerScanner} />
      <Route path="/organizer/profile" component={OrganizerProfile} />
      <Route path="/organizer/history" component={OrganizerHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
