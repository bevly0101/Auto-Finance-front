import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Car, 
  Home, 
  Utensils, 
  Coffee,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { Transaction } from './types';

interface FigmaAccountsListProps {
  transactions: Transaction[];
}

const FigmaAccountsList: React.FC<FigmaAccountsListProps> = ({ transactions }) => {
  const getTransactionIcon = (category?: string, type?: string) => {
    if (type === 'entrada') return TrendingUp;
    
    switch (category?.toLowerCase()) {
      case 'alimentação':
      case 'restaurante':
        return Utensils;
      case 'transporte':
      case 'combustível':
        return Car;
      case 'moradia':
      case 'casa':
        return Home;
      case 'compras':
        return ShoppingCart;
      case 'lazer':
        return Coffee;
      default:
        return TrendingDown;
    }
  };

  const getIconColor = (type: string) => {
    return type === 'entrada' 
      ? 'text-emerald-500 bg-emerald-50' 
      : 'text-red-500 bg-red-50';
  };

  const formatAmount = (amount: number, type: string) => {
    const value = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
    
    return type === 'entrada' ? `+${value}` : `-${value}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Get last 8 transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nenhuma transação encontrada
          </p>
        ) : (
          recentTransactions.map((transaction, index) => {
            const Icon = getTransactionIcon(transaction.category, transaction.type);
            
            return (
              <div 
                key={transaction.id || index} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${getIconColor(transaction.type)}
                  `}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    {transaction.category && (
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'entrada' 
                        ? 'text-emerald-600' 
                        : 'text-red-600'
                    }`}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default FigmaAccountsList;