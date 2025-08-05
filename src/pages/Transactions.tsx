import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Plus, Receipt, Utensils, Coffee, Home, Heart, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Transactions = () => {
  const allTransactions = [
    { id: 1, name: 'Grocery Store', date: '2024-07-25', amount: -2500, icon: Receipt, category: 'groceries' },
    { id: 2, name: 'Restaurant', date: '2024-07-24', amount: -1200, icon: Utensils, category: 'food' },
    { id: 3, name: 'Movie Tickets', date: '2024-07-23', amount: -800, icon: Coffee, category: 'entertainment' },
    { id: 4, name: 'Rent Payment', date: '2024-07-22', amount: -10000, icon: Home, category: 'rent' },
    { id: 5, name: 'Pharmacy', date: '2024-07-21', amount: -500, icon: Heart, category: 'health' },
    { id: 6, name: 'Salary', date: '2024-07-20', amount: 25000, icon: CreditCard, category: 'income' },
    { id: 7, name: 'Coffee Shop', date: '2024-07-19', amount: -250, icon: Coffee, category: 'food' },
    { id: 8, name: 'Gas Station', date: '2024-07-18', amount: -1500, icon: Receipt, category: 'transport' },
    { id: 9, name: 'Online Shopping', date: '2024-07-17', amount: -2800, icon: Receipt, category: 'shopping' },
    { id: 10, name: 'Freelance Work', date: '2024-07-16', amount: 5000, icon: CreditCard, category: 'income' }
  ];

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-IN');
    return amount >= 0 ? `+₹${formatted}` : `-₹${formatted}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      groceries: 'bg-chart-groceries',
      food: 'bg-chart-food',
      entertainment: 'bg-chart-entertainment',
      rent: 'bg-chart-rent',
      health: 'bg-chart-health',
      income: 'bg-income',
      transport: 'bg-blue-500',
      shopping: 'bg-purple-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">All Transactions</h1>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="p-6">
        <div className="space-y-4">
          {allTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg ${getCategoryColor(transaction.category)} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold text-lg ${transaction.amount >= 0 ? 'text-income' : 'text-expense'}`}>
                    {formatAmount(transaction.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.amount >= 0 ? 'Credit' : 'Debit'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-income">₹30,000</div>
            <div className="text-sm text-muted-foreground">Total Income</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-expense">₹20,000</div>
            <div className="text-sm text-muted-foreground">Total Expenses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-balance">₹10,000</div>
            <div className="text-sm text-muted-foreground">Net Balance</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Transactions;