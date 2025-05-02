
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

const Logo = ({ className, size = "md", variant = "default" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const textColor = variant === "light" ? "text-white" : "text-primary";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-worker to-employer opacity-75 blur"></div>
        <div className="relative bg-white rounded-full p-1 z-10">
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center">
            <span className="font-bold text-primary text-sm sm:text-base">DW</span>
          </div>
        </div>
      </div>
      <span className={`font-bold ${sizeClasses[size]} ${textColor}`}>
        DailyWage<span className="text-secondary">Connect</span>
      </span>
    </div>
  );
};

export default Logo;
