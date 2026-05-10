import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Search, Filter, SortDesc, Plus, RotateCcw, CheckCircle2, Circle, Package, FileText, Shirt, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PackingList() {
  const { id: tripId } = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [tripName, setTripName] = useState("My Trip");

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('document')) return FileText;
    if (n.includes('cloth')) return Shirt;
    if (n.includes('electron')) return Zap;
    return Package;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tripId) {
          localStorage.setItem('last_active_trip_id', tripId);
        }
        const tripRes = await api.get(`/trips/${tripId}`);
        setTripName(tripRes.data.data.title);

        const itemsRes = await api.get(`/trips/${tripId}/packing-items`);
        const items = itemsRes.data.data;
        
        // Group items by category
        const groups: any = {};
        items.forEach((item: any) => {
          if (!groups[item.category]) {
            groups[item.category] = {
              name: item.category,
              icon: getIconForCategory(item.category),
              items: []
            };
          }
          groups[item.category].items.push(item);
        });

        // Ensure default categories exist if empty
        const defaultCats = ["Documents", "Clothing", "Electronics"];
        defaultCats.forEach(cat => {
          if (!groups[cat]) {
            groups[cat] = { name: cat, icon: getIconForCategory(cat), items: [] };
          }
        });

        setCategories(Object.values(groups));
      } catch (error) {
        console.error("Failed to fetch packing items", error);
      }
    };
    fetchData();
  }, [tripId]);

  const toggleItem = async (catIdx: number, itemIdx: number) => {
    const item = categories[catIdx].items[itemIdx];
    try {
      const updatedItem = { ...item, packed: !item.packed };
      await api.put(`/packing-items/${item.id}`, updatedItem);
      
      const newCategories = [...categories];
      newCategories[catIdx].items[itemIdx] = updatedItem;
      setCategories(newCategories);
    } catch (error) {
      console.error("Failed to toggle item", error);
    }
  };

  const addItem = async (categoryName: string) => {
    const itemName = prompt(`Enter new item for ${categoryName}:`);
    if (!itemName) return;

    try {
      const res = await api.post(`/trips/${tripId}/packing-items`, {
        name: itemName,
        category: categoryName,
        packed: false
      });
      
      const newItem = res.data.data;
      const newCategories = [...categories];
      const catIdx = newCategories.findIndex(c => c.name === categoryName);
      newCategories[catIdx].items.push(newItem);
      setCategories(newCategories);
      alert(`${itemName} added to ${categoryName}!`);
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const packedItems = categories.reduce((sum, cat) => sum + cat.items.filter(i => i.packed).length, 0);
  const progress = (packedItems / totalItems) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header (Screen 11) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{tripName}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Packing Checklist</h1>
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
            placeholder="Search for items to pack..." 
            className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>

        {/* Progress Bar (Screen 11) */}
        <div className="bg-card/40 backdrop-blur-md border border-border/40 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
            <span className="text-muted-foreground">Packing Progress</span>
            <span className="text-primary">{packedItems} / {totalItems} Items Packed</span>
          </div>
          <Progress value={progress} className="h-4 rounded-full bg-secondary/50" />
        </div>
      </div>

      {/* Categories (Screen 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, catIdx) => (
          <motion.div 
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl overflow-hidden shadow-2xl h-full">
              <CardHeader className="p-6 border-b border-border/20 flex flex-row items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <cat.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-black tracking-tight">{cat.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {cat.items.map((item, itemIdx) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 group cursor-pointer"
                    onClick={() => toggleItem(catIdx, itemIdx)}
                  >
                    <div className="relative">
                      {item.packed ? (
                        <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <span className={`font-bold transition-all ${item.packed ? 'text-muted-foreground line-through decoration-primary/50' : 'text-foreground'}`}>
                      {item.name}
                    </span>
                  </div>
                ))}
                <Button onClick={() => addItem(cat.name)} variant="ghost" className="w-full mt-4 h-12 rounded-xl border-dashed border-2 border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 font-bold transition-all">
                  <Plus className="w-4 h-4 mr-2" /> Add {cat.name} Item
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Custom Category Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center border-2 border-dashed border-border/40 rounded-3xl h-[280px] hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <div>
              <p className="font-black text-lg tracking-tight">New Category</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Add a custom group</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Actions (Screen 11) */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20">
          <CheckCircle2 className="w-5 h-5 mr-2" /> Mark All as Packed
        </Button>
        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border/50 font-black text-lg bg-card/50 backdrop-blur-md">
          <RotateCcw className="w-5 h-5 mr-2" /> Reset Checklist
        </Button>
      </div>
    </div>
  );
}
