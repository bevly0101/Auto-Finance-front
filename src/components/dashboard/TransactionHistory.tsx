import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Transaction } from '@/components/dashboard/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const formatDate = (dateString: string) => {
    try {
      let date;
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
      } else {
        date = new Date(dateString);
      }
      
      if (date && !isNaN(date.getTime())) {
        return format(date, 'dd/MM/yyyy', { locale: ptBR });
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    return type === 'entrada' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
           'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const recentTransactions = transactions.slice(0, 10);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Histórico de Transações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma transação encontrada
          </p>
        ) : (
          recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm text-card-foreground">
                    {transaction.description}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(transaction.type)}>
                      {transaction.type === 'entrada' ? 'Entrada' : 'Saída'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className={`font-semibold text-sm ${
                  transaction.type === 'entrada' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'entrada' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;