
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ArrowRight, Briefcase, Search, DollarSign } from "lucide-react";
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
      <header className="p-4">
        <div className="container flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/login")}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="container flex-1 flex flex-col justify-center items-center text-center px-4 py-12">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Connect with work opportunities
              <span className="bg-gradient-to-r from-worker to-employer bg-clip-text text-transparent"> instantly</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find daily wage work or hire skilled workers near you with DailyWageConnect - the fastest way to connect workers and employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </section>

        <section className="bg-muted py-12">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-worker-light rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-worker" />
                </div>
                <h3 className="text-xl font-medium mb-2">Find Daily Work</h3>
                <p className="text-muted-foreground">
                  Browse hundreds of daily wage jobs near your location and apply instantly.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-employer-light rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-employer" />
                </div>
                <h3 className="text-xl font-medium mb-2">Hire Workers</h3>
                <p className="text-muted-foreground">
                  Post jobs and find skilled workers available to start immediately.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-gradient-to-br from-worker-light to-employer-light rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Transparent payment system with no delays or complications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-6">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
              © 2025 DailyWageConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
