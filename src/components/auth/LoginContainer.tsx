
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";

interface LoginContainerProps {
  children: ReactNode;
}

export const LoginContainer = ({ children }: LoginContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container flex justify-between items-center">
          <Logo />
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md shadow-md border-0">
          {children}
        </Card>

        <div className="mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")} 
            className="text-muted-foreground"
          >
            Back to home
          </Button>
        </div>
      </main>
    </div>
  );
};
