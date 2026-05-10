import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Search, Filter, SortDesc, User, MapPin, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const posts = [
  {
    id: 1,
    user: { name: "Alex D.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", role: "Explorer" },
    content: "Watching the sunrise at the Taj Mahal was a dream come true! The AI guide recommended arriving at 5:30 AM, and it was perfect.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    location: "Agra, India",
    likes: 124,
    comments: 18,
    time: "2 hours ago"
  },
  {
    id: 2,
    user: { name: "Sarah M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", role: "Foodie" },
    content: "The street food in Hoi An is unbelievable. Must try the Cao Lau! The community tips for finding the best stalls were spot on.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    location: "Hoi An, Vietnam",
    likes: 89,
    comments: 5,
    time: "5 hours ago"
  }
];

export default function Community() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Community Header (Screen 10) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Community</h1>
            <p className="text-muted-foreground font-medium">Share experiences and find inspiration</p>
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
            placeholder="Search for trips, locations, or users..." 
            className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Create Post (Screen 10 Enhancement) */}
      <Card className="bg-primary/5 border-primary/20 border-dashed rounded-3xl overflow-hidden shadow-none">
        <CardContent className="p-6 flex items-center space-x-4">
          <Avatar className="w-12 h-12 border-2 border-primary/20">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1535713875002-e17112ad4462?q=80&w=100&auto=format&fit=crop" 
              crossOrigin="anonymous"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input 
              placeholder="Share your latest adventure..." 
              className="bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50 h-12"
            />
          </div>
          <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold">
            Post Experience
          </Button>
        </CardContent>
      </Card>

      {/* Community Feed (Screen 10) */}
      <div className="space-y-8">
        {posts.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-card/40 backdrop-blur-md border-border/40 overflow-hidden rounded-3xl shadow-2xl">
              <CardHeader className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-border/50">
                      <AvatarImage src={post.user.avatar} crossOrigin="anonymous" />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-base leading-none mb-1">{post.user.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground font-medium">
                        <span className="text-primary mr-2">{post.user.role}</span>
                        <span>•</span>
                        <span className="ml-2">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-4 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center text-xs font-bold text-primary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {post.location}
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video relative group cursor-pointer shadow-lg">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-2 border-t border-border/20 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-destructive transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-destructive" />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                </div>
                <Button variant="ghost" size="sm" className="rounded-xl text-muted-foreground hover:text-foreground">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
