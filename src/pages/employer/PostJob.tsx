
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
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Job posted successfully!");
      navigate("/employer/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
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
          <h1 className="font-medium">Post New Job</h1>
        </div>
      </header>

      <main className="flex-1 container py-6 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Construction Helper Needed" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Job Category</Label>
            <Select required defaultValue="construction">
              <SelectTrigger>
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="carpentry">Carpentry</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="loading">Loading/Unloading</SelectItem>
                <SelectItem value="gardening">Gardening</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Job Location</Label>
            <Input 
              id="location" 
              placeholder="e.g., Andheri East, Mumbai" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea 
              id="address" 
              placeholder="Detailed address where workers need to report" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workers">Number of Workers</Label>
              <Input 
                id="workers" 
                type="number" 
                min="1" 
                placeholder="e.g., 2" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Job Duration</Label>
              <Select required defaultValue="full_day">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half_day">Half day (4 hours)</SelectItem>
                  <SelectItem value="full_day">Full day (8 hours)</SelectItem>
                  <SelectItem value="custom">Custom hours</SelectItem>
                  <SelectItem value="multiple_days">Multiple days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Start Date</Label>
              <Input 
                id="date" 
                type="date" 
                min={new Date().toISOString().split('T')[0]} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Input 
                id="time" 
                type="time" 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wage">Daily Wage (₹)</Label>
              <Input 
                id="wage" 
                type="number" 
                min="100" 
                placeholder="e.g., 600" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment">Payment Method</Label>
              <Select required defaultValue="cash">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the job requirements, skills needed, and any other details" 
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full btn-employer"
              disabled={loading}
            >
              {loading ? "Posting Job..." : "Post Job"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;
