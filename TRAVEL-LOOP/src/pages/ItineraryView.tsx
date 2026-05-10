import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, DollarSign, ArrowLeft, MoreVertical, Map as MapIcon, Coffee, Utensils, Camera, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const itineraryData = [
  {
    day: 1,
    title: "Arrival & Shinjuku Exploration",
    activities: [
      { time: "10:00 AM", task: "Arrival at Narita Airport", cost: 30, icon: Train, type: "Transport" },
      { time: "01:00 PM", task: "Check-in at Shinjuku Prince Hotel", cost: 0, icon: Coffee, type: "Stay" },
      { time: "04:00 PM", task: "Metropolitan Government Building", cost: 0, icon: Camera, type: "Sightseeing" },
      { time: "07:00 PM", task: "Dinner in Omoide Yokocho", cost: 45, icon: Utensils, type: "Food" },
    ]
  },
  {
    day: 2,
    title: "Harajuku & Shibuya Vibes",
    activities: [
      { time: "09:00 AM", task: "Meiji Jingu Shrine Visit", cost: 0, icon: Camera, type: "Sightseeing" },
      { time: "11:30 AM", task: "Takeshita Street Shopping", cost: 120, icon: Coffee, type: "Shopping" },
      { time: "02:00 PM", task: "Lunch in Harajuku", cost: 25, icon: Utensils, type: "Food" },
      { time: "06:00 PM", task: "Shibuya Crossing & Hachiko", cost: 0, icon: Camera, type: "Sightseeing" },
    ]
  }
];

export default function ItineraryView() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Header (Screen 9) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <Button variant="ghost" size="sm" className="pl-0 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Trips
          </Button>
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-black tracking-tight">Tokyo Adventure</h1>
            <Badge className="bg-success/20 text-success border-success/30 uppercase tracking-widest text-[10px] font-bold">Active</Badge>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" /> Tokyo, Japan
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" /> Nov 5 - Nov 12, 2026
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-border/50">
            <MapIcon className="w-4 h-4 mr-2" /> View on Map
          </Button>
          <Button className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-6">
            Edit Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Timeline (Screen 9) */}
        <div className="lg:col-span-8 space-y-12">
          {itineraryData.map((dayPlan, dayIdx) => (
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
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">November {4 + dayPlan.day}, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Daily Expense</p>
                  <p className="text-lg font-black text-primary">${dayPlan.activities.reduce((sum, a) => sum + a.cost, 0)}</p>
                </div>
              </div>

              <div className="space-y-4 pl-6 relative border-l-2 border-border/30 ml-6">
                {dayPlan.activities.map((activity, actIdx) => (
                  <div key={actIdx} className="relative pl-10 group">
                    {/* Activity Dot */}
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

        {/* Sidebar Insights (Screen 9) */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl rounded-3xl overflow-hidden sticky top-24">
            <div className="h-2 w-full bg-primary" />
            <CardContent className="p-8 space-y-8">
              <h3 className="font-black text-xl tracking-tight">Budget Overview</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-background/40 rounded-2xl border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Budget Spent</span>
                    <span className="text-xs font-black text-primary">45%</span>
                  </div>
                  <div className="text-3xl font-black mb-4">$1,240 <span className="text-sm text-muted-foreground font-medium">/ $2,500</span></div>
                  <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Spending by Category</h4>
                  {[
                    { label: "Accommodation", value: 600, color: "bg-primary" },
                    { label: "Transport", value: 240, color: "bg-accent" },
                    { label: "Food & Drinks", value: 300, color: "bg-success" },
                    { label: "Sightseeing", value: 100, color: "bg-warning" },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{cat.label}</span>
                        <span>${cat.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${(cat.value / 1240) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-black">
                Add New Expense
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
