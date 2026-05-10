import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { GripVertical, Trash2, MapPin, Calendar, Sparkles, Save, CheckCircle, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface Section {
  id?: number;
  city: string;
  dates: string;
  budget: number;
  hotel: string;
  arrivalDate?: string;
  departureDate?: string;
}

export default function BuildItinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tripDetails, setTripDetails] = useState<any>(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (!id) return;
        const tripRes = await api.get(`/trips/${id}`);
        setTripDetails(tripRes.data.data);

        const stopsRes = await api.get(`/trips/${id}/stops`);
        if (stopsRes.data && stopsRes.data.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetchedStops = stopsRes.data.data.map((stop: any) => ({
            id: stop.id,
            city: stop.cityName,
            dates: `${stop.arrivalDate} - ${stop.departureDate}`,
            arrivalDate: stop.arrivalDate,
            departureDate: stop.departureDate,
            budget: stop.estimatedStayCost || 0,
            hotel: "To be decided"
          }));
          setSections(fetchedStops);
        }
      } catch (error) {
        console.error("Failed to fetch itinerary data", error);
      }
    };
    fetchTripData();
  }, [id]);

  const addSection = () => {
    setSections([...sections, { city: "", dates: "", budget: 0, hotel: "", arrivalDate: new Date().toISOString().split('T')[0], departureDate: new Date().toISOString().split('T')[0] }]);
  };

  const removeSection = (idToRemove?: number) => {
    if(idToRemove) {
      setSections(sections.filter(s => s.id !== idToRemove));
    } else {
      // If it's a newly added section without an ID
      setSections(sections.slice(0, -1));
    }
  };

  const autoFixBudget = () => {
    if (sections.length === 0) return;
    const perSection = Math.floor(totalBudget / sections.length);
    const updated = sections.map(s => ({ ...s, budget: perSection }));
    setSections(updated);
  };

  const handleSaveDraft = async () => {
    try {
      if (!id) return;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section.id) {
          // New Stop
          await api.post(`/trips/${id}/stops`, {
            cityName: section.city || "New City",
            country: "Unknown",
            arrivalDate: section.arrivalDate || "2026-01-01",
            departureDate: section.departureDate || "2026-01-02",
            positionIndex: i + 1
          });
        }
      }
      alert("Draft Saved Successfully!");
      // Refresh to get new IDs
      const stopsRes = await api.get(`/trips/${id}/stops`);
      if (stopsRes.data && stopsRes.data.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedStops = stopsRes.data.data.map((stop: any) => ({
          id: stop.id,
          city: stop.cityName,
          dates: `${stop.arrivalDate} - ${stop.departureDate}`,
          arrivalDate: stop.arrivalDate,
          departureDate: stop.departureDate,
          budget: stop.estimatedStayCost || 0,
          hotel: "To be decided"
        }));
        setSections(fetchedStops);
      }
    } catch (error) {
      console.error("Failed to save draft", error);
    }
  };

  const totalBudget = tripDetails?.budgetLimit || 2500;
  const allocated = sections.reduce((sum, s) => sum + (Number(s.budget) || 0), 0);
  const remaining = totalBudget - allocated;
  const optimizationScore = 85;

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{tripDetails?.title || "Loading..."}</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Build Itinerary</h1>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSaveDraft} variant="outline" className="h-12 px-6 rounded-xl border-border/50 bg-card/50 backdrop-blur-md hover:bg-card">
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20">
            <CheckCircle className="w-4 h-4 mr-2" /> Finalize Itinerary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* AI Alert (Screen 5 Requirement) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-warning/10 border border-warning/20 p-6 rounded-2xl flex items-start justify-between space-x-4 text-warning shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-warning/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="font-bold text-base mb-1">Smart AI Budget Alert</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Your budget is currently {allocated > totalBudget ? 'over' : 'under'} by ${Math.abs(remaining)}. 
                  Use the auto-fix feature to balance your segments perfectly.
                </p>
              </div>
            </div>
            <Button 
              onClick={autoFixBudget}
              size="sm" 
              className="bg-warning text-warning-foreground hover:bg-warning/90 font-black px-4 rounded-xl shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Auto-Fix
            </Button>
          </motion.div>

          {/* Sections List */}
          <div className="space-y-6 relative">
            <div>
              {sections.map((section, idx) => (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline connector */}
                  {idx !== sections.length - 1 && (
                    <div className="absolute left-[27px] top-[80px] bottom-[-40px] w-[2px] bg-gradient-to-b from-primary/50 to-transparent z-0" />
                  )}
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="mt-4 p-2 bg-card border border-border/50 rounded-xl shadow-lg cursor-grab active:cursor-grabbing hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <Card className="flex-1 bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 transition-all shadow-xl rounded-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                          <div className="space-y-6 flex-1">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">Destination City</Label>
                                <Input 
                                  value={section.city} 
                                  onChange={(e) => {
                                    const updated = [...sections];
                                    updated[idx].city = e.target.value;
                                    setSections(updated);
                                  }}
                                  placeholder="Enter City Name"
                                  className="font-black text-2xl h-auto p-0 bg-transparent border-none focus-visible:ring-0 shadow-none placeholder:text-muted-foreground/30" 
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-14">
                              <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" /> Travel Dates
                                </Label>
                                <Input 
                                  defaultValue={section.dates} 
                                  placeholder="Nov 5 - Nov 8"
                                  className="h-10 bg-background/30 border-border/50 rounded-xl px-4 text-sm font-medium" 
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" /> Accommodation
                                </Label>
                                <Input 
                                  defaultValue={section.hotel} 
                                  placeholder="Hotel or Stay Name"
                                  className="h-10 bg-background/30 border-border/50 rounded-xl px-4 text-sm font-medium" 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 md:pl-8 md:border-l border-border/20 min-w-[180px]">
                            <div className="flex-1">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block text-right">Section Budget</Label>
                              <div className="flex items-center justify-end">
                                <span className="text-xl font-black text-primary mr-1.5">$</span>
                                <Input 
                                  value={section.budget} 
                                  type="number" 
                                  onChange={(e) => {
                                    const updated = [...sections];
                                    updated[idx].budget = Number(e.target.value);
                                    setSections(updated);
                                  }}
                                  className="w-24 h-12 font-black text-xl text-right bg-background/50 border-border/50 rounded-xl focus:ring-primary/20" 
                                />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeSection(section.id)}
                              className="w-12 h-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Section Button (Screen 5 Requirement) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pl-[84px] pt-4"
            >
              <Button 
                variant="outline" 
                onClick={addSection}
                className="w-full border-dashed border-2 border-border/60 hover:border-primary/50 hover:bg-primary/5 h-20 bg-transparent text-muted-foreground hover:text-primary rounded-2xl transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <Plus className="w-6 h-6 transition-transform group-hover:scale-110" />
                <span className="font-bold text-sm">Add Itinerary Section</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Sidebar Summary (Screen 5 Requirement) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 bg-card/40 backdrop-blur-xl border-border/40 shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-8 space-y-8">
              <h3 className="font-black text-xl tracking-tight">Trip Summary</h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Total Budget</span>
                  <span className="font-black text-lg">${totalBudget}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Allocated</span>
                  <span className={`font-black text-lg ${allocated > totalBudget ? 'text-destructive' : 'text-warning'}`}>
                    ${allocated}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Remaining</span>
                  <span className={`font-black text-lg ${remaining < 0 ? 'text-destructive' : 'text-success'}`}>
                    ${remaining}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border/20 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider">Optimization</span>
                  </div>
                  <span className="text-primary font-black">{optimizationScore}/100</span>
                </div>
                <Progress value={optimizationScore} className="h-3 rounded-full bg-secondary/50" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your itinerary is <span className="text-foreground font-bold">well optimized</span>. 
                  Adjusting your Kyoto stay could increase your score to <span className="text-primary font-bold">95/100</span>.
                </p>
              </div>

              <Button className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-black shadow-lg shadow-black/10">
                View Detailed Budget
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
