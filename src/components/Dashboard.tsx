import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Sun, Moon, Receipt, CreditCard, Home, Utensils, Heart, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const spendingData = [
    { name: 'Groceries', value: 40, color: 'var(--chart-groceries)' },
    { name: 'Food', value: 20, color: 'var(--chart-food)' },
    { name: 'Entertainment', value: 15, color: 'var(--chart-entertainment)' },
    { name: 'Rent', value: 20, color: 'var(--chart-rent)' },
    { name: 'Health', value: 5, color: 'var(--chart-health)' }
  ];

  const transactions = [
    { id: 1, name: 'Grocery Store', date: '2024-07-25', amount: -2500, icon: Receipt, category: 'groceries' },
    { id: 2, name: 'Restaurant', date: '2024-07-24', amount: -1200, icon: Utensils, category: 'food' },
    { id: 3, name: 'Movie Tickets', date: '2024-07-23', amount: -800, icon: Coffee, category: 'entertainment' },
    { id: 4, name: 'Rent Payment', date: '2024-07-22', amount: -10000, icon: Home, category: 'rent' },
    { id: 5, name: 'Pharmacy', date: '2024-07-21', amount: -500, icon: Heart, category: 'health' },
    { id: 6, name: 'Salary', date: '2024-07-20', amount: 25000, icon: CreditCard, category: 'income' }
  ];

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString('en-IN');
    return amount >= 0 ? `+₹${formatted}` : `-₹${formatted}`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-balance rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">₹</span>
          </div>
          <h1 className="text-2xl font-bold">ExpenseFlow</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Receipt className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold">₹10,000</div>
            <div className="flex items-center text-sm text-income">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.5% from last month
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Income</h3>
            <TrendingUp className="h-4 w-4 text-income" />
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold">₹25,000</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Expenses</h3>
            <TrendingDown className="h-4 w-4 text-expense" />
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold">₹15,000</div>
            <div className="flex items-center text-sm text-expense">
              <TrendingDown className="h-4 w-4 mr-1" />
              -10.1% from last month
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Spending Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Spending Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Budget</span>
                <span className="text-sm font-medium">60% Used</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-balance h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${entry.color})`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {spendingData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: `hsl(${item.color})` }}
                  ></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <p className="text-sm text-muted-foreground">Your latest financial activities.</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const Icon = transaction.icon;
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.amount >= 0 ? 'text-income' : 'text-expense'}`}>
                    {formatAmount(transaction.amount)}
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/transactions">
            <Button variant="outline" className="w-full mt-4">
              View All
            </Button>
          </Link>
        </Card>
      </div>

      {/* Import Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="h-5 w-5 text-balance" />
          <h3 className="text-lg font-semibold">Import from Text</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Write messages like 'Paid ₹550 to Swiggy on 3rd August' to automatically add transactions.
        </p>
        <div className="space-y-4">
          <Textarea 
            placeholder="Write message here..." 
            className="min-h-[100px]"
          />
          <Button className="w-full sm:w-auto">
            Import Transactions
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;