import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SiGoogle } from "react-icons/si";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    if (values.email.toLowerCase().includes("organizer") || values.email.toLowerCase().includes("org@")) {
      setLocation("/organizer");
    } else {
      setLocation("/attendee");
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <span className="text-white font-bold text-lg leading-none">E</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">EventSphere</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Log in to your account to continue</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border-white/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-white">Email Address</Label>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Password</Label>
                      <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Forgot Password?
                      </a>
                    </div>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] h-11" data-testid="button-login">
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Or continue with</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <Button type="button" variant="outline" className="w-full mt-6 border-white/20 text-white hover:bg-white/10 hover:text-white h-11">
            <SiGoogle className="w-4 h-4 mr-2" />
            Google
          </Button>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/role-select" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}