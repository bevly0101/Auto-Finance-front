
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, addDays, isSameDay, getMonth, getYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MonthlyEvolutionChartProps {
  transactions: Array<{ type: 'entrada' | 'saída'; amount: number; date: string; }>;
}

const MonthlyEvolutionChart: React.FC<MonthlyEvolutionChartProps> = ({ transactions }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');

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

  const data = viewMode === 'weekly' ? getWeeklyData() : getMonthlyData();

  return (
    <Card className="h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            {viewMode === 'weekly' ? 'Gastos Semanais' : 'Gastos Mensais'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {viewMode === 'weekly' ? 'Esta semana' : new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'monthly' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('monthly')}
            className="text-xs"
          >
            Mensal
          </Button>
          <Button
            variant={viewMode === 'weekly' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode('weekly')}
            className="text-xs"
          >
            Semanal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-transparent stroke-gray-200" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Gastos']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyEvolutionChart;
