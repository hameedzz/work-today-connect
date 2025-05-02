
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { ArrowRight } from "lucide-react";
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
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 flex-grow">
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
                  onClick={() => navigate("/login")} 
                  className="bg-gradient-to-r from-worker to-employer text-white"
                >
                  Login Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/role-select")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="/lovable-uploads/3a563b67-6a14-4e5e-b1f6-2f197a0e6936.png" 
                alt="Daily Wage Connect" 
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                  console.error("Image failed to load, using placeholder");
                }}
              />
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
