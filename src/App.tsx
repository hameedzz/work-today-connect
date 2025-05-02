
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import WorkerRegistration from "./pages/worker/Registration";
import EmployerRegistration from "./pages/employer/Registration";
import WorkerDashboard from "./pages/worker/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import JobDetails from "./pages/worker/JobDetails";
import PostJob from "./pages/employer/PostJob";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/worker/register" element={<WorkerRegistration />} />
          <Route path="/employer/register" element={<EmployerRegistration />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/worker/job/:id" element={<JobDetails />} />
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
