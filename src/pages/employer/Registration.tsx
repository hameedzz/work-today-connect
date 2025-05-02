
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
import Logo from "@/components/Logo";

const EmployerRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Mock successful registration
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "employer");
        navigate("/employer/dashboard");
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
            <h1 className="text-2xl font-semibold">Employer Registration</h1>
            <p className="text-muted-foreground">
              Step {step} of 2: {step === 1 
                ? "Contact Information" 
                : "Business Details"}
            </p>
            
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div 
                className="bg-employer h-2 rounded-full" 
                style={{ width: `${(step / 2) * 100}%` }}
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
                <Label htmlFor="email">Email (Optional)</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter your location" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business/Company Name (Optional)</Label>
                <Input id="businessName" placeholder="Enter your business name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select defaultValue="individual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="company">Company/Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workTypes">Types of Work</Label>
                <Select defaultValue="construction">
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="household">Household</SelectItem>
                    <SelectItem value="factory">Factory/Workshop</SelectItem>
                    <SelectItem value="event">Event Management</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">About Your Work Requirements</Label>
                <Textarea 
                  id="description" 
                  placeholder="Briefly describe the kind of work you typically need" 
                  className="resize-none h-24"
                />
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
              className="btn-employer"
              disabled={loading}
            >
              {loading ? "Processing..." : step < 2 ? "Continue" : "Complete Registration"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerRegistration;
