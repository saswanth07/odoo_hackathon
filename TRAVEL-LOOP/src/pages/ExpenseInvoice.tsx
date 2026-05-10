import { motion } from 'framer-motion';
import { Search, Filter, SortDesc, Download, FileText, CheckCircle, CreditCard, Receipt, Calendar, User, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const expenses = [
  { id: 1, category: "Hotel", description: "Initial booking Paris", details: "3 nights", unitCost: 1000, amount: 3000 },
  { id: 2, category: "Travel", description: "Flight bookings (Delh -> PAR)", details: "1", unitCost: 15000, amount: 15000 },
  { id: 3, category: "Activity", description: "Vatican Museum Guided Tour", details: "2 people", unitCost: 80, amount: 160 },
  { id: 4, category: "Food", description: "Dinner at La Pergola", details: "1", unitCost: 250, amount: 250 },
];

export default function ExpenseInvoice() {
  const subtotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const tax = subtotal * 0.12;
  const discount = 50;
  const grandTotal = subtotal + tax - discount;

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Header (Screen 14) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <Receipt className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Billing & Invoices</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Expense Invoice</h1>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/50">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-border/50">
              <SortDesc className="w-4 h-4 mr-2" /> Sort
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search invoice history..." 
            className="h-16 pl-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl text-lg focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Invoice Card (Screen 14) */}
      <Card className="bg-card/40 backdrop-blur-md border-border/40 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
        
        <CardHeader className="p-8 border-b border-border/20">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">T</div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Trip to Europe Adventure</h2>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Invoice #TRP-2026-9901</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-2">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Service ID</p>
                  <p className="text-sm font-bold flex items-center"><Hash className="w-3 h-3 mr-1 text-primary" /> SRV-JP-2026</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Generated Date</p>
                  <p className="text-sm font-bold flex items-center"><Calendar className="w-3 h-3 mr-1 text-primary" /> May 20, 2026</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Transfer Details</p>
                  <p className="text-sm font-bold flex items-center"><User className="w-3 h-3 mr-1 text-primary" /> Alex D.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payment Status</p>
                  <Badge className="bg-warning/20 text-warning border-warning/30 font-bold uppercase text-[9px]">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 rounded-2xl p-6 min-w-[240px] flex flex-col justify-center border border-border/20">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Total Budget</p>
              <p className="text-4xl font-black text-primary mb-4">$20,000</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Used</span>
                  <span>$18,410</span>
                </div>
                <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border/20">
                <TableHead className="w-16 text-center font-black uppercase tracking-widest text-[10px]">#</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px]">Category</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px]">Description</TableHead>
                <TableHead className="font-black uppercase tracking-widest text-[10px]">Qty/Details</TableHead>
                <TableHead className="text-right font-black uppercase tracking-widest text-[10px]">Unit Cost</TableHead>
                <TableHead className="text-right font-black uppercase tracking-widest text-[10px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id} className="border-border/10 hover:bg-primary/5 transition-colors group">
                  <TableCell className="text-center font-medium text-muted-foreground">{expense.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background/50 font-bold border-border/50">{expense.category}</Badge>
                  </TableCell>
                  <TableCell className="font-bold">{expense.description}</TableCell>
                  <TableCell className="text-muted-foreground font-medium">{expense.details}</TableCell>
                  <TableCell className="text-right font-medium">${expense.unitCost.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-black text-foreground group-hover:text-primary transition-colors">${expense.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-8 flex flex-col md:flex-row justify-between gap-12 border-t border-border/20">
            <div className="max-w-md space-y-4">
              <h4 className="font-black text-sm uppercase tracking-widest">Important Note</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                This invoice is generated automatically based on your trip activities and bookings. 
                Please ensure all details are correct before marking as paid. 
                Taxes are calculated based on the destination's regional rates.
              </p>
            </div>
            
            <div className="min-w-[300px] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Tax (12%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">-${discount}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border/20 flex justify-between items-end">
                <span className="font-black text-lg uppercase tracking-tight">Grand Total</span>
                <span className="font-black text-3xl text-primary">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="p-8 bg-muted/20 flex flex-wrap gap-4 justify-between items-center border-t border-border/20">
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-border/50 bg-background/50">
              <Download className="w-4 h-4 mr-2" /> Download Invoice
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-border/50 bg-background/50">
              <FileText className="w-4 h-4 mr-2" /> Export as PDF
            </Button>
          </div>
          <Button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-black shadow-xl shadow-primary/20">
            <CheckCircle className="w-4 h-4 mr-2" /> Mark as Paid
          </Button>
        </div>
      </Card>
    </div>
  );
}
