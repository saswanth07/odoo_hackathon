import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortDesc, Plus, RotateCcw, CheckCircle2, Circle, Package, FileText, Shirt, Zap, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialCategories = [
  {
    name: "Documents",
    icon: FileText,
    items: [
      { id: 1, name: "Passport", packed: true },
      { id: 2, name: "Flight Tickets", packed: true },
      { id: 3, name: "Travel Insurance", packed: false },
      { id: 4, name: "Hotel Booking Confirmation", packed: false },
    ]
  },
  {
    name: "Clothing",
    icon: Shirt,
    items: [
      { id: 5, name: "Casual Shirts", packed: true },
      { id: 6, name: "Trousers/Jeans", packed: false },
      { id: 7, name: "Comfortable Walking Shoes", packed: false },
      { id: 8, name: "Light Jacket/Windbreaker", packed: false },
    ]
  },
  {
    name: "Electronics",
    icon: Zap,
    items: [
      { id: 9, name: "Phone Charger", packed: true },
      { id: 10, name: "Universal Power Adapter", packed: false },
      { id: 11, name: "Earphones/Headphones", packed: false },
    ]
  }
];

export default function PackingList() {
  const [categories, setCategories] = useState(initialCategories);

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const newCategories = [...categories];
    newCategories[catIdx].items[itemIdx].packed = !newCategories[catIdx].items[itemIdx].packed;
    setCategories(newCategories);
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
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Paris & Rome Adventure</span>
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
                <Button variant="ghost" className="w-full mt-4 h-12 rounded-xl border-dashed border-2 border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 font-bold transition-all">
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
