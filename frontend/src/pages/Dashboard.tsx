import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, MapPin, Search, ArrowRight, Plane, Calendar, Wallet } from 'lucide-react';

const regionalSelections = [
  { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop", match: "98%" },
  { name: "Amalfi Coast, Italy", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop", match: "94%" },
  { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=600&auto=format&fit=crop", match: "91%" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop", match: "89%" },
];

// We will fetch previousTrips from the API now

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>(regionalSelections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tripsRes, analyticsRes] = await Promise.all([
          api.get('/trips'),
          api.get('/admin/analytics')
        ]);
        
        setTrips(tripsRes.data.data.slice(0, 2));
        
        if (analyticsRes.data.data && analyticsRes.data.data.topCities) {
          const cities = Object.entries(analyticsRes.data.data.topCities).map(([name, count]) => ({
            name,
            image: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&${name}`, // Placeholder with name seed
            match: `${90 + Math.floor(Math.random() * 10)}%`
          }));
          if (cities.length > 0) setTrending(cities);
        }
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className="space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Banner Section (Screen 3) */}
      <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden h-[400px] shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex flex-col justify-center p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Explore the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hidden Gems</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mb-8">
              Plan your dream vacation with our AI-powered travel assistant. Optimized for your budget and preferences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate('/create-trip')}
                size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-2xl shadow-xl shadow-primary/20">
                <Sparkles className="w-5 h-5 mr-2" />
                Plan New Trip
              </Button>
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Where do you want to go?"
                  className="w-full h-14 pl-12 bg-background/50 backdrop-blur-md border-border/50 rounded-2xl focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Top Regional Selections (Screen 3) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center tracking-tight">
            <MapPin className="w-6 h-6 mr-2 text-primary" />
            Top Regional Selections
          </h2>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            See All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((dest, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => navigate('/create-trip', { state: { destination: dest.name } })}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg"
            >
              <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded-md bg-success/20 text-success text-[10px] font-bold border border-success/20">
                        {dest.match} Match
                      </span>
                    </div>
                  </div>
                  <Button size="icon" className="rounded-full bg-primary/90 hover:bg-primary backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Previous Trips (Screen 3) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center tracking-tight">
            <Plane className="w-6 h-6 mr-2 text-accent" />
            Previous Trips
          </h2>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            View History
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trips.length === 0 ? (
            <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed border-border/50 rounded-xl">
              No trips found. Plan a new adventure below!
            </div>
          ) : trips.map((trip, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              onClick={() => {
                localStorage.setItem('last_active_trip_id', trip.id.toString());
                navigate(`/itinerary/${trip.id}`);
              }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all cursor-pointer group shadow-xl">
                <div className="flex h-40">
                  <div className="w-1/3 overflow-hidden bg-muted flex items-center justify-center">
                    {trip.coverPhotoUrl ? (
                      <img src={trip.coverPhotoUrl} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <Plane className="w-10 h-10 text-muted-foreground opacity-50" />
                    )}
                  </div>
                  <CardContent className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{trip.title}</h3>
                    <div className="flex items-center text-muted-foreground space-x-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {trip.startDate}
                      </div>
                      <div className="flex items-center text-sm">
                        <Wallet className="w-4 h-4 mr-1.5" />
                        ${trip.budgetLimit} budget
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
          <motion.div
            onClick={() => navigate('/create-trip')}
            variants={itemVariants} className="flex items-center justify-center border-2 border-dashed border-border/50 rounded-2xl hover:bg-accent/5 transition-colors cursor-pointer group h-40">
            <div className="text-center">
              <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Plan a new trip</span>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
