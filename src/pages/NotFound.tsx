
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <div className="container">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
          <p className="text-muted-foreground mt-2">
            We couldn't find the page you were looking for: 
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded ml-1">
              {location.pathname}
            </span>
          </p>
          
          <Button
            onClick={() => navigate("/")}
            className="mt-8 gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
