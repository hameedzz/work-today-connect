
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface LoginHeaderProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export const LoginHeader = ({ 
  title = "Welcome Back", 
  description = "Sign in to your account to continue",
  children 
}: LoginHeaderProps) => {
  return (
    <CardHeader className="space-y-1 pb-2 text-center">
      <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        {description}
      </CardDescription>
      {children}
    </CardHeader>
  );
};
