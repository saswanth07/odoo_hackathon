import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Info, ArrowRight, Camera, PlaneTakeoff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function Register() {
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await authRegister(data);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden py-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl px-4 z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20"
          >
            <PlaneTakeoff className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Join Traveloop</h1>
          <p className="text-muted-foreground mt-2">Start your journey with us today</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border group-hover:border-primary transition-colors overflow-hidden">
                    <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg hover:bg-primary/90 transition-all">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <Label className="text-xs text-muted-foreground">Upload Profile Photo</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="firstName" placeholder="Alex" className="pl-10 bg-background/50" {...register('firstName')} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="lastName" placeholder="Doe" className="pl-10 bg-background/50" {...register('lastName')} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="alex@example.com" className="pl-10 bg-background/50" {...register('email')} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10 bg-background/50" {...register('phone')} />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="city" placeholder="New York, NY" className="pl-10 bg-background/50" {...register('city')} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="info">Additional Information</Label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea 
                    id="info" 
                    placeholder="Tell us about your travel preferences..." 
                    className="min-h-[100px] w-full rounded-md border border-input bg-background/50 px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('info')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg">
                Create Account <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline transition-all">
                  Login instead
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
