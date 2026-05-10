import { motion } from 'framer-motion';
import { Search, Filter, SortDesc, MapPin, Calendar, Users, Wallet, ArrowRight, MoreHorizontal, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const trips = [
  {
    id: 1,
    title: "Golden Triangle India",
    destination: "Delhi, Agra, Jaipur",
    dates: "May 10 - May 20, 2026",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    budget: 4500,
    spent: 1200,
    travelers: 2,
    overview: "Exploring the historical landmarks of Northern India."
  },
  {
    id: 3,
    title: "Ha Long Bay Escape",
    destination: "Ha Long, Vietnam",
    dates: "Nov 5 - Nov 12, 2026",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
    budget: 2500,
    spent: 0,
    travelers: 3,
    overview: "Cruising through the emerald waters of Ha Long Bay."
  },
  {
    id: 4,
    title: "Kerala Backwaters",
    destination: "Kerala, India",
    dates: "Jan 10 - Jan 20, 2025",
    status: "completed",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    budget: 5000,
    spent: 4850,
    travelers: 4,
    overview: "Relaxing in the serene backwaters of God's Own Country."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function TripList() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ongoing': return 'bg-success/20 text-success border-success/30';
      case 'upcoming': return 'bg-primary/20 text-primary border-primary/30';
      case 'completed': return 'bg-muted border-border text-muted-foreground';
      default: return '';
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header (Screen 6) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">My Trips</h1>
          <p className="text-muted-foreground font-medium">Manage and track your travel adventures</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="Search trips..." className="pl-10 h-12 bg-card/50 border-border/50 rounded-xl" />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-card/50 border-border/50">
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold">
            <Plus className="w-4 h-4 mr-2" /> New Trip
          </Button>
        </div>
      </div>

      {/* Sections: Ongoing, Upcoming, Completed (Screen 6) */}
      {['ongoing', 'upcoming', 'completed'].map(section => {
        const sectionTrips = trips.filter(t => t.status === section);
        if (sectionTrips.length === 0) return null;

        return (
          <div key={section} className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-black capitalize tracking-tight">{section}</h2>
              <Badge variant="secondary" className="bg-card border-border/50 font-black px-3 py-0.5">{sectionTrips.length}</Badge>
              <div className="h-px flex-1 bg-border/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectionTrips.map(trip => (
                <motion.div key={trip.id} variants={cardVariants} whileHover={{ y: -8 }}>
                  <Card className="overflow-hidden bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 transition-all cursor-pointer group shadow-2xl h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={trip.image} 
                        alt={trip.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className={`uppercase text-[10px] font-black tracking-widest px-2.5 py-1 ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/20 backdrop-blur-md text-white hover:bg-background/40">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-xl font-black group-hover:text-primary transition-colors leading-tight line-clamp-1">{trip.title}</h3>
                        <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed italic opacity-80">
                          "{trip.overview}"
                        </p>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 mr-2 text-primary" />
                          {trip.destination}
                        </div>
                        <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5 mr-2 text-primary" />
                          {trip.dates}
                        </div>
                      </div>

                      <div className="bg-background/40 rounded-2xl p-4 space-y-3 border border-border/20">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                          <span className="text-muted-foreground">Budget Used</span>
                          <span className="text-primary">${trip.spent} / ${trip.budget}</span>
                        </div>
                        <Progress value={(trip.spent / trip.budget) * 100} className="h-2 rounded-full bg-secondary/30" />
                      </div>

                      <Button variant="ghost" className="w-full mt-2 rounded-xl font-bold group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        View Trip Details <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
