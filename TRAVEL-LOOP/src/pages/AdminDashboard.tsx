import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, SortDesc, Users, MapPin, TrendingUp, BarChart3, 
  PieChart as PieChartIcon, Activity, ArrowUpRight, ArrowDownRight, 
  Globe, Zap, Plus, MoreHorizontal, Trash2, Edit, CheckCircle2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Alex Danvers", email: "alex@example.com", trips: 12, status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Sarah Miller", email: "sarah@example.com", trips: 5, status: "Inactive", joined: "2024-02-20" },
  { id: 3, name: "John Doe", email: "john@example.com", trips: 24, status: "Active", joined: "2023-11-05" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", trips: 2, status: "Pending", joined: "2024-05-01" },
];

const lineData = [
  { name: 'Jan', users: 400, trips: 240 },
  { name: 'Feb', users: 600, trips: 350 },
  { name: 'Mar', users: 900, trips: 500 },
  { name: 'Apr', users: 1200, trips: 700 },
  { name: 'May', users: 1500, trips: 850 },
];

const pieData = [
  { name: 'Tokyo', value: 400 },
  { name: 'Paris', value: 300 },
  { name: 'Rome', value: 300 },
  { name: 'Bali', value: 200 },
];

const barData = [
  { name: 'Sightseeing', value: 120 },
  { name: 'Adventure', value: 150 },
  { name: 'Food', value: 180 },
  { name: 'Nature', value: 90 },
];

const COLORS = ['#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'];

