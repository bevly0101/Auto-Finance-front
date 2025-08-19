import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Transaction } from './types';

interface MonthlyTargetDetailsProps {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
}

export const MonthlyTargetDetails: React.FC<MonthlyTargetDetailsProps> = ({ 
  transactions, 
  totalIncome, 
  totalExpenses 
}) => {
  // Calcular valores para hoje
  const today = new Date();
  const todayTransactions = transactions.filter(t => {
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
    
    return transactionDate && 
           transactionDate.getDate() === today.getDate() &&
           transactionDate.getMonth() === today.getMonth() &&
           transactionDate.getFullYear() === today.getFullYear();
  });

  const todayIncome = todayTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);

  const todayExpenses = todayTransactions
    .filter(t => t.type === 'saída')  
    .reduce((sum, t) => sum + t.amount, 0);

  const todayBalance = todayIncome - todayExpenses;

  // Meta mensal (pode ser calculada ou fixa)
  const monthlyTarget = totalIncome * 0.8; // Meta como 80% das entradas

  const details = [
    {
      label: "Target",
      value: monthlyTarget,
      change: -11.4,
      isNegative: true
    },
    {
      label: "Revenue", 
      value: totalIncome,
      change: 6.4,
      isNegative: false
    },
    {
      label: "Today",
      value: Math.abs(todayBalance),
      change: 2.1,
      isNegative: false
    }
  ];

  return (
    <div className="space-y-4 mt-6">
      {details.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              item.label === 'Target' ? 'bg-red-500' : 'bg-green-500'
            }`} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ${item.value.toFixed(0)}K
            </span>
            <div className={`flex items-center ${
              item.isNegative ? 'text-red-600' : 'text-green-600'
            }`}>
              {item.isNegative ? (
                <ArrowDown className="h-3 w-3 mr-1" />
              ) : (
                <ArrowUp className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">
                {Math.abs(item.change)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};