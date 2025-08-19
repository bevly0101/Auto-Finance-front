import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CreditCard, BarChart as BarChartIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Transaction } from './types';
import { MonthlyTargetDetails } from './MonthlyTargetDetails';

interface PaymentTypesChartProps {
  transactions: Transaction[];
}

const PaymentTypesChart: React.FC<PaymentTypesChartProps> = ({ transactions }) => {
  const [showExpenses, setShowExpenses] = useState(true);
  
  const getCurrentMonthName = () => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[new Date().getMonth()];
  };

  // Calcular totais para MonthlyTargetDetails
  const totalIncome = transactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'saída')
    .reduce((sum, t) => sum + t.amount, 0);

  // Dados de categorias de gastos
  const expenseCategoriesData = transactions
    .filter(t => t.type === 'saída' && t.category)
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Outros';
      const existingCategory = acc.find(cat => cat.name === category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        acc.push({ name: category, value: transaction.amount });
      }
      return acc;
    }, [] as { name: string, value: number }[]);

  // Dados de categorias de entradas
  const incomeCategoriesData = transactions
    .filter(t => t.type === 'entrada' && t.category)
    .reduce((acc, transaction) => {
      const category = transaction.category || 'Outros';
      const existingCategory = acc.find(cat => cat.name === category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        acc.push({ name: category, value: transaction.amount });
      }
      return acc;
    }, [] as { name: string, value: number }[]);

  const currentData = showExpenses ? expenseCategoriesData : incomeCategoriesData;
  const currentTotal = currentData.reduce((sum, item) => sum + item.value, 0);

  // Cores exatas do TailAdmin
  const colors = [
    '#3b82f6', // blue
    '#10b981', // emerald  
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4'  // cyan
  ];

  return (
    <Card className="tailadmin-chart-card">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Meta Mensal</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              {getCurrentMonthName()} {new Date().getFullYear()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex justify-center mb-6">
          <div className="h-72 w-72">
            {currentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={0}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {currentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={colors[index % colors.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <BarChartIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">
                    {showExpenses ? 'Sem dados de gastos' : 'Sem dados de entradas'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Lista de detalhes exata do TailAdmin */}
        <MonthlyTargetDetails 
          transactions={transactions}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentTypesChart;