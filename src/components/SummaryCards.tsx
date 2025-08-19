import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, ArrowLeftRight } from 'lucide-react';

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  iconBg: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value, bgColor, iconBg }) => {
  return (
    <div className={`flex items-center p-4 sm:p-6 rounded-2xl border border-white/5 ${bgColor} text-foreground`}>
      <div className={`p-3 rounded-full ${iconBg} mr-3 sm:mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-foreground/80 mb-1">{title}</p>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground break-words">{value}</p>
      </div>
    </div>
  );
};

interface SummaryCardsProps {
  balance: number;
  income: number;
  expenses: number;
  monthlyDifference: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ balance, income, expenses, monthlyDifference }) => {
  
  const formatCurrency = (value: number) => {
    const absoluteValue = Math.abs(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (value < 0) {
      return `R$ -${absoluteValue}`;
    }
    return `R$ ${absoluteValue}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <SummaryCard
        icon={<DollarSign size={24} className="text-blue-600 dark:text-blue-400" />}
        title="Meu saldo"
        value={formatCurrency(balance)}
        bgColor="bg-card"
        iconBg="bg-blue-100 dark:bg-blue-900/30"
      />
      <SummaryCard
        icon={<TrendingUp size={24} className="text-green-600 dark:text-green-400" />}
        title="Entradas"
        value={formatCurrency(income)}
        bgColor="bg-card"
        iconBg="bg-green-100 dark:bg-green-900/30"
      />
      <SummaryCard
        icon={<TrendingDown size={24} className="text-red-600 dark:text-red-400" />}
        title="Gastos"
        value={formatCurrency(expenses)}
        bgColor="bg-card"
        iconBg="bg-red-100 dark:bg-red-900/30"
      />
      <SummaryCard
        icon={<ArrowLeftRight size={24} className="text-indigo-600 dark:text-indigo-400" />}
        title="Diferença Mensal"
        value={formatCurrency(monthlyDifference)}
        bgColor="bg-card"
        iconBg="bg-indigo-100 dark:bg-indigo-900/30"
      />
    </div>
  );
};

export default SummaryCards;
