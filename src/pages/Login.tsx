
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"worker" | "employer">("worker");
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
      rememberMe: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: LoginValues) => {
    // In a real app, you'd make an API call here
    console.log("Login values:", values, "User type:", activeTab);
    
    // For demo purposes
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", activeTab);
    
    toast.success(`Logged in as ${activeTab}`);
    
    // Redirect based on role
    navigate(`/${activeTab}/dashboard`);
  };

  const handleSignUp = () => {
    navigate("/role-select");
  };

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
          <CardHeader className="space-y-1 pb-2 text-center">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "worker" | "employer")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4 mx-6 bg-gray-100">
              <TabsTrigger 
                value="worker" 
                className="data-[state=active]:bg-worker data-[state=active]:text-white transition-all"
              >
                I'm a Worker
              </TabsTrigger>
              <TabsTrigger 
                value="employer"
                className="data-[state=active]:bg-employer data-[state=active]:text-white transition-all" 
              >
                I'm an Employer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="worker">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your phone number" 
                              type="tel" 
                              {...field}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-10 h-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <Link to="/forgot-password" className="text-sm text-worker hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      type="submit" 
                      className="w-full h-10 bg-worker hover:bg-worker-dark"
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="text-center mt-2">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button 
                          variant="link" 
                          onClick={handleSignUp} 
                          className="p-0 h-auto text-worker font-medium hover:underline"
                        >
                          Sign Up
                        </Button>
                      </p>
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="employer">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your phone number" 
                              type="tel" 
                              {...field}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-10 h-10"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <Link to="/forgot-password" className="text-sm text-employer hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      type="submit" 
                      className="w-full h-10 bg-employer hover:bg-employer-dark"
                    >
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="text-center mt-2">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button 
                          variant="link" 
                          onClick={handleSignUp} 
                          className="p-0 h-auto text-employer font-medium hover:underline"
                        >
                          Sign Up
                        </Button>
                      </p>
                    </div>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
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

export default Login;
