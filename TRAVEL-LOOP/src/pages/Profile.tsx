import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { User, Mail, Phone, MapPin, Camera, Edit2, Settings, Shield, Bell, LogOut, Plane, History, Heart, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const preplannedTrips = [
  { name: "Taj Mahal Sunset", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400&auto=format&fit=crop", date: "Oct 2026" },
  { name: "Ha Long Bay Cruise", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400&auto=format&fit=crop", date: "Nov 2026" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Profile Header (Screen 7) */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>
        
        <div className="px-8 -mt-16 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-background shadow-2xl rounded-3xl">
                <AvatarImage src={user?.avatar} crossOrigin="anonymous" />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="pb-2 space-y-1 text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tight">{user?.name || 'User'}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-sm text-muted-foreground font-medium">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-primary" /> New York, NY</span>
                <span>•</span>
                <span className="text-primary font-bold">{user?.role === 'admin' ? 'Admin' : 'Explorer'} Tier</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pb-2">
            <Button variant="outline" className="rounded-xl h-11 border-border/50 bg-card/50 backdrop-blur-md">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
            <Button className="rounded-xl h-11 bg-primary hover:bg-primary/90 text-white font-bold px-6">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Details (Screen 7 Requirement) */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl shadow-2xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: user?.email || "alex.danvers@example.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
                  { icon: Shield, label: "Member Since", value: "January 2024" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-primary/5 transition-colors group">
                    <div className="p-2.5 bg-muted rounded-xl text-muted-foreground group-hover:text-primary transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl font-bold"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none rounded-3xl shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center space-y-1">
                  <p className="text-3xl font-black text-primary">24</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Countries</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-3xl font-black text-accent">152</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Trip Lists (Screen 7 Requirement) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Preplanned Trips */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center">
                <Star className="w-6 h-6 mr-3 text-primary" />
                Preplanned Trips
              </h2>
              <Button variant="ghost" size="sm" className="font-bold text-muted-foreground">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {preplannedTrips.map((trip, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl cursor-pointer"
                >
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-black text-white">{trip.name}</h3>
                      <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{trip.date}</p>
                    </div>
                    <Button size="sm" className="rounded-xl bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-black font-bold border-none transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                      View Plan
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Previous Trips */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center">
                <History className="w-6 h-6 mr-3 text-accent" />
                Previous Trips
              </h2>
              <Button variant="ghost" size="sm" className="font-bold text-muted-foreground">History</Button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Paris Adventure", date: "May 2025", location: "France", rating: 4.9 },
                { name: "Swiss Alps Ski", date: "Jan 2025", location: "Switzerland", rating: 5.0 },
              ].map((trip, i) => (
                <Card key={i} className="bg-card/40 backdrop-blur-md border-border/40 rounded-2xl hover:border-primary/30 transition-all cursor-pointer group shadow-lg">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Plane className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg leading-tight group-hover:text-primary transition-colors">{trip.name}</h4>
                        <div className="flex items-center text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
                          <MapPin className="w-3 h-3 mr-1" /> {trip.location} • {trip.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center justify-end text-sm font-black">
                          <Star className="w-3.5 h-3.5 mr-1 text-warning fill-warning" />
                          {trip.rating}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Rating</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl group-hover:text-primary">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
