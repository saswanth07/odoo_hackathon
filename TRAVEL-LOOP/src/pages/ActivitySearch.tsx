import { motion } from 'framer-motion';
import { Search, Filter, SortDesc, Users, Star, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    title: "Taj Mahal Sunrise Tour",
    location: "Agra, India",
    rating: 4.9,
    reviews: 2450,
    price: 35,
    category: "Culture",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Ha Long Bay Day Cruise",
    location: "Quang Ninh, Vietnam",
    rating: 4.8,
    reviews: 1800,
    price: 85,
    category: "Nature",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Pink City Walk",
    location: "Jaipur, India",
    rating: 4.7,
    reviews: 1200,
    price: 20,
    category: "History",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop"
  }
];

const people = [
  { name: "Alex Chen", role: "Local Guide", rating: 5.0, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { name: "Sarah Miller", role: "Food Blogger", rating: 4.9, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
];

export default function ActivitySearch() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Search Header (Screen 8) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Explore Activities</h1>
            <p className="text-muted-foreground font-medium">Find the best experiences in India and Vietnam</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/50">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/50">
              <SortDesc className="w-4 h-4 mr-2" /> Sort By
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search for temples, food tours, guides..." 
            className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content: Activities (Screen 8) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black flex items-center tracking-tight">
              <Tag className="w-5 h-5 mr-2 text-primary" />
              Popular Results
            </h2>
            <span className="text-sm font-bold text-muted-foreground">128 Results</span>
          </div>

          <div className="space-y-6">
            {activities.map((activity, i) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 transition-all cursor-pointer group shadow-xl">
                  <div className="flex flex-col sm:flex-row h-full sm:h-48">
                    <div className="w-full sm:w-64 h-48 sm:h-full overflow-hidden relative">
                      <img 
                        src={activity.image} 
                        alt={activity.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        crossOrigin="anonymous"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none font-bold">
                          {activity.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="flex-1 p-6 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{activity.title}</h3>
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">From</p>
                            <p className="text-lg font-black text-primary">${activity.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-medium">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                            {activity.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1.5 text-warning fill-warning" />
                            {activity.rating} ({activity.reviews})
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((_, j) => (
                            <div key={j} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${j}`} alt="User" />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                            +12
                          </div>
                        </div>
                        <Button className="rounded-xl font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                          Book Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Recommended People (Screen 8) */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl rounded-3xl overflow-hidden sticky top-24">
            <CardContent className="p-8 space-y-8">
              <h3 className="font-black text-xl tracking-tight flex items-center">
                <Users className="w-5 h-5 mr-3 text-primary" />
                Local Experts
              </h3>
              
              <div className="space-y-6">
                {people.map((person, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-border/50 group-hover:border-primary transition-colors">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{person.name}</h4>
                        <p className="text-xs text-muted-foreground font-medium">{person.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs font-black">
                      <Star className="w-3 h-3 mr-1 text-warning fill-warning" />
                      {person.rating}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="secondary" className="w-full h-12 rounded-xl font-bold text-sm">
                Find More Guides
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
