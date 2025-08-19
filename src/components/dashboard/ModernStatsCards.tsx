import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Users, ShoppingBag, Target, DollarSign } from 'lucide-react';

interface ModernStatsCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions?: Array<{ type: 'entrada' | 'saída'; amount: number; date: string; }>;
}

const ModernStatsCards: React.FC<ModernStatsCardsProps> = ({ 
  totalBalance, 
  totalIncome, 
  totalExpenses 
}) => {
  const formatCurrency = (value: number) => {
    const absoluteValue = Math.abs(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (value < 0) {
      return `R$ -${absoluteValue}`;
    }
    return `R$ ${absoluteValue}`;
  };

  const monthlyDifference = totalIncome - totalExpenses;

  const cards = [
    {
      title: "Meu Saldo",
      value: totalBalance,
      icon: Target,
      color: "text-primary",
      isMain: true
    },
    {
      title: "Entradas",
      value: totalIncome,
      icon: ArrowUp,
      color: "text-emerald-500"
    },
    {
      title: "Gastos",
      value: totalExpenses,
      icon: ArrowDown,
      color: "text-red-500"
    },
    {
      title: "Diferença Mensal",
      value: monthlyDifference,
      icon: DollarSign,
      color: monthlyDifference >= 0 ? "text-emerald-500" : "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className={`overflow-hidden ${card.isMain ? 'col-span-2 md:col-span-4' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${card.color.replace('text-', '')}-100 rounded-lg`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold break-words">
                  {formatCurrency(card.value)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModernStatsCards;