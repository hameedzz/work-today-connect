
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ArrowRight, Briefcase, Search, DollarSign, MapPin, MessageSquare, Star } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const navigate = useNavigate();

  // This simulates checking if the user is already logged in
  useEffect(() => {
    // If user is logged in, redirect to their dashboard
    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // const userRole = localStorage.getItem("userRole");
    // if (isLoggedIn === "true" && userRole) {
    //   navigate(`/${userRole}/dashboard`);
    // }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b py-4">
        <div className="container flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="hidden sm:flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate("/role-select")}
                className="bg-gradient-to-r from-worker to-employer text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="container flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  Find Daily Work & Skilled Workers
                  <span className="block bg-gradient-to-r from-worker to-employer bg-clip-text text-transparent"> On Demand</span>
                </h1>
                <p className="text-lg text-gray-600">
                  DailyWageConnect brings together workers and employers in real-time, providing instant job opportunities and skilled labor.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/role-select")} 
                  className="bg-gradient-to-r from-worker to-employer text-white"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="/placeholder.svg" 
                alt="Daily Wage Connect" 
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it simple to find work or hire workers for daily jobs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-worker-light rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-worker" />
                </div>
                <h3 className="text-xl font-medium mb-2">Find Daily Work</h3>
                <p className="text-gray-600">
                  Workers can browse available jobs near them and apply instantly. Receive notifications when jobs match your skills.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-employer-light rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-employer" />
                </div>
                <h3 className="text-xl font-medium mb-2">Post Jobs</h3>
                <p className="text-gray-600">
                  Employers can post job requirements and find available workers in their area. The matching happens in real-time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="h-12 w-12 bg-gradient-to-br from-worker-light to-employer-light rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
                <p className="text-gray-600">
                  Our secure payment system ensures fair and timely compensation for completed work with full transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to connect workers and employers efficiently
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-worker-light rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-worker" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location-Based Matching</h3>
                  <p className="text-sm text-gray-600">Find jobs or workers near your location</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-employer-light rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5 text-employer" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Real-time Communication</h3>
                  <p className="text-sm text-gray-600">Chat directly with workers or employers</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-gradient-to-br from-worker-light to-employer-light rounded-full flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ratings & Reviews</h3>
                  <p className="text-sm text-gray-600">Build trust with transparent feedback</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-worker-light rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-worker" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Navigation Support</h3>
                  <p className="text-sm text-gray-600">Get directions to job locations easily</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-employer-light rounded-full flex items-center justify-center shrink-0">
                  <DollarSign className="h-5 w-5 text-employer" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Digital Payments</h3>
                  <p className="text-sm text-gray-600">Secure and instant payment processing</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="h-10 w-10 bg-gradient-to-br from-worker-light to-employer-light rounded-full flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Job History</h3>
                  <p className="text-sm text-gray-600">Track all your past work and payments</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col items-center sm:items-start">
              <Logo size="sm" />
              <p className="text-sm text-gray-500 mt-2">
                Connecting workers and employers instantly
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-gray-500">
                © 2025 DailyWageConnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
