
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, DollarSign, ChevronLeft, Phone, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getJobById, applyForJob } from "@/services/jobService";
import { getUserProfile } from "@/services/authService";
import Map from "@/components/Map";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [employer, setEmployer] = useState<any>(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      
      try {
        // Fetch job details
        const jobData = await getJobById(id);
        
        if (jobData) {
          setJob(jobData);
          
          // Fetch employer profile
          if (jobData.employerId) {
            const employerProfile = await getUserProfile(jobData.employerId);
            setEmployer(employerProfile);
          }
          
          // Check if user already applied
          // In a real app, you would check against existing applications
          setApplied(false); // This would be based on a real check
        } else {
          toast.error("Job not found");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id, navigate]);

  const handleApply = async () => {
    if (!currentUser) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    
    if (!id) return;
    
    try {
      await applyForJob(id, currentUser.uid);
      setApplied(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Failed to submit application");
    }
  };
  
  const handleCall = () => {
    if (employer?.phone) {
      window.open(`tel:${employer.phone}`);
    } else {
      toast.info("Phone number not available");
    }
  };
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Today";
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return "Today";
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Job not found</p>
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 pb-16">
      <header className="sticky top-0 bg-white z-30 border-b">
        <div className="container py-3 px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium">Job Details</h1>
        </div>
      </header>
    
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-white p-4 border-b">
          <h1 className="text-xl font-semibold">{job.title}</h1>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location?.address || "Location unavailable"}</span>
            {job.distance && (
              <>
                <span className="px-1">•</span>
                <span>{job.distance} away</span>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-muted/50">
              {job.category}
            </Badge>
            <Badge variant="outline" className="bg-muted/50 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(job.date || job.createdAt)}
            </Badge>
            {job.timing && (
              <Badge variant="outline" className="bg-muted/50 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.timing}
              </Badge>
            )}
          </div>
          
          <div className="mt-4 px-4 py-3 bg-white rounded-lg border border-worker/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-lg font-semibold">
                  {job.currency || "₹"} {job.wage}
                  <span className="text-xs font-normal text-muted-foreground">/day</span>
                </div>
                <div className="text-xs text-muted-foreground">Cash payment after work</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {job.duration}
            </div>
          </div>
        </div>
        
        {/* Description Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <p className="text-sm text-muted-foreground">
            {job.description}
          </p>
          
          {job.requirements && job.requirements.length > 0 && (
            <>
              <h3 className="font-semibold mt-4 mb-2">Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        {/* Location Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-2">Job Location</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {job.location?.address || "Address unavailable"}
          </p>
          
          {job.location?.geopoint ? (
            <Map
              center={[job.location.geopoint.latitude, job.location.geopoint.longitude]}
              zoom={15}
              height="180px"
              markers={[
                {
                  position: [job.location.geopoint.latitude, job.location.geopoint.longitude],
                  title: job.title,
                  type: "job"
                }
              ]}
              showCurrentLocation={true}
            />
          ) : (
            <div 
              className="h-32 bg-muted rounded-lg flex items-center justify-center"
            >
              <MapPin className="h-6 w-6 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Location unavailable</span>
            </div>
          )}
        </div>
        
        {/* Employer Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-3">About the Employer</h2>
          
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={employer?.avatarUrl} />
              <AvatarFallback>{(employer?.companyName || employer?.fullName || "").substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium">{employer?.companyName || employer?.fullName || "Employer"}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="flex items-center">
                  ★ {employer?.rating || "New"}
                </span>
                <span className="mx-2">•</span>
                <span>{employer?.jobsPosted || 0} jobs posted</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3 z-20">
        <div className="container flex items-center gap-2">
          <Button 
            variant="outline"
            className="flex-1 flex items-center gap-2"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4" />
            Call
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1 flex items-center gap-2"
            onClick={() => toast.info("Chat feature will be available soon!")}
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          
          <Button 
            className="flex-1 btn-worker"
            disabled={applied}
            onClick={handleApply}
          >
            {applied ? "Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default JobDetails;