const tourPackages = [
  { id: "PKG-001", user: "Alex Danvers", package: "Golden Triangle India", status: "Active", progress: 65, lastLocation: "Jaipur", speed: "Normal" },
  { id: "PKG-002", user: "Sarah Miller", package: "Vietnam Coastal", status: "Active", progress: 30, lastLocation: "Hoi An", speed: "On Track" },
  { id: "PKG-003", user: "John Doe", package: "Kerala Escape", status: "Completed", progress: 100, lastLocation: "Kochi", speed: "Finished" },
  { id: "PKG-004", user: "Emma Wilson", package: "Ha Long Bay Escape", status: "Pending", progress: 0, lastLocation: "Hanoi", speed: "Starting" },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recordType, setRecordType] = useState<'user' | 'trip'>('user');
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Active' });
  const [newTrip, setNewTrip] = useState({ title: '', destination: '', budget: '' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    
    const user = {
      id: users.length + 1,
      ...newUser,
      trips: 0,
      joined: new Date().toISOString().split('T')[0]
    };
    
    setUsers([user, ...users]);
    setIsDialogOpen(false);
    setNewUser({ name: '', email: '', status: 'Active' });
    toast.success("User record created successfully!");
  };

  const handleAddTrip = () => {
    if (!newTrip.title || !newTrip.destination) return;
    toast.success("Trip record created successfully!");
    setIsDialogOpen(false);
    setNewTrip({ title: '', destination: '', budget: '' });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    toast.error("User record deleted.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header (Screen 12) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Admin Control Center</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Analytics Dashboard</h1>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20">
                  <Plus className="w-4 h-4 mr-2" /> Create Record
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card/90 backdrop-blur-xl border-border/50 rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">Create New Record</DialogTitle>
                  <DialogDescription className="font-medium text-muted-foreground">
                    Add a new record manually to the Traveloop database.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="flex gap-2 p-1 bg-muted/50 rounded-xl mb-6">
                  <button 
                    onClick={() => setRecordType('user')}
                    className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${recordType === 'user' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    User Record
                  </button>
                  <button 
                    onClick={() => setRecordType('trip')}
                    className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${recordType === 'trip' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Trip Record
                  </button>
                </div>

                {recordType === 'user' ? (
                  <div className="grid gap-6 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Alex Traveler" 
                        className="h-12 bg-background/50 border-border/50 rounded-xl"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="alex@traveloop.com" 
                        className="h-12 bg-background/50 border-border/50 rounded-xl"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Account Status</Label>
                      <div className="flex gap-4">
                        {['Active', 'Pending', 'Inactive'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setNewUser({...newUser, status: s})}
                            className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${newUser.status === s ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 text-muted-foreground hover:border-primary/30'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="tripTitle" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Trip Title</Label>
                      <Input 
                        id="tripTitle" 
                        placeholder="Summer in Tuscany" 
                        className="h-12 bg-background/50 border-border/50 rounded-xl"
                        value={newTrip.title}
                        onChange={(e) => setNewTrip({...newTrip, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dest" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Destination</Label>
                      <Input 
                        id="dest" 
                        placeholder="Italy" 
                        className="h-12 bg-background/50 border-border/50 rounded-xl"
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Allocated Budget ($)</Label>
                      <Input 
                        id="budget" 
                        type="number"
                        placeholder="5000" 
                        className="h-12 bg-background/50 border-border/50 rounded-xl"
                        value={newTrip.budget}
                        onChange={(e) => setNewTrip({...newTrip, budget: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter className="pt-6">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                  <Button onClick={recordType === 'user' ? handleAddUser : handleAddTrip} className="bg-primary hover:bg-primary/90 text-white font-black px-8 rounded-xl h-12 shadow-lg shadow-primary/20">
                    Save {recordType === 'user' ? 'User' : 'Trip'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/50 bg-card/40 backdrop-blur-md">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search users, sites, activities or trends..." 
            className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "24,892", growth: "+12.5%", icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Trips", value: "1,402", growth: "+8.2%", icon: Globe, color: "text-accent", bg: "bg-accent/10" },
          { label: "Revenue", value: "$42.5k", growth: "+15.3%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
          { label: "Avg. Score", value: "88/100", growth: "-2.1%", icon: Zap, color: "text-warning", bg: "bg-warning/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-xs font-black ${stat.growth.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {stat.growth}
                  {stat.growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3 ml-1" /> : <ArrowDownRight className="w-3 h-3 ml-1" />}
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs Section (Screen 12 Requirements) */}
      <Tabs defaultValue="users" className="space-y-8">
        <TabsList className="bg-card/40 backdrop-blur-md border border-border/40 p-1.5 rounded-2xl h-auto">
          <TabsTrigger value="users" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Manage Users</TabsTrigger>
          <TabsTrigger value="tracking" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Tour Tracking</TabsTrigger>
          <TabsTrigger value="trends" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Trends & Analytics</TabsTrigger>
          <TabsTrigger value="sites" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Popular Sites</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="outline-none">
          <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 border-b border-border/20">
              <CardTitle className="text-2xl font-black tracking-tight">User Management</CardTitle>
              <CardDescription className="font-medium text-muted-foreground">Monitor and manage user accounts and their trip data.</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/20">
                  <TableHead className="font-black uppercase tracking-widest text-[10px] pl-8">User</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Email</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Trips</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Joined Date</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border/10 hover:bg-primary/5 transition-colors group">
                    <TableCell className="font-bold pl-8">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground font-medium">{user.email}</TableCell>
                    <TableCell className="font-black">{user.trips}</TableCell>
                    <TableCell>
                      <Badge className={`font-bold uppercase text-[9px] ${user.status === 'Active' ? 'bg-success/20 text-success border-success/30' : user.status === 'Pending' ? 'bg-warning/20 text-warning border-warning/30' : 'bg-muted border-border text-muted-foreground'}`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium">{user.joined}</TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={() => handleDeleteUser(user.id)}
                          variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 bg-muted/20 border-t border-border/20 text-center">
              <p className="text-xs font-bold text-muted-foreground">Showing {users.length} user records</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="outline-none">
          <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="p-8 border-b border-border/20">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight">User Tour Packages Tracking</CardTitle>
                  <CardDescription className="font-medium text-muted-foreground">Real-time monitoring of active tour packages and user progress.</CardDescription>
                </div>
                <Badge variant="outline" className="h-8 rounded-lg border-primary/20 text-primary font-bold">
                  <Activity className="w-3 h-3 mr-1.5 animate-pulse" /> Live Tracking
                </Badge>
              </div>
            </CardHeader>
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/20">
                  <TableHead className="font-black uppercase tracking-widest text-[10px] pl-8">Package ID</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">User</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Tour Package</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Current Location</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Progress</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] pr-8">Track</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tourPackages.map((pkg) => (
                  <TableRow key={pkg.id} className="border-border/10 hover:bg-primary/5 transition-colors group">
                    <TableCell className="font-black text-primary pl-8">{pkg.id}</TableCell>
                    <TableCell className="font-bold">{pkg.user}</TableCell>
                    <TableCell className="font-medium">{pkg.package}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1.5 text-accent" />
                        <span className="font-bold">{pkg.lastLocation}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-48">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                          <span>Progress</span>
                          <span>{pkg.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${pkg.progress}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-bold uppercase text-[9px] ${
                        pkg.status === 'Active' ? 'bg-success/20 text-success border-success/30' : 
                        pkg.status === 'Completed' ? 'bg-primary/20 text-primary border-primary/30' : 
                        'bg-muted border-border text-muted-foreground'
                      }`}>
                        {pkg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 bg-muted/20 border-t border-border/20 text-center">
              <p className="text-xs font-bold text-muted-foreground">Tracking {tourPackages.length} active packages</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Growth Chart */}
            <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl p-8 shadow-2xl">
              <CardHeader className="px-0 pt-0 pb-8">
                <CardTitle className="text-xl font-black tracking-tight flex items-center">
                  <Activity className="w-5 h-5 mr-3 text-primary" />
                  User Growth & Trip Trends
                </CardTitle>
              </CardHeader>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="users" stroke="#06B6D4" strokeWidth={4} dot={{ r: 4, fill: '#06B6D4' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="trips" stroke="#8B5CF6" strokeWidth={4} dot={{ r: 4, fill: '#8B5CF6' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Popular Destinations Chart */}
            <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl p-8 shadow-2xl">
              <CardHeader className="px-0 pt-0 pb-8">
                <CardTitle className="text-xl font-black tracking-tight flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-3 text-accent" />
                  Top Destinations Share
                </CardTitle>
              </CardHeader>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Activity Bar Chart */}
            <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl p-8 shadow-2xl lg:col-span-2">
              <CardHeader className="px-0 pt-0 pb-8">
                <CardTitle className="text-xl font-black tracking-tight flex items-center">
                  <BarChart3 className="w-5 h-5 mr-3 text-success" />
                  Engagement by Activity Category
                </CardTitle>
              </CardHeader>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                    />
                    <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sites" className="outline-none">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Taj Mahal", visitors: "24.4k", rating: 4.9, img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400&auto=format&fit=crop" },
                { name: "Ha Long Bay", visitors: "18.2k", rating: 4.8, img: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400&auto=format&fit=crop" },
                { name: "Pink City", visitors: "12.8k", rating: 4.7, img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop" },
              ].map((site, i) => (
                <Card key={i} className="overflow-hidden bg-card/40 border-border/40 rounded-3xl shadow-xl group cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={site.img} 
                      alt={site.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      crossOrigin="anonymous"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-lg">{site.name}</h4>
                      <div className="flex items-center text-xs font-black text-warning">
                        <Star className="w-3 h-3 mr-1 fill-warning" /> {site.rating}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Platform Visitors</span>
                      <span className="text-primary">{site.visitors}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
