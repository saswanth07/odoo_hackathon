import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Map, User, List, Package, PlusCircle, Book, Receipt, BarChart, PlaneTakeoff, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fallbackTripId, setFallbackTripId] = useState<string | null>(localStorage.getItem('last_active_trip_id'));

  const tripIdMatch = location.pathname.match(/\/(itinerary|packing|journal|expenses|build-itinerary)\/(\d+)/);
  const currentTripId = tripIdMatch ? tripIdMatch[2] : fallbackTripId;

  useEffect(() => {
    // If no trip ID is known, try to fetch the latest one from API
    if (!currentTripId) {
      api.get('/trips').then(res => {
        if (res.data.data && res.data.data.length > 0) {
          const firstId = res.data.data[0].id.toString();
          setFallbackTripId(firstId);
          localStorage.setItem('last_active_trip_id', firstId);
        }
      }).catch(err => console.error("Sidebar trip fetch failed", err));
    }
  }, [currentTripId]);

  // Update last_active_trip_id if we have one in URL
  if (tripIdMatch && tripIdMatch[2]) {
    localStorage.setItem('last_active_trip_id', tripIdMatch[2]);
  }

  const links = [
    { name: 'Dashboard', path: '/', icon: Home, pattern: /^\/$/ },
    { name: 'My Trips', path: '/trips', icon: Map, pattern: /^\/trips/ },
    { name: 'Create Trip', path: '/create-trip', icon: PlusCircle, pattern: /^\/create-trip/ },
    { name: 'Explore', path: '/explore', icon: Compass, pattern: /^\/explore/ },
    { name: 'Community', path: '/community', icon: List, pattern: /^\/community/ },
    { name: 'Packing', path: currentTripId ? `/packing/${currentTripId}` : '/trips', icon: Package, pattern: /^\/packing/ },
    { name: 'Journal', path: currentTripId ? `/journal/${currentTripId}` : '/trips', icon: Book, pattern: /^\/journal/ },
    { name: 'Expenses', path: currentTripId ? `/expenses/${currentTripId}` : '/trips', icon: Receipt, pattern: /^\/expenses/ },
    { name: 'Admin', path: '/admin', icon: BarChart, pattern: /^\/admin/ },
    { name: 'Profile', path: '/profile', icon: User, pattern: /^\/profile/ },
  ];

  return (
    <div className="h-screen w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40 shadow-2xl">
      <div className="p-8 flex items-center space-x-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
          <PlaneTakeoff className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tighter">Traveloop</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-4 scrollbar-hide">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.pattern.test(location.pathname);

          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold scale-[1.02]" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
                <span className="text-sm tracking-tight">{link.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Pro Plan</p>
          <p className="text-xs font-bold text-foreground mb-3 leading-tight">Unlock AI travel secrets & more!</p>
          <Button 
            onClick={() => navigate('/pricing')}
            size="sm" className="w-full h-8 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
