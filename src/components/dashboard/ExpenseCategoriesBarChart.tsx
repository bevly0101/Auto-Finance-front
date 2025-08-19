import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon, Calendar, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Transaction } from './types';
import { format, startOfWeek, addDays, isSameDay, getMonth, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ExpenseCategoriesBarChartProps {
  transactions: Transaction[];
}

const ExpenseCategoriesBarChart: React.FC<ExpenseCategoriesBarChartProps> = ({ 
  transactions 
}) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const getCurrentMonthName = () => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[new Date().getMonth()];
  };

  // Função para processar transações por semana
  const getWeeklyData = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 });
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = addDays(startOfCurrentWeek, i);
      const dayName = format(day, 'EEEE', { locale: ptBR });
      
      const dayExpenses = transactions
        .filter(t => {
          if (t.type !== 'saída' || !t.date) return false;
          
          let transactionDate;
          if (t.date.includes('/')) {
            const parts = t.date.split('/');
            if (parts.length === 3) {
              transactionDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            }
          } else {
            transactionDate = new Date(t.date);
          }
          
          return transactionDate && !isNaN(transactionDate.getTime()) && isSameDay(transactionDate, day);
        })
        .reduce((sum, t) => sum + t.amount, 0);
        
      return {
        name: dayName.charAt(0).toUpperCase() + dayName.slice(1, 3),
        value: dayExpenses
      };
    });
    
    return weekDays;
  };

  // Função para processar transações por mês
  const getMonthlyData = () => {
    const currentYear = getYear(new Date());
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    const monthlyData = months.map((monthName, index) => {
      const monthExpenses = transactions
        .filter(t => {
          if (t.type !== 'saída' || !t.date) return false;
          
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
                 !isNaN(transactionDate.getTime()) && 
                 getMonth(transactionDate) === index &&
                 getYear(transactionDate) === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
        
      return {
        name: monthName,
        value: monthExpenses
      };
    });
    
    return monthlyData;
  };

  const chartData = viewMode === 'week' ? getWeeklyData() : getMonthlyData();

  return (
    <Card className="tailadmin-chart-card">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Gastos Mensais</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              {new Date().getFullYear()}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'month' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('month')}
              className="text-xs"
            >
              Mês
            </Button>
            <Button
              variant={viewMode === 'week' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('week')}
              className="text-xs"
            >
              Semana
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="h-80 w-full">
          {chartData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Gastos']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <BarChartIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-sm">
                  Sem dados de gastos para exibir
                </p>
                <p className="text-xs mt-1">
                  Adicione transações para ver o gráfico
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCategoriesBarChart;