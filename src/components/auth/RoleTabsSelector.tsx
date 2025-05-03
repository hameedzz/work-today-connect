
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoleTabsSelectorProps {
  activeRole: string;
  onRoleChange: (role: "worker" | "employer") => void;
}

export const RoleTabsSelector = ({ 
  activeRole, 
  onRoleChange 
}: RoleTabsSelectorProps) => {
  return (
    <TabsList className="grid grid-cols-2 mb-4 mx-6 bg-gray-100">
      <TabsTrigger 
        value="worker" 
        onClick={() => onRoleChange("worker")}
        className="data-[state=active]:bg-worker data-[state=active]:text-white transition-all"
      >
        I'm a Worker
      </TabsTrigger>
      <TabsTrigger 
        value="employer"
        onClick={() => onRoleChange("employer")}
        className="data-[state=active]:bg-employer data-[state=active]:text-white transition-all" 
      >
        I'm an Employer
      </TabsTrigger>
    </TabsList>
  );
};
