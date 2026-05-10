import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Map, User, List, Package, PlusCircle, Book, Receipt, BarChart, PlaneTakeoff, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'My Trips', path: '/trips', icon: Map },
    { name: 'Create Trip', path: '/create-trip', icon: PlusCircle },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Community', path: '/community', icon: List },
    { name: 'Packing', path: '/packing', icon: Package },
    { name: 'Journal', path: '/journal', icon: Book },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Admin', path: '/admin', icon: BarChart, adminOnly: true },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const filteredLinks = links.filter(link => !link.adminOnly || user?.role === 'admin');

  return (
    <div className="h-screen w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40 shadow-2xl">
      <div className="p-8 flex items-center space-x-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
          <PlaneTakeoff className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tighter">Traveloop</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-4 scrollbar-hide">
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
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
