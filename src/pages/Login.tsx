
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LoginContainer } from "@/components/auth/LoginContainer";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginForm } from "@/components/auth/LoginForm";
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
          <LoginForm role="worker" />
        </TabsContent>
        
        <TabsContent value="employer">
          <LoginForm role="employer" />
        </TabsContent>
      </Tabs>
    </LoginContainer>
  );
};

export default Login;
