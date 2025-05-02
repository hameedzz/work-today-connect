
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import MobileNavbar from "@/components/layout/MobileNavbar";
import WorkerCard, { WorkerCardProps } from "@/components/employer/WorkerCard";
import { MapPin, Search, Bell, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data
const mockWorkers: WorkerCardProps[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    avatar: "",
    rating: 4.5,
    location: "Andheri East, Mumbai",
    distance: "2.5 km",
    skills: ["Construction", "Carpentry", "Painting"],
    experience: "5+ years",
    available: true,
  },
  {
    id: "2",
    name: "Amit Singh",
    avatar: "",
    rating: 4.2,
    location: "Bandra West, Mumbai",
    distance: "4.2 km",
    skills: ["Plumbing", "Electrical", "Carpentry"],
    experience: "3-5 years",
    available: true,
  },
  {
    id: "3",
    name: "Sanjay Patel",
    avatar: "",
    rating: 4.8,
    location: "Powai, Mumbai",
    distance: "3.8 km",
    skills: ["Loading", "Construction", "Cleaning"],
    experience: "1-3 years",
    available: false,
  },
  {
    id: "4",
    name: "Dinesh Sharma",
    avatar: "",
    rating: 4.0,
    location: "Dadar, Mumbai",
    distance: "5.1 km",
    skills: ["Painting", "Construction"],
    experience: "5+ years",
    available: true,
  },
];

// Mock posted jobs
const mockPostedJobs = [
  {
    id: "101",
    title: "Need Construction Workers",
    location: "Andheri East, Mumbai",
    postedAt: "Yesterday",
    applications: 5,
    status: "Active",
  },
  {
    id: "102",
    title: "Plumbers Required Urgently",
    location: "Bandra West, Mumbai",
    postedAt: "2 days ago",
    applications: 3,
    status: "Active",
  },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState<WorkerCardProps[]>(mockWorkers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleContact = (id: string) => {
    toast.success("Contact request sent! Worker will be notified.");
  };
  
  const filterWorkers = (query: string) => {
    if (!query) {
      setWorkers(mockWorkers);
      return;
    }
    
    const filtered = mockWorkers.filter(worker => 
      worker.name.toLowerCase().includes(query.toLowerCase()) ||
      worker.location.toLowerCase().includes(query.toLowerCase()) ||
      worker.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    
    setWorkers(filtered);
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
                placeholder="Search workers..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterWorkers(e.target.value);
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

      <main className="flex-1 container pb-4 px-4">
        <div className="flex items-center justify-between mt-6 mb-4">
          <h2 className="text-xl font-semibold">Your Posted Jobs</h2>
          <Button 
            className="btn-employer gap-1" 
            size="sm"
            onClick={() => navigate("/employer/post-job")}
          >
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {mockPostedJobs.map((job) => (
            <div 
              key={job.id} 
              className="job-card"
              onClick={() => navigate(`/employer/job/${job.id}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                    <span className="px-1">•</span>
                    <span>Posted {job.postedAt}</span>
                  </div>
                </div>
                <Badge variant="outline" className={job.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                  {job.status}
                </Badge>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm font-medium">
                  {job.applications} application{job.applications !== 1 ? 's' : ''}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/employer/job/${job.id}/applications`);
                  }}
                >
                  View Applications
                </Button>
              </div>
            </div>
          ))}
          
          {mockPostedJobs.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium">No jobs posted yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Create your first job posting now
              </p>
              <Button 
                className="btn-employer" 
                onClick={() => navigate("/employer/post-job")}
              >
                Post a Job
              </Button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Available Workers</h2>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="all">All Workers</TabsTrigger>
            <TabsTrigger value="available">Available Today</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {workers.map((worker) => (
              <WorkerCard
                key={worker.id}
                {...worker}
                onContact={handleContact}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            {workers
              .filter(worker => worker.available)
              .map((worker) => (
                <WorkerCard
                  key={worker.id}
                  {...worker}
                  onContact={handleContact}
                />
              ))
            }
            
            {workers.filter(worker => worker.available).length === 0 && (
              <div className="text-center py-12">
                <h3 className="font-medium text-lg">No workers available today</h3>
                <p className="text-muted-foreground mt-1">
                  Check back later or try expanding your search area
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

export default EmployerDashboard;
