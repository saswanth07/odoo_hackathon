import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, Globe, Clock, Zap as ZapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for casual travelers",
    features: ["3 AI-Generated Trips", "Basic Packing List", "Community Access", "Expense Tracking"],
    buttonText: "Current Plan",
    active: false,
    premium: false
  },
  {
    name: "Explorer Pro",
    price: "12",
    description: "For the frequent adventurer",
    features: ["Unlimited AI Trips", "Smart Budget Alerts", "Priority Support", "Advanced Analytics", "Custom Checklists", "Offline Mode"],
    buttonText: "Upgrade Now",
    active: true,
    premium: true
  },
  {
    name: "World Traveler",
    price: "29",
    description: "Ultimate power for global trips",
    features: ["Everything in Pro", "Concierge Service", "Group Collaboration", "Travel Insurance Deals", "VIP Airport Access"],
    buttonText: "Go Global",
    active: false,
    premium: false
  }
];

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 border-primary/50 text-primary bg-primary/10 font-bold uppercase tracking-widest text-[10px]">
          Premium Access
        </Badge>
        <h1 className="text-5xl font-black tracking-tight">Level Up Your Journey</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Unlock the full potential of Traveloop with AI-powered insights, unlimited planning, and exclusive traveler perks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`relative h-full flex flex-col overflow-hidden bg-card/40 backdrop-blur-md border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 ${plan.active ? 'ring-2 ring-primary shadow-2xl shadow-primary/10' : ''}`}>
              {plan.active && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-8 py-1.5 rotate-45 translate-x-8 translate-y-2 shadow-lg">
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${plan.premium ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {plan.premium ? <Zap className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                  </div>
                  {plan.premium && (
                    <Badge className="bg-primary/20 text-primary border-none text-[9px] font-black uppercase">Most Chosen</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl font-black tracking-tight">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-black tracking-tight">${plan.price}</span>
                  <span className="ml-1 text-muted-foreground font-bold">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-medium">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-8 pt-0 flex-1">
                <div className="h-px bg-border/20 my-6" />
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 group">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${plan.active ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button 
                  variant={plan.active ? "default" : "outline"}
                  className={`w-full h-14 rounded-2xl font-black text-lg transition-all ${plan.active ? 'bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20' : 'border-border/50'}`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
        {[
          { icon: Shield, text: "Secure Payments" },
          { icon: Clock, text: "Cancel Anytime" },
          { icon: ZapIcon, text: "Instant Activation" },
          { icon: Sparkles, text: "AI Optimized" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <item.icon className="w-6 h-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
