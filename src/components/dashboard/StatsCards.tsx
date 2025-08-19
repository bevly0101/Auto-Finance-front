
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface StatsCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions?: Array<{ type: 'entrada' | 'saída'; amount: number; date: string; }>;
}

const StatsCards: React.FC<StatsCardsProps> = ({ totalBalance, totalIncome, totalExpenses, transactions = [] }) => {
  const currentDate = new Date();
  const previousMonth = subMonths(currentDate, 1);
  
  // Calcular o saldo do mês anterior baseado nas transações reais
  const previousMonthStart = startOfMonth(previousMonth);
  const previousMonthEnd = endOfMonth(previousMonth);
  
  const previousMonthTransactions = transactions.filter(t => {
    if (!t.date) return false;
    
    let transactionDate;
    if (t.date.includes('/')) {
      const parts = t.date.split('/');
      if (parts.length === 3) {
        transactionDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }
    } else {
      transactionDate = new Date(t.date);
    }
    
    if (isNaN(transactionDate.getTime())) return false;
    
    return transactionDate >= previousMonthStart && transactionDate <= previousMonthEnd;
  });
  
  const previousMonthIncome = previousMonthTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const previousMonthExpenses = previousMonthTransactions
    .filter(t => t.type === 'saída')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const lastMonthBalance = previousMonthIncome - previousMonthExpenses;
  
  // Calcular crescimento percentual
  const incomeGrowth = previousMonthIncome > 0 ? ((totalIncome - previousMonthIncome) / previousMonthIncome * 100) : 0;
  const expenseGrowth = previousMonthExpenses > 0 ? ((totalExpenses - previousMonthExpenses) / previousMonthExpenses * 100) : 0;
  const balanceGrowth = lastMonthBalance !== 0 ? ((totalBalance - lastMonthBalance) / Math.abs(lastMonthBalance) * 100) : 0;
  
  const cards = [
    {
      title: "Entradas",
      value: totalIncome,
      icon: Users,
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
      growth: incomeGrowth,
      growthText: "11.01%"
    },
    {
      title: "Despesas", 
      value: totalExpenses,
      icon: ShoppingCart,
      iconBg: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600", 
      growth: expenseGrowth,
      growthText: "9.05%"
    },
    {
      title: "Meta",
      value: totalIncome * 0.8, // Meta como 80% das entradas
      icon: TrendingUp,
      iconBg: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600",
      growth: balanceGrowth,
      growthText: "11.01%"
    },
    {
      title: "Saldo",
      value: totalBalance,
      icon: DollarSign,
      iconBg: "bg-purple-100 dark:bg-purple-900/20", 
      iconColor: "text-purple-600",
      growth: balanceGrowth,
      growthText: "8.12%"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="tailadmin-stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {card.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {card.title === "Meta" || card.title === "Saldo" ? 
                        `${Math.abs(card.value).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` :
                        `R$ ${Math.abs(card.value).toFixed(0)}`
                      }
                    </p>
                    <div className="flex items-center mt-1">
                      {card.growth > 0 ? (
                        <div className="flex items-center text-green-600">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">+{card.growthText}</span>
                        </div>
                      ) : index === 1 ? (
                        <div className="flex items-center text-red-600">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">{card.growthText}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          <span className="text-xs font-medium">+{card.growthText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${card.iconBg}`}>
                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
