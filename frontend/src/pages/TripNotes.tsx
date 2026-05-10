import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Search, Filter, SortDesc, Plus, Book, Clock, MapPin, Calendar, MoreVertical, Star, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Notes will be fetched from the backend

export default function TripNotes() {
  const { id: tripId } = useParams();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripName, setTripName] = useState("My Trip");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (tripId) {
          localStorage.setItem('last_active_trip_id', tripId);
        }
        const tripRes = await api.get(`/trips/${tripId}`);
        setTripName(tripRes.data.data.title);

        const notesRes = await api.get(`/trips/${tripId}/notes`);
        setNotes(notesRes.data.data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  const handleAddNote = async () => {
    const title = prompt("Enter note title:");
    if (!title) return;
    const content = prompt("Enter note content:");
    if (!content) return;

    try {
      const res = await api.post(`/trips/${tripId}/notes`, {
        title,
        content,
        category: "General",
        important: false
      });
      setNotes([...notes, res.data.data]);
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading Notes...</div>;
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header (Screen 13) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <Book className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{tripName}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Trip Notes</h1>
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

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search through your notes..." 
              className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
            />
          </div>
          <Button onClick={handleAddNote} className="h-16 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20">
            <Plus className="w-6 h-6 mr-2" /> Add Note
          </Button>
        </div>

        {/* Quick Filters (Screen 13) */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <Button size="sm" variant="secondary" className="rounded-full px-6 font-bold bg-primary/20 text-primary border-primary/20">All Notes</Button>
          <Button size="sm" variant="ghost" className="rounded-full px-6 font-bold text-muted-foreground hover:text-foreground">By Day</Button>
          <Button size="sm" variant="ghost" className="rounded-full px-6 font-bold text-muted-foreground hover:text-foreground">By Stop</Button>
          <Button size="sm" variant="ghost" className="rounded-full px-6 font-bold text-muted-foreground hover:text-foreground">Important</Button>
        </div>
      </div>

      {/* Notes List (Screen 13) */}
      <div className="space-y-6">
        {notes.map((note, i) => (
          <motion.div 
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`bg-card/40 backdrop-blur-md border-border/40 hover:border-primary/30 transition-all rounded-3xl overflow-hidden shadow-2xl relative ${note.important ? 'ring-2 ring-primary/20' : ''}`}>
              {note.important && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              )}
              <CardHeader className="p-6 pb-2 flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-secondary/50 border-none">
                      {note.category}
                    </Badge>
                    {note.important && <Star className="w-4 h-4 text-warning fill-warning" />}
                  </div>
                  <CardTitle className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">{note.title}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {note.content}
                </p>
                <div className="flex flex-wrap gap-6 pt-4 border-t border-border/10">
                  <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {note.date}
                  </div>
                  <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Last updated 2h ago
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State / Add New */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        onClick={handleAddNote}
        className="border-2 border-dashed border-border/40 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
      >
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
          <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">Create New Note</h3>
          <p className="text-sm text-muted-foreground font-medium max-w-xs mt-1">Keep track of booking numbers, addresses, and local tips.</p>
        </div>
      </motion.div>
    </div>
  );
}
