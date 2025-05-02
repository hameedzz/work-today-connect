
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, DollarSign, ChevronLeft, Phone, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { toast } from "sonner";

// Mock job data for demonstration
const mockJob = {
  id: "1",
  title: "Construction Helper Needed",
  location: "Andheri East, Mumbai",
  address: "Near Metro Station, Andheri East, Mumbai - 400069",
  wage: 600,
  currency: "₹",
  distance: "2.5 km",
  duration: "Full day",
  timing: "8:00 AM - 5:00 PM",
  category: "Construction",
  postedAt: "2 hours ago",
  description: "Looking for construction helpers for a building site. Work includes carrying materials, mixing cement, and assisting skilled workers. Experience preferred but not required. Daily payment available.",
  requirements: [
    "Physical fitness required",
    "Should be able to lift up to 25kg",
    "Basic knowledge of construction tools",
    "Safety gear will be provided"
  ],
  employer: {
    name: "Raj Construction",
    rating: 4.2,
    jobsPosted: 15,
    avatar: ""
  }
};

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    toast.success("Application submitted successfully!");
  };
  
  const handleCall = () => {
    toast.info("Call feature will be available in the next update!");
  };

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
          <h1 className="text-xl font-semibold">{mockJob.title}</h1>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{mockJob.location}</span>
            <span className="px-1">•</span>
            <span>{mockJob.distance} away</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="bg-muted/50">
              {mockJob.category}
            </Badge>
            <Badge variant="outline" className="bg-muted/50 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Today
            </Badge>
            <Badge variant="outline" className="bg-muted/50 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {mockJob.timing}
            </Badge>
          </div>
          
          <div className="mt-4 px-4 py-3 bg-white rounded-lg border border-worker/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <div className="text-lg font-semibold">
                  {mockJob.currency} {mockJob.wage}
                  <span className="text-xs font-normal text-muted-foreground">/day</span>
                </div>
                <div className="text-xs text-muted-foreground">Cash payment after work</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {mockJob.duration}
            </div>
          </div>
        </div>
        
        {/* Description Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <p className="text-sm text-muted-foreground">
            {mockJob.description}
          </p>
          
          <h3 className="font-semibold mt-4 mb-2">Requirements</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            {mockJob.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Location Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-2">Job Location</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {mockJob.address}
          </p>
          
          <div 
            className="h-32 bg-muted rounded-lg flex items-center justify-center"
            onClick={() => toast.info("Maps will be integrated in the next update!")}
          >
            <MapPin className="h-6 w-6 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Map view coming soon</span>
          </div>
        </div>
        
        {/* Employer Section */}
        <div className="p-4 bg-white mt-2 border-t border-b">
          <h2 className="font-semibold text-lg mb-3">About the Employer</h2>
          
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={mockJob.employer.avatar} />
              <AvatarFallback>{mockJob.employer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium">{mockJob.employer.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="flex items-center">
                  ★ {mockJob.employer.rating}
                </span>
                <span className="mx-2">•</span>
                <span>{mockJob.employer.jobsPosted} jobs posted</span>
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
            onClick={() => toast.info("Chat feature will be available in the next update!")}
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
