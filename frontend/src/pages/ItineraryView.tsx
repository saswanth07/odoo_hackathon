import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { MapPin, Calendar, DollarSign, ArrowLeft, MoreVertical, Map as MapIcon, Coffee, Utensils, Camera, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ItineraryView() {
  const { id: tripId } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trip, setTrip] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconForType = (type: string) => {
    switch (type) {
      case "Stay": return Coffee;
      case "Food": return Utensils;
      case "Sightseeing": return Camera;
      case "Transport": return Train;
      default: return MapPin;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (tripId) {
          localStorage.setItem('last_active_trip_id', tripId);
        }
        const tripRes = await api.get(`/trips/${tripId}`);
        setTrip(tripRes.data.data);

        const stopsRes = await api.get(`/trips/${tripId}/stops`);
        const stops = stopsRes.data.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fullItinerary = await Promise.all(stops.map(async (stop: any, index: number) => {
          const activitiesRes = await api.get(`/stops/${stop.id}/activities`);
          return {
            day: index + 1,
            title: stop.cityName,
            date: stop.arrivalDate,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            activities: activitiesRes.data.data.map((act: any) => ({
              time: act.startTime || "09:00 AM",
              task: act.name,
              cost: act.estimatedCost || 0,
              icon: getIconForType(act.category || act.type),
              type: act.category || act.type
            }))
          };
        }));

        setItinerary(fullItinerary);
      } catch (error) {
        console.error("Failed to fetch itinerary", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const categorySpending = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return itinerary.reduce((acc: any, day) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      day.activities.forEach((act: any) => {
        const type = act.type || "Other";
        acc[type] = (acc[type] || 0) + act.cost;
      });
      return acc;
    }, {});
  }, [itinerary]);

  const totalSpent = useMemo<number>(() => {
    return Object.values(categorySpending).reduce((sum: any, v: any) => sum + v, 0) as number;
  }, [categorySpending]);

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "Stay": return "bg-primary";
      case "Transport": return "bg-accent";
      case "Food": return "bg-success";
      case "Sightseeing": return "bg-warning";
      default: return "bg-muted";
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading Itinerary...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <Button onClick={() => navigate('/dashboard')} variant="ghost" size="sm" className="pl-0 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-black tracking-tight">{trip?.title}</h1>
            <Badge className="bg-success/20 text-success border-success/30 uppercase tracking-widest text-[10px] font-bold">Active</Badge>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" /> Multi-city Tour
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> {trip?.startDate} - {trip?.endDate}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => alert("Interactive Map View will be available in the next update!")}
            className="h-12 rounded-xl border-border/50"
          >
            <MapIcon className="w-4 h-4 mr-2" /> View on Map
          </Button>
          <Button onClick={() => navigate(`/build-itinerary/${tripId}`)} className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-6">
            Edit Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Timeline */}
        <div className="lg:col-span-8 space-y-12">
          {itinerary.map((dayPlan, dayIdx) => (
            <motion.div 
              key={dayPlan.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIdx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between sticky top-20 bg-background/80 backdrop-blur-md py-4 z-20">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="text-[10px] font-black uppercase tracking-tighter leading-none">Day</span>
                    <span className="text-xl font-black leading-none">{dayPlan.day}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">{dayPlan.title}</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">{dayPlan.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Daily Expense</p>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <p className="text-lg font-black text-primary">${dayPlan.activities.reduce((sum: number, a: any) => sum + a.cost, 0)}</p>
                </div>
              </div>

              <div className="space-y-4 pl-6 relative border-l-2 border-border/30 ml-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {dayPlan.activities.map((activity: any, actIdx: number) => (
                  <div key={actIdx} className="relative pl-10 group">
                    <div className="absolute left-[-35px] top-4 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:scale-125 transition-transform" />
                    
                    <Card className="bg-card/40 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all group-hover:shadow-xl group-hover:shadow-primary/5">
                      <CardContent className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-5 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                            <activity.icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-black text-primary uppercase tracking-wider">{activity.time}</span>
                              <Badge variant="secondary" className="text-[8px] h-4 px-1.5 font-black uppercase tracking-widest opacity-60">
                                {activity.type}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-base leading-tight">{activity.task}</h4>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <span className="text-sm font-black flex items-center justify-end">
                              <DollarSign className="w-3 h-3 text-muted-foreground mr-0.5" />
                              {activity.cost}
                            </span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl rounded-3xl overflow-hidden sticky top-24">
            <div className="h-2 w-full bg-primary" />
            <CardContent className="p-8 space-y-8">
              <h3 className="font-black text-xl tracking-tight">Budget Overview</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-background/40 rounded-2xl border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Budget Progress</span>
                    <span className="text-xs font-black text-primary">{Math.round(((totalSpent as number) / (Number(trip?.budgetLimit) || 1)) * 100)}%</span>
                  </div>
                  <div className="text-3xl font-black mb-4">${totalSpent} <span className="text-sm text-muted-foreground font-medium">/ ${trip?.budgetLimit || 0}</span></div>
                  <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalSpent / (trip?.budgetLimit || 1)) * 100}%` }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Spending by Category</h4>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {Object.entries(categorySpending).map(([label, value]: [string, any], i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{label}</span>
                        <span>${value.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div className={`h-full ${getCategoryColor(label)} rounded-full`} style={{ width: `${(value / (trip?.budgetLimit || 1)) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                  {Object.keys(categorySpending).length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No expenses recorded yet.</p>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => navigate(`/build-itinerary/${tripId}`)}
                className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-black"
              >
                Add New Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
