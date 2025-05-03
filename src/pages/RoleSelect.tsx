
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";
import { Briefcase, User, ArrowLeft } from "lucide-react";

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "worker" | "employer") => {
    localStorage.setItem("userRole", role);
    navigate(`/${role}/register`);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <div className="container flex justify-between items-center">
          <Logo />
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">
            Select Your Role
          </h1>
          
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => handleRoleSelect("worker")}
              className="relative flex flex-col items-center p-8 border-2 rounded-xl hover:border-worker transition-colors bg-white"
            >
              <div className="h-16 w-16 bg-worker-light rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-worker" />
              </div>
              <h2 className="text-xl font-medium mb-2">I'm a Worker</h2>
              <p className="text-center text-muted-foreground">
                Find daily wage jobs near you
              </p>
            </button>
            
            <button
              onClick={() => handleRoleSelect("employer")}
              className="relative flex flex-col items-center p-8 border-2 rounded-xl hover:border-employer transition-colors bg-white"
            >
              <div className="h-16 w-16 bg-employer-light rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-employer" />
              </div>
              <h2 className="text-xl font-medium mb-2">I'm an Employer</h2>
              <p className="text-center text-muted-foreground">
                Hire skilled workers for your jobs
              </p>
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={handleBackToLogin}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelect;
