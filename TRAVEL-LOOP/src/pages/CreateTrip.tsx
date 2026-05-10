import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, Wallet, ArrowRight, ArrowLeft, Search, CheckCircle2, Star, Landmark, Mountain, Utensils, Compass } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const suggestions = [
  { name: "Taj Mahal, India", type: "Monument", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop" },
  { name: "Ha Long Bay, Vietnam", type: "Nature", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop" },
  { name: "Jaipur, India", type: "City", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop" },
  { name: "Hoi An, Vietnam", type: "City", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" },
  { name: "Kerala, India", type: "Nature", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop" },
];

const worldCities = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
  "Tokyo, Japan", "Paris, France", "Bali, Indonesia", "New York, USA", "London, UK",
  "Agra, India", "New Delhi, India", "Mumbai, India", "Hanoi, Vietnam", "Ho Chi Minh City, Vietnam",
  "Hoi An, Vietnam", "Jaipur, India", "Goa, India", "Varanasi, India"
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    sightseeing: [] as string[],
    travelAgency: '',
  });
  const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

  const progress = (step / 4) * 100;

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSearchChange = (query: string) => {
    setFormData({ ...formData, destination: query });
    if (query.length > 1) {
      const filtered = worldCities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestionsList(filtered);
    } else {
      setSuggestionsList([]);
    }
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(diffDays) ? 0 : diffDays;
  };

  const duration = calculateDuration();
  const baseCost = duration * 150;
  const activityCost = formData.sightseeing.length * 50;
  const totalEstimated = baseCost + activityCost;

  const getAgencyName = (id: string) => {
    const agencies = {
      'expedia': 'Expedia',
      'booking': 'Booking.com',
      'travelo': 'Travelo AI'
    };
    return agencies[id as keyof typeof agencies] || 'Not Selected';
  };

  const handleGenerate = () => {
    const tripId = Math.floor(Math.random() * 100000);
    navigate(`/build-itinerary/${tripId}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
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
              className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

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
                        placeholder="Search cities, countries..." 
                        className="h-16 pl-12 bg-background/50 border-border/50 rounded-2xl text-lg focus:ring-primary/20"
                        value={formData.destination}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                      {suggestionsList.length > 0 && (
                        <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                          {suggestionsList.map((city, idx) => (
                            <button
                              key={idx}
                              className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors"
                              onClick={() => {
                                setFormData({ ...formData, destination: city });
                                setSuggestionsList([]);
                              }}
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {suggestions.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => setFormData({...formData, destination: s.name})}
                          className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${formData.destination === s.name ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'}`}
                        >
                          <img 
                            src={s.image} 
                            alt={s.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                            crossOrigin="anonymous"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 p-3 flex flex-col justify-end">
                            <span className="text-white text-[10px] font-bold truncate leading-tight">{s.name}</span>
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
                      Sightseeing <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center">
                      <Sparkles className="w-6 h-6 mr-3 text-primary" />
                      What's on the menu?
                    </h2>
                    <p className="text-muted-foreground">Pick your sightseeing preferences for {formData.destination}.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'culture', label: 'Cultural Sites', icon: Landmark, desc: 'Temples, museums, history' },
                      { id: 'adventure', label: 'Adventure', icon: Mountain, desc: 'Hiking, water sports' },
                      { id: 'food', label: 'Food & Dining', icon: Utensils, desc: 'Local markets, fine dining' },
                      { id: 'nature', label: 'Nature', icon: Compass, desc: 'Parks, beaches, viewpoints' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          const current = formData.sightseeing;
                          const updated = current.includes(opt.id) 
                            ? current.filter(id => id !== opt.id)
                            : [...current, opt.id];
                          setFormData({ ...formData, sightseeing: updated });
                        }}
                        className={`flex items-start p-4 rounded-2xl border-2 text-left transition-all ${formData.sightseeing.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
                      >
                        <div className={`p-3 rounded-xl mr-4 ${formData.sightseeing.includes(opt.id) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                          <opt.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg leading-tight">{opt.label}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <Button variant="ghost" onClick={prevStep} className="h-14 px-6 rounded-2xl font-bold">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </Button>
                    <Button onClick={nextStep} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                      Logistics <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-primary" />
                      The Fine Print
                    </h2>
                    <p className="text-muted-foreground">Dates, duration, and your travel agent preference.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Start Date</Label>
                      <Input 
                        type="date" 
                        className="h-14 bg-background/50 border-border/50 rounded-2xl" 
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">End Date</Label>
                      <Input 
                        type="date" 
                        className="h-14 bg-background/50 border-border/50 rounded-2xl" 
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Estimated Budget ($)</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 5000" 
                        className="h-14 bg-background/50 border-border/50 rounded-2xl" 
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Travel Agency</Label>
                      <select 
                        className="w-full h-14 bg-background/50 border border-border/50 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.travelAgency}
                        onChange={(e) => setFormData({...formData, travelAgency: e.target.value})}
                      >
                        <option value="">Select Agency</option>
                        <option value="expedia">Expedia</option>
                        <option value="booking">Booking.com</option>
                        <option value="travelo">Travelo AI</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <Button variant="ghost" onClick={prevStep} className="h-14 px-6 rounded-2xl font-bold">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </Button>
                    <Button onClick={nextStep} disabled={!formData.startDate || !formData.endDate || !formData.budget} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                      Estimation <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 relative">
                  <div className="absolute -top-12 -right-12 w-48 h-48 opacity-20 pointer-events-none">
                    <img 
                      src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop" 
                      alt="Travel map" 
                      className="w-full h-full object-cover rounded-full rotate-12"
                      crossOrigin="anonymous"
                    />
                  </div>
                  
                  <div className="space-y-2 text-center relative z-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black">AI is Ready!</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">We've gathered everything needed to create your optimized itinerary.</p>
                  </div>

                  <div className="bg-background/50 border border-border/50 rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Destination</span>
                      <span className="font-bold">{formData.destination}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold">{duration} Days</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                      <span className="text-muted-foreground">Travel Agency</span>
                      <span className="font-bold">{getAgencyName(formData.travelAgency)}</span>
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Base Cost ({duration} days)</span>
                        <span className="font-medium">${baseCost}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Activities ({formData.sightseeing.length})</span>
                        <span className="font-medium">${activityCost}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border/30">
                        <span className="text-lg font-black uppercase tracking-tighter">Estimated Total</span>
                        <span className="text-2xl font-black text-primary">${totalEstimated}</span>
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
                      Edit Details
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
                It's a great choice! We suggest checking visa requirements if you're traveling internationally.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 p-3 bg-background/40 rounded-xl border border-border/30">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium uppercase tracking-wider">Flight Prices: Low</span>
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
              <h3 className="text-lg font-bold mb-6">Popular in {formData.destination || 'Region'}</h3>
              <div className="space-y-4">
                {[
                  { title: "Cultural Sightseeing", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop" },
                  { title: "Food Tour", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200&auto=format&fit=crop" },
                  { title: "Mountain Hike", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200&auto=format&fit=crop" }
                ].map((act, i) => (
                  <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={act.img} 
                        alt={act.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        crossOrigin="anonymous"
                      />
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

