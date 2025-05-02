
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronLeft, 
  Settings, 
  UserCircle, 
  Clock, 
  Bell,
  LogOut,
  Moon,
  Languages
} from "lucide-react";
import MobileNavbar from "@/components/layout/MobileNavbar";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "sonner";

// Mock user data
const userData = {
  name: "Rajesh Kumar",
  role: "worker", // or "employer"
  avatar: "",
  location: "Andheri East, Mumbai",
  jobsCompleted: 12,
  joinedDate: "August 2023",
  rating: 4.2,
};

const Profile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [userRole] = useState<"worker" | "employer">(
    localStorage.getItem("userRole") as "worker" | "employer" || "worker"
  );

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    toast.info(enabled ? "Dark mode enabled" : "Dark mode disabled");
    // In a real app, would update theme here
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    
    // Navigate to home
    navigate("/");
    toast.success("Logged out successfully");
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
          <h1 className="font-medium">Profile</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="p-6 bg-white border-b flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback>
              {userData.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-muted-foreground">
              {userData.location}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge-${userRole} px-2 py-0.5 rounded-full text-xs`}>
                {userRole === "worker" ? "Worker" : "Employer"}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                ★ {userData.rating}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-medium flex items-center mb-4">
                  <UserCircle className="h-5 w-5 mr-2" />
                  Account Info
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span>{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{userData.joinedDate}</span>
                  </div>
                  {userRole === "worker" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jobs Completed</span>
                      <span>{userData.jobsCompleted}</span>
                    </div>
                  )}
                  {userRole === "employer" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jobs Posted</span>
                      <span>{userData.jobsCompleted}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>
              </div>
              
              {userRole === "worker" && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    Work History
                  </h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((job) => (
                      <div key={job} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Construction Helper</h4>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Raj Construction</p>
                        <div className="flex justify-between mt-1 text-sm">
                          <span>₹600 / day</span>
                          <span className="text-green-600">Completed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-muted-foreground"
                    onClick={() => navigate("/worker/history")}
                  >
                    View All History
                  </Button>
                </div>
              )}
              
              {userRole === "employer" && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    Job Postings
                  </h3>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((job) => (
                      <div key={job} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Construction Workers Needed</h4>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Andheri East, Mumbai</p>
                        <div className="flex justify-between mt-1 text-sm">
                          <span>5 applications</span>
                          <span className="text-green-600">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-muted-foreground"
                    onClick={() => navigate("/employer/job-history")}
                  >
                    View All Postings
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4 space-y-4">
              <div className="bg-white p-4 rounded-lg border space-y-4">
                <h3 className="font-medium mb-2">App Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-3" />
                    <span>Dark Mode</span>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                  </div>
                  <Switch 
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Languages className="h-5 w-5 mr-3" />
                    <span>Language</span>
                  </div>
                  <LanguageSelector />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Help & Support</h3>
                <Button variant="ghost" className="w-full justify-start text-left" onClick={() => {}}>
                  Contact Support
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left" onClick={() => {}}>
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left" onClick={() => {}}>
                  Terms of Service
                </Button>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-medium mb-3 text-red-500">Account</h3>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-left text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MobileNavbar />
    </div>
  );
};

export default Profile;
