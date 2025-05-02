
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";

const WorkerRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Mock successful registration
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "worker");
        navigate("/worker/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="p-4 bg-white border-b">
        <div className="container">
          <Logo />
        </div>
      </header>

      <main className="flex-1 container max-w-md py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-semibold">Worker Registration</h1>
            <p className="text-muted-foreground">
              Step {step} of 3: {step === 1 
                ? "Personal Information" 
                : step === 2 
                ? "Skills & Experience" 
                : "Location & Availability"}
            </p>
            
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div 
                className="bg-worker h-2 rounded-full" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select defaultValue="male">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Construction", "Carpentry", "Plumbing", "Electrical", "Painting", "Cleaning", "Loading/Unloading", "Gardening"].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox id={skill} />
                      <Label htmlFor={skill} className="text-sm font-normal">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select defaultValue="1-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">About Yourself</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Briefly describe your work experience" 
                  className="resize-none h-24"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="area">Work Area</Label>
                <Input id="area" placeholder="Enter your preferred work area" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="distance">Maximum Travel Distance (km)</Label>
                <Input id="distance" type="number" placeholder="e.g. 10" />
              </div>
              
              <div className="space-y-2">
                <Label>Available Days</Label>
                <div className="grid grid-cols-4 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox id={day} />
                      <Label htmlFor={day} className="text-sm font-normal">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Expected Daily Wage (₹)</Label>
                <Select defaultValue="500-700">
                  <SelectTrigger>
                    <SelectValue placeholder="Select wage range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300-500">₹300-500</SelectItem>
                    <SelectItem value="500-700">₹500-700</SelectItem>
                    <SelectItem value="700-1000">₹700-1000</SelectItem>
                    <SelectItem value="1000+">₹1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate("/role-select")}>
                Change Role
              </Button>
            )}
            
            <Button 
              onClick={handleContinue}
              className="btn-worker"
              disabled={loading}
            >
              {loading ? "Processing..." : step < 3 ? "Continue" : "Complete Registration"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkerRegistration;
