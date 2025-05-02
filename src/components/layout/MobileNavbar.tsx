
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, User, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role] = useState<"worker" | "employer">(
    location.pathname.includes("employer") ? "employer" : "worker"
  );

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: `/${role}/dashboard`,
    },
    {
      icon: Search,
      label: role === "worker" ? "Find Jobs" : "Find Workers",
      path: role === "worker" ? "/worker/find-jobs" : "/employer/find-workers",
    },
    {
      icon: Briefcase,
      label: role === "worker" ? "My Jobs" : "Post Job",
      path: role === "worker" ? "/worker/my-jobs" : "/employer/post-job",
    },
    {
      icon: Bell,
      label: "Alerts",
      path: "/notifications",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-3",
                isActive
                  ? role === "worker" 
                    ? "text-worker" 
                    : "text-employer"
                  : "text-muted-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;
