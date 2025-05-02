
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";
import MobileNavbar from "@/components/layout/MobileNavbar";
import JobCard, { JobCardProps } from "@/components/worker/JobCard";
import { MapPin, Search, Bell } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockJobs: JobCardProps[] = [
  {
    id: "1",
    title: "Construction Helper Needed",
    location: "Andheri East, Mumbai",
    wage: 600,
    currency: "₹",
    distance: "2.5 km",
    duration: "Full day",
    category: "Construction",
    postedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Loading/Unloading Workers",
    location: "Bandra West, Mumbai",
    wage: 550,
    currency: "₹",
    distance: "4.2 km",
    duration: "Half day",
    category: "Labor",
    postedAt: "5 hours ago",
  },
  {
    id: "3",
    title: "Carpenter for Furniture Repair",
    location: "Powai, Mumbai",
    wage: 800,
    currency: "₹",
    distance: "3.8 km",
    duration: "Full day",
    category: "Carpentry",
    postedAt: "1 day ago",
  },
  {
    id: "4",
    title: "Painter Required for House",
    location: "Juhu, Mumbai",
    wage: 700,
    currency: "₹",
    distance: "5.1 km",
    duration: "2 days",
    category: "Painting",
    postedAt: "1 day ago",
  },
];

const mockAppliedJobs: JobCardProps[] = [
  {
    id: "5",
    title: "Plumbing Work in Apartment",
    location: "Ghatkopar, Mumbai",
    wage: 750,
    currency: "₹",
    distance: "6.3 km",
    duration: "Half day",
    category: "Plumbing",
    postedAt: "Yesterday",
    applied: true,
  },
];

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobCardProps[]>(mockJobs);
  const [appliedJobs, setAppliedJobs] = useState<JobCardProps[]>(mockAppliedJobs);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApply = (id: string) => {
    // Find the job
    const job = jobs.find(job => job.id === id);
    if (job) {
      // Remove from available jobs
      setJobs(jobs.filter(job => job.id !== id));
      
      // Add to applied jobs
      const appliedJob = { ...job, applied: true };
      setAppliedJobs([...appliedJobs, appliedJob]);
      
      toast.success("Application submitted successfully!");
    }
  };
  
  const handleJobClick = (id: string) => {
    navigate(`/worker/job/${id}`);
  };
  
  const filterJobs = (query: string) => {
    if (!query) {
      setJobs(mockJobs);
      return;
    }
    
    const filtered = mockJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setJobs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 pb-16">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container py-3 px-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search jobs..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterJobs(e.target.value);
                }}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => toast.info("Location feature coming soon!")}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container pb-4 pt-6 px-4">
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onApply={handleApply}
                  onClick={handleJobClick}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="font-medium text-lg">No jobs found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or check back later
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="applied" className="space-y-4">
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onClick={handleJobClick}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="font-medium text-lg">No applications yet</h3>
                <p className="text-muted-foreground mt-1">
                  Applied jobs will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <MobileNavbar />
    </div>
  );
};

export default WorkerDashboard;
