
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";
import MobileNavbar from "@/components/layout/MobileNavbar";
import JobCard, { JobCardProps } from "@/components/worker/JobCard";
import { MapPin, Search, Bell, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { 
  subscribeToNearbyJobs, 
  applyForJob, 
  getUserApplications 
} from "@/services/jobService";
import { useCurrentLocation } from "@/services/locationService";
import { subscribeToUserNotifications } from "@/services/notificationService";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const { location, loading: locationLoading, error: locationError } = useCurrentLocation();
  
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch jobs based on user's location
  useEffect(() => {
    if (!currentUser || !location) return;

    setLoading(true);
    
    // Subscribe to nearby jobs
    const unsubscribeJobs = subscribeToNearbyJobs(
      location.latitude,
      location.longitude,
      20, // 20km radius
      category,
      (jobsData) => {
        // Convert Firebase jobs to JobCardProps format
        const formattedJobs = jobsData.map(job => ({
          id: job.id,
          title: job.title,
          location: job.location.address,
          wage: job.wage,
          currency: job.currency || "₹",
          distance: job.distance,
          duration: job.duration,
          category: job.category,
          postedAt: formatPostedTime(job.createdAt?.toDate())
        }));
        
        setJobs(formattedJobs);
        setLoading(false);
      }
    );
    
    // Fetch user's job applications
    const fetchApplications = async () => {
      try {
        const applications = await getUserApplications(currentUser.uid);
        
        // Convert applications to JobCardProps format
        const appliedJobsList = applications.map(app => ({
          id: app.jobId,
          title: app.job?.title || "Job Title",
          location: app.job?.location?.address || "Location",
          wage: app.job?.wage || 0,
          currency: app.job?.currency || "₹",
          distance: "", // Will be calculated if needed
          duration: app.job?.duration || "",
          category: app.job?.category || "",
          postedAt: formatPostedTime(app.job?.createdAt?.toDate()),
          applied: true
        }));
        
        setAppliedJobs(appliedJobsList);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load your applications");
      }
    };
    
    fetchApplications();
    
    // Subscribe to user notifications
    const unsubscribeNotifications = subscribeToUserNotifications(
      currentUser.uid,
      (notifications) => {
        // Count unread notifications
        const unreadCount = notifications.filter(n => !n.isRead).length;
        setNotificationCount(unreadCount);
      }
    );
    
    return () => {
      unsubscribeJobs();
      unsubscribeNotifications();
    };
  }, [currentUser, location, category]);

  const handleApply = async (id: string) => {
    if (!currentUser) {
      toast.error("Please login to apply for jobs");
      navigate("/login");
      return;
    }
    
    try {
      // Find the job
      const job = jobs.find(job => job.id === id);
      if (job) {
        // Apply for the job
        await applyForJob(id, currentUser.uid);
        
        // Remove from available jobs
        setJobs(jobs.filter(job => job.id !== id));
        
        // Add to applied jobs
        const appliedJob = { ...job, applied: true };
        setAppliedJobs([...appliedJobs, appliedJob]);
        
        toast.success("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Failed to submit application");
    }
  };
  
  const handleJobClick = (id: string) => {
    navigate(`/worker/job/${id}`);
  };
  
  const filterJobs = (query: string) => {
    setSearchQuery(query);
    // Note: We don't need to manually filter here since we're using real-time data
    // The search query will be applied in the UI rendering
  };

  // Helper function to format posted time
  const formatPostedTime = (date?: Date) => {
    if (!date) return "";
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredJobs = searchQuery 
    ? jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

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
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
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
                  filterJobs(e.target.value);
                }}
              />
            </div>
            <Button 
              variant={location ? "default" : "outline"}
              size="icon"
              className={location ? "bg-worker text-white" : ""}
              onClick={() => {
                if (location) {
                  toast.info(`Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`);
                } else {
                  toast.info("Requesting your location...");
                }
              }}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container pb-4 pt-6 px-4">
        {locationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>
              {locationError}. Please enable location access to see nearby jobs.
            </AlertDescription>
          </Alert>
        )}
        
        {locationLoading && (
          <div className="text-center py-4">
            <p>Getting your location...</p>
          </div>
        )}
        
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading jobs near you...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
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
