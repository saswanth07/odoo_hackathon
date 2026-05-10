import { Bell, Search, UserCircle, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 border-b border-border/50 bg-background/60 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-10 shadow-sm">
      <div className="flex-1 max-w-xl relative group">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search destinations, activities, travelers..." 
          className="pl-12 h-11 bg-card/40 border-border/50 rounded-2xl focus:ring-primary/20 text-sm font-medium" 
        />
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary group">
            <Bell className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-background animate-pulse"></span>
          </Button>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>

        <div className="h-8 w-px bg-border/50 mx-2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 p-1.5 pr-4 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-all group shadow-sm">
              <Avatar className="w-9 h-9 border-2 border-primary/20 shadow-sm group-hover:border-primary/40 transition-colors">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-xs font-black tracking-tight leading-none">{user?.name || 'User'}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{user?.role || 'Explorer'}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl">
            <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest px-4 py-3 opacity-60">Account</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => navigate('/profile')}
              className="rounded-xl px-4 py-2.5 font-bold cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
            >
              <UserCircle className="w-4 h-4 mr-3" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-4 py-2.5 font-bold cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
              <Settings className="w-4 h-4 mr-3" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50 my-2" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="rounded-xl px-4 py-2.5 font-bold cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-3" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
