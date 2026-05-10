import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, ArrowRight, ArrowLeft, Search, CheckCircle2, Star, Camera, Landmark, Utensils, Mountain, Compass, Clock } from 'lucide-react';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const suggestions = [
  { name: "Tokyo, Japan", type: "City", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=400" },
  { name: "Paris, France", type: "City", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400" },
  { name: "Bali, Indonesia", type: "Island", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400" },
  { name: "Zermatt, Switzerland", type: "Nature", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400" },
];

const sightseeingOptions = [
  { id: 'culture', label: 'Cultural Sites', icon: Landmark, description: 'Temples, museums, and historical landmarks' },
  { id: 'adventure', label: 'Adventure', icon: Mountain, description: 'Hiking, water sports, and thrill-seeking' },
  { id: 'food', label: 'Food & Dining', icon: Utensils, description: 'Local markets, fine dining, and street food' },
  { id: 'nature', label: 'Nature', icon: Compass, description: 'Parks, beaches, and scenic viewpoints' },
];

const agencies = [
  { id: 'expedia', name: 'Expedia', rating: 4.8, priceRange: '$$' },
  { id: 'booking', name: 'Booking.com', rating: 4.7, priceRange: '$$' },
  { id: 'luxury', name: 'Elite Travel', rating: 5.0, priceRange: '$$$' },
  { id: 'budget', name: 'Backpacker Central', rating: 4.5, priceRange: '$' },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: location.state?.destination || '',
    sightseeing: [] as string[],
    startDate: '',
    duration: '7',
    timePreference: 'Morning',
    travelAgency: '',
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(s => 
    s.name.toLowerCase().includes(formData.destination.toLowerCase())
  );

  const progress = (step / 4) * 100;

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleSightseeing = (id: string) => {
    setFormData(prev => ({
      ...prev,
      sightseeing: prev.sightseeing.includes(id) 
        ? prev.sightseeing.filter(item => item !== id)
        : [...prev.sightseeing, id]
    }));
  };

  const estimatedAmount = (parseInt(formData.duration) || 0) * 150 + (formData.sightseeing.length * 50);

  const handleGenerate = async () => {
    try {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + parseInt(formData.duration));
      
      const response = await api.post('/trips', {
        title: formData.destination,
        description: `Focus: ${formData.sightseeing.join(', ')}. Agency: ${formData.travelAgency}`,
        startDate: formData.startDate,
        endDate: end.toISOString().split('T')[0],
        budgetLimit: estimatedAmount,
        coverPhotoUrl: suggestions.find(s => s.name === formData.destination)?.image || ""
      });
      
      const tripId = response.data.data.id;
      localStorage.setItem('last_active_trip_id', tripId.toString());
      navigate(`/build-itinerary/${tripId}`);
    } catch (error) {
      console.error("Failed to create trip", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-4 sm:px-6">
      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Plan Your Next Trip</h1>
          <p className="text-muted-foreground mt-2">Let our AI build the perfect itinerary for you.</p>
        </div>
        <div className="w-full md:w-80 space-y-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-primary">Step {step} of 4</span>
            <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 rounded-full bg-secondary/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

              {/* Step 1: Destination Selection */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center">
                      <MapPin className="w-6 h-6 mr-3 text-primary" />
                      Where do you want to go?
                    </h2>
                    <p className="text-muted-foreground">Select a destination or search for any place in the world.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        placeholder="Search cities, countries, or landmarks..." 
                        className="h-16 pl-12 bg-background/50 border-border/50 rounded-2xl text-lg focus:ring-primary/20"
                        value={formData.destination}
                        onFocus={() => setShowSuggestions(true)}
                        onChange={(e) => {
                          setFormData({...formData, destination: e.target.value});
                          setShowSuggestions(true);
                        }}
                      />
                      {showSuggestions && formData.destination && filteredSuggestions.length > 0 && (
                        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-background/90 backdrop-blur-xl border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                          <CardContent className="p-2">
                            {filteredSuggestions.map((s, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setFormData({...formData, destination: s.name});
                                  setShowSuggestions(false);
                                }}
                                className="w-full flex items-center space-x-3 p-3 hover:bg-primary/10 rounded-xl transition-colors text-left"
                              >
                                <MapPin className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="font-bold text-sm">{s.name}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{s.type}</p>
                                </div>
                              </button>
                            ))}
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {suggestions.slice(0, 4).map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => setFormData({...formData, destination: s.name})}
                          className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${formData.destination === s.name ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'}`}
                        >
                          <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 p-3 flex flex-col justify-end">
                            <span className="text-white text-xs font-bold truncate">{s.name}</span>
                          </div>
                          {formData.destination === s.name && (
                            <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-lg">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <Button onClick={nextStep} disabled={!formData.destination} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                      Explore Activities <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Sightseeing Options */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center">
                      <Camera className="w-6 h-6 mr-3 text-primary" />
                      What interests you?
                    </h2>
                    <p className="text-muted-foreground">Select the sightseeing options you'd like to include in {formData.destination}.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sightseeingOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => toggleSightseeing(opt.id)}
                        className={`flex items-start p-4 rounded-2xl border-2 text-left transition-all ${formData.sightseeing.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
                      >
                        <div className={`p-3 rounded-xl mr-4 ${formData.sightseeing.includes(opt.id) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                          <opt.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg leading-tight">{opt.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <Button variant="ghost" onClick={prevStep} className="h-14 px-6 rounded-2xl font-bold">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </Button>
                    <Button onClick={nextStep} disabled={formData.sightseeing.length === 0} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                      Final Details <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Logistics & Agencies */}
              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-primary" />
                      Trip Logistics
                    </h2>
                    <p className="text-muted-foreground">Specify your dates, duration, and preferred travel agency.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Start Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="date" 
                          className="h-14 pl-12 bg-background/50 border-border/50 rounded-2xl" 
                          value={formData.startDate}
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Duration (Days)</Label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          type="number" 
                          placeholder="7"
                          className="h-14 pl-12 bg-background/50 border-border/50 rounded-2xl" 
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Time Preference</Label>
                      <Select 
                        value={formData.timePreference} 
                        onValueChange={(val) => setFormData({...formData, timePreference: val})}
                      >
                        <SelectTrigger className="h-14 bg-background/50 border-border/50 rounded-2xl">
                          <SelectValue placeholder="Select Preferred Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Morning">Morning Person</SelectItem>
                          <SelectItem value="Afternoon">Afternoon Explorer</SelectItem>
                          <SelectItem value="Night">Night Owl</SelectItem>
                          <SelectItem value="Full">Full Day Intense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Travel Agency</Label>
                      <Select 
                        value={formData.travelAgency} 
                        onValueChange={(val) => setFormData({...formData, travelAgency: val})}
                      >
                        <SelectTrigger className="h-14 bg-background/50 border-border/50 rounded-2xl">
                          <SelectValue placeholder="Choose Agency" />
                        </SelectTrigger>
                        <SelectContent>
                          {agencies.map(a => (
                            <SelectItem key={a.id} value={a.id}>{a.name} ({a.rating} ★)</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <Button variant="ghost" onClick={prevStep} className="h-14 px-6 rounded-2xl font-bold">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </Button>
                    <Button onClick={nextStep} disabled={!formData.startDate || !formData.travelAgency} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                      Estimate Amount <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Summary & Estimation */}
              {step === 4 && (
                <div className="space-y-8 relative">
                  <div className="absolute -top-12 -right-12 w-48 h-48 opacity-20 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400" alt="Travel map" className="w-full h-full object-cover rounded-full rotate-12" />
                  </div>
                  
                  <div className="space-y-2 text-center relative z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black">Trip Estimation Ready!</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">Here is the projected cost for your {formData.duration}-day trip to {formData.destination}.</p>
                  </div>

                  <div className="bg-background/50 border border-border/50 rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground font-bold">Destination</span>
                      <span className="font-black text-primary">{formData.destination}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold">{formData.duration} Days</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Activities</span>
                      <span className="font-bold">{formData.sightseeing.length} Selected</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Travel Agency</span>
                      <span className="font-bold">{agencies.find(a => a.id === formData.travelAgency)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xl font-black uppercase tracking-tighter">Estimated Total</span>
                      <div className="text-right">
                        <span className="text-3xl font-black text-primary">${estimatedAmount.toLocaleString()}</span>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Taxes & fees included</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col gap-4">
                    <Button 
                      onClick={handleGenerate}
                      className="h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-xl shadow-primary/20">
                      Generate AI Itinerary <Sparkles className="ml-2 w-6 h-6" />
                    </Button>
                    <Button variant="ghost" onClick={prevStep} className="h-12 rounded-xl font-bold text-muted-foreground">
                      Change Logistics
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Info Area */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Traveling to <span className="text-foreground font-bold">{formData.destination || 'your destination'}</span>? 
                {formData.sightseeing.includes('culture') && " You've chosen cultural sites - we recommend booking museum tickets at least 2 weeks in advance."}
                {formData.duration > '10' && " A long trip! We'll include a few rest days to keep your energy up."}
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 p-3 bg-background/40 rounded-xl border border-border/30">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium uppercase tracking-wider">Flight Prices: {formData.destination ? 'Normal' : 'Select Destination'}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background/40 rounded-xl border border-border/30">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-xs font-medium uppercase tracking-wider">Hotel Demand: High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl shadow-xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold mb-6">Popular Activities</h3>
              <div className="space-y-4">
                {[
                  { title: "City Highlights", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200" },
                  { title: "Culinary Tour", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200" },
                  { title: "Outdoor Trek", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200" }
                ].map((act, i) => (
                  <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={act.img} alt={act.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{act.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">4.8 ★ (1.2k reviews)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
