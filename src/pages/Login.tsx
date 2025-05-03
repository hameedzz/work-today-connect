
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { WorkerLoginForm } from "@/components/auth/WorkerLoginForm";
import { EmployerLoginForm } from "@/components/auth/EmployerLoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginContainer } from "@/components/auth/LoginContainer";
import { RoleTabsSelector } from "@/components/auth/RoleTabsSelector";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"worker" | "employer">("worker");
  
  const handleRoleChange = (role: "worker" | "employer") => {
    setActiveTab(role);
  };

  return (
    <LoginContainer>
      <LoginHeader />
      
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "worker" | "employer")}
        className="w-full"
      >
        <RoleTabsSelector activeRole={activeTab} onRoleChange={handleRoleChange} />
        
        <TabsContent value="worker">
          <WorkerLoginForm />
        </TabsContent>
        
        <TabsContent value="employer">
          <EmployerLoginForm />
        </TabsContent>
      </Tabs>
    </LoginContainer>
  );
};

export default Login;
